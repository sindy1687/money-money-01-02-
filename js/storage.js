// ========== 存儲相關工具函數 ==========

// 壓縮圖片函數（減少 localStorage 使用量）
// 針對大量圖示優化：更小的尺寸和更低的品質
function compressImage(dataUrl, maxWidth = 150, maxHeight = 150, quality = 0.6) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            // 計算縮放比例
            let width = img.width;
            let height = img.height;
            
            if (width > maxWidth || height > maxHeight) {
                if (width > height) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                } else {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }
            }
            
            // 創建 canvas 進行壓縮
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            // 轉換為 base64，使用 JPEG 格式以獲得更好的壓縮率
            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve(compressedDataUrl);
        };
        img.onerror = reject;
        img.src = dataUrl;
    });
}

// 讀取使用者選的圖片檔，縮小並壓縮成 data URL
// 手機照片動輒好幾 MB，原圖直接存進 localStorage 會超過容量而存不進去
// keepTransparency：輸出 PNG 保留透明背景（表情、圖示用）
// keepIfUnder：檔案小於這個位元組數就不重新編碼（保留 GIF 動畫等）
function readImageFile(file, { maxWidth = 1280, maxHeight = 1280, quality = 0.8, keepTransparency = false, keepIfUnder = 0 } = {}) {
    if (keepIfUnder && file.size <= keepIfUnder && /^image\/(png|jpe?g|gif|webp)$/.test(file.type)) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('無法讀取這張圖片'));
            reader.readAsDataURL(file);
        });
    }
    return new Promise((resolve, reject) => {
        // 用 object URL 載入，不必先把整張原圖轉成很長的 base64，手機比較不會記憶體不足
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            try {
                const scale = Math.min(1, maxWidth / img.naturalWidth, maxHeight / img.naturalHeight);
                const canvas = document.createElement('canvas');
                canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
                canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
                const ctx = canvas.getContext('2d');
                if (!keepTransparency) {
                    // JPEG 沒有透明，先鋪白底，避免透明處變黑
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(keepTransparency ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', quality));
            } catch (e) {
                reject(e);
            } finally {
                URL.revokeObjectURL(url);
            }
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('無法讀取這張圖片，可能是瀏覽器不支援的格式（例如 HEIC）。\n請改選 JPG / PNG 圖片，或在相機設定改成「最相容」格式。'));
        };
        img.src = url;
    });
}

// ---------- 舊圖片瘦身 ----------
// 以前上傳的圖片是原圖直接存，會把 localStorage 塞滿；這裡把太大的圖重新壓縮

const SHRINK_IMAGE_MIN_LENGTH = 400 * 1024; // data URL 超過這個長度才重新壓縮（約 300KB 的圖）
const SHRINK_DONE_KEY = 'storedImagesShrunk_v1';

// 把一張 data URL 圖片縮小；沒有透明就轉 JPEG，有透明就縮小保留 PNG
function shrinkDataUrl(dataUrl) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            try {
                const draw = (maxSide) => {
                    const scale = Math.min(1, maxSide / img.naturalWidth, maxSide / img.naturalHeight);
                    const canvas = document.createElement('canvas');
                    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
                    canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    return { canvas, ctx };
                };
                let result;
                const { canvas, ctx } = draw(1600);
                let transparent = false;
                if (!/^data:image\/jpe?g/.test(dataUrl)) {
                    const alpha = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                    for (let i = 3; i < alpha.length; i += 4 * 16) {
                        if (alpha[i] < 255) { transparent = true; break; }
                    }
                }
                if (transparent) {
                    result = draw(512).canvas.toDataURL('image/png');
                } else {
                    const out = document.createElement('canvas');
                    out.width = canvas.width;
                    out.height = canvas.height;
                    const octx = out.getContext('2d');
                    octx.fillStyle = '#fff';
                    octx.fillRect(0, 0, out.width, out.height);
                    octx.drawImage(canvas, 0, 0);
                    result = out.toDataURL('image/jpeg', 0.7);
                }
                // 壓完沒有比較小就保留原圖
                resolve(result.length < dataUrl.length ? result : dataUrl);
            } catch (e) {
                resolve(dataUrl);
            }
        };
        img.onerror = () => resolve(dataUrl);
        img.src = dataUrl;
    });
}

// 把 value 裡所有太大的 data URL 換成壓縮後的版本；cache 讓同一張圖在不同地方得到相同結果
async function shrinkImagesIn(value, cache) {
    if (typeof value === 'string') {
        if (value.length < SHRINK_IMAGE_MIN_LENGTH || !value.startsWith('data:image/')) return value;
        if (!cache.has(value)) cache.set(value, await shrinkDataUrl(value));
        return cache.get(value);
    }
    if (Array.isArray(value)) {
        const out = [];
        for (const v of value) out.push(await shrinkImagesIn(v, cache));
        return out;
    }
    if (value && typeof value === 'object') {
        const out = {};
        for (const k of Object.keys(value)) out[k] = await shrinkImagesIn(value[k], cache);
        return out;
    }
    return value;
}

// 掃過 localStorage 所有資料，重新壓縮太大的圖片；回傳省下的字元數
let shrinkingPromise = null;
function shrinkStoredImages() {
    if (shrinkingPromise) return shrinkingPromise;
    shrinkingPromise = (async () => {
        const cache = new Map();
        let saved = 0;
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) keys.push(localStorage.key(i));
        for (const key of keys) {
            const raw = localStorage.getItem(key);
            if (!raw || raw.length < SHRINK_IMAGE_MIN_LENGTH || raw.indexOf('data:image/') === -1) continue;
            let next;
            if (raw.startsWith('data:image/')) {
                next = await shrinkImagesIn(raw, cache);
            } else {
                let parsed;
                try { parsed = JSON.parse(raw); } catch (e) { continue; }
                next = JSON.stringify(await shrinkImagesIn(parsed, cache));
            }
            if (next.length < raw.length) {
                try {
                    localStorage.setItem(key, next);
                    saved += raw.length - next.length;
                } catch (e) {
                    console.warn('圖片瘦身寫入失敗:', key, e);
                }
            }
        }
        if (saved) console.log(`舊圖片已重新壓縮，省下約 ${(saved / 1024 / 1024).toFixed(1)}MB`);
        return saved;
    })().finally(() => { shrinkingPromise = null; });
    return shrinkingPromise;
}

// 開啟頁面後在背景跑一次，不影響畫面載入
window.addEventListener('load', () => {
    try {
        if (localStorage.getItem(SHRINK_DONE_KEY)) return;
    } catch (e) {
        return;
    }
    setTimeout(async () => {
        await shrinkStoredImages();
        try { localStorage.setItem(SHRINK_DONE_KEY, '1'); } catch (e) {}
    }, 2000);
});

// 寫入 localStorage；空間不足時先把舊圖片瘦身再試一次，還是不行才提示使用者並回傳 false
async function trySetItemWithAlert(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (e) {
        console.warn('localStorage 空間不足，先壓縮舊圖片再試:', key, e);
    }
    await shrinkStoredImages();
    // 要寫入的資料本身也可能帶著舊的大圖（例如自訂背景清單），一起壓縮
    let next = value;
    try {
        next = value.startsWith('data:image/')
            ? await shrinkImagesIn(value, new Map())
            : JSON.stringify(await shrinkImagesIn(JSON.parse(value), new Map()));
    } catch (e) { /* 不是 JSON，照原樣寫入 */ }
    try {
        localStorage.setItem(key, next);
        return true;
    } catch (e) { /* 還是不夠 */ }
    alert('儲存空間不足，圖片存不進去！\n\n已自動壓縮舊圖片，空間仍然不夠。\n請刪除一些不用的圖片（自訂背景、收據照片、表情等）後再試。');
    return false;
}

// 安全地保存到 localStorage（帶錯誤處理）
function safeSetItem(key, value) {
    try {
        const jsonString = JSON.stringify(value);
        const sizeInMB = new Blob([jsonString]).size / (1024 * 1024);
        
        // 檢查大小（localStorage 通常限制為 5-10MB）
        if (sizeInMB > 4) {
            throw new Error(`數據太大 (${sizeInMB.toFixed(2)}MB)，無法保存。請刪除一些舊的分類圖標。`);
        }
        
        localStorage.setItem(key, jsonString);
        return true;
    } catch (e) {
        if (e.name === 'QuotaExceededError' || e.message.includes('太大')) {
            console.error('localStorage 配額已滿:', e);
            alert('存儲空間不足！\n\n請嘗試：\n1. 刪除一些不使用的分類圖標\n2. 使用較小的圖片\n3. 清除瀏覽器緩存');
            return false;
        }
        throw e;
    }
}

// 壓縮所有圖標（用於導入時）
async function compressAllIcons(customIcons) {
    const compressedIcons = {};
    const iconNames = Object.keys(customIcons);
    
    for (let i = 0; i < iconNames.length; i++) {
        const name = iconNames[i];
        const iconData = customIcons[name];
        
        if (iconData && iconData.type === 'image' && iconData.value) {
            try {
                console.log(`壓縮圖標 ${i + 1}/${iconNames.length}: ${name}`);
                compressedIcons[name] = {
                    type: 'image',
                    value: await compressImage(iconData.value)
                };
            } catch (error) {
                console.error(`壓縮圖標 ${name} 失敗:`, error);
                // 如果壓縮失敗，保留原始圖標
                compressedIcons[name] = iconData;
            }
        } else {
            // 非圖片圖標直接保留
            compressedIcons[name] = iconData;
        }
    }
    
    return compressedIcons;
}

// 獲取存儲空間使用情況
function getStorageInfo() {
    const customIcons = JSON.parse(localStorage.getItem('categoryCustomIcons') || '{}');
    const iconCount = Object.keys(customIcons).length;
    let totalSize = 0;
    let imageCount = 0;
    
    Object.values(customIcons).forEach(icon => {
        if (icon && icon.type === 'image' && icon.value) {
            totalSize += icon.value.length;
            imageCount++;
        }
    });
    
    const sizeInKB = totalSize / 1024;
    const sizeInMB = sizeInKB / 1024;
    
    // 計算所有 localStorage 的使用情況
    let totalStorageSize = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            totalStorageSize += localStorage[key].length + key.length;
        }
    }
    const totalStorageMB = totalStorageSize / (1024 * 1024);
    
    return {
        iconCount,
        imageCount,
        sizeInKB,
        sizeInMB,
        totalStorageMB,
        customIcons
    };
}

