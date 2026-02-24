// ========== 存儲相關工具函數 ==========

 function openAppDb() {
     return new Promise((resolve, reject) => {
         if (!('indexedDB' in window)) {
             reject(new Error('IndexedDB not supported'));
             return;
         }
 
         const request = indexedDB.open('money-money', 1);
         request.onupgradeneeded = () => {
             const db = request.result;
             if (!db.objectStoreNames.contains('kv')) {
                 db.createObjectStore('kv');
             }
         };
         request.onsuccess = () => resolve(request.result);
         request.onerror = () => reject(request.error);
     });
 }
 
 async function idbGet(key) {
     const db = await openAppDb();
     return new Promise((resolve, reject) => {
         const tx = db.transaction('kv', 'readonly');
         const store = tx.objectStore('kv');
         const req = store.get(key);
         req.onsuccess = () => resolve(req.result);
         req.onerror = () => reject(req.error);
         tx.oncomplete = () => db.close();
     });
 }
 
 async function idbSet(key, value) {
     const db = await openAppDb();
     return new Promise((resolve, reject) => {
         const tx = db.transaction('kv', 'readwrite');
         const store = tx.objectStore('kv');
         const req = store.put(value, key);
         req.onsuccess = () => resolve(true);
         req.onerror = () => reject(req.error);
         tx.oncomplete = () => db.close();
     });
 }

 async function initCategoryCustomIconsStorage() {
     try {
         const fromIdb = await idbGet('categoryCustomIcons');
         if (fromIdb && typeof fromIdb === 'object') {
             window.__categoryCustomIconsCache = fromIdb;
             return fromIdb;
         }
 
         const fromLocal = localStorage.getItem('categoryCustomIcons');
         if (fromLocal) {
             let parsed = {};
             try {
                 parsed = JSON.parse(fromLocal) || {};
             } catch (e) {
                 parsed = {};
             }
             await idbSet('categoryCustomIcons', parsed);
             localStorage.removeItem('categoryCustomIcons');
             window.__categoryCustomIconsCache = parsed;
             return parsed;
         }
 
         window.__categoryCustomIconsCache = {};
         return {};
     } catch (e) {
         const fallback = JSON.parse(localStorage.getItem('categoryCustomIcons') || '{}');
         window.__categoryCustomIconsCache = fallback;
         return fallback;
     }
 }

 function getCategoryCustomIconsSync() {
     if (window.__categoryCustomIconsCache && typeof window.__categoryCustomIconsCache === 'object') {
         return window.__categoryCustomIconsCache;
     }
     try {
         return JSON.parse(localStorage.getItem('categoryCustomIcons') || '{}');
     } catch (e) {
         return {};
     }
 }

 async function setCategoryCustomIcons(customIcons) {
     try {
         await idbSet('categoryCustomIcons', customIcons || {});
         window.__categoryCustomIconsCache = customIcons || {};
         return true;
     } catch (e) {
         try {
             localStorage.setItem('categoryCustomIcons', JSON.stringify(customIcons || {}));
             window.__categoryCustomIconsCache = customIcons || {};
             return true;
         } catch (err) {
             console.error('categoryCustomIcons save failed:', err);
             alert('存儲空間不足！\n\n請嘗試：\n1. 刪除一些不使用的分類圖標\n2. 使用較小的圖片\n3. 清除瀏覽器緩存');
             return false;
         }
     }
 }

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
    const customIcons = getCategoryCustomIconsSync();
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

