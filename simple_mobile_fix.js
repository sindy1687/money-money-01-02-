// 簡化版手機圖片上傳修復 - 直接複製到控制台執行

console.log('🔧 開始修復手機圖片上傳問題...');

// 1. 修復上傳按鈕
const uploadBtn = document.getElementById('accountImageUploadBtn');
const imageInput = document.getElementById('accountImageInput');

if (uploadBtn && imageInput) {
    console.log('✅ 找到上傳元素');
    
    // 完全重新創建按鈕，清除所有事件
    const cleanBtn = uploadBtn.cloneNode(true);
    uploadBtn.parentNode.replaceChild(cleanBtn, uploadBtn);
    
    // 只使用 touchend 事件（手機專用）
    cleanBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        console.log('📱 手機上傳按鈕被點擊');
        
        // 直接點擊文件輸入
        imageInput.click();
    });
    
    // 桌面備用
    cleanBtn.addEventListener('click', function() {
        console.log('💻 桌面上傳按鈕被點擊');
        imageInput.click();
    });
    
    console.log('✅ 上傳按鈕修復完成');
} else {
    console.error('❌ 找不到上傳元素');
}

// 2. 修復移除按鈕
const removeBtn = document.getElementById('accountImageRemoveBtn');
if (removeBtn) {
    console.log('✅ 找到移除按鈕');
    
    // 重新創建移除按鈕
    const cleanRemoveBtn = removeBtn.cloneNode(true);
    removeBtn.parentNode.replaceChild(cleanRemoveBtn, removeBtn);
    
    // 只使用一個事件處理
    cleanRemoveBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('🗑️ 移除按鈕被點擊');
        
        const previewImg = document.getElementById('accountImagePreviewImg');
        const placeholder = document.getElementById('accountImagePlaceholder');
        const accountId = document.getElementById('manageAccountId')?.value;
        
        // 清除預覽
        if (previewImg) {
            previewImg.src = '';
            previewImg.style.display = 'none';
        }
        if (placeholder) placeholder.style.display = 'block';
        cleanRemoveBtn.style.display = 'none';
        
        // 清除帳戶數據
        if (accountId && typeof getAccounts === 'function') {
            const accounts = getAccounts();
            const account = accounts.find(a => a.id === accountId);
            if (account) {
                delete account.image;
                saveAccounts(accounts);
                console.log('✅ 圖片已從帳戶數據移除');
            }
        }
    });
    
    console.log('✅ 移除按鈕修復完成');
}

// 3. 檢查文件輸入是否正常工作
if (imageInput) {
    // 重新綁定 change 事件
    const newInput = imageInput.cloneNode(true);
    imageInput.parentNode.replaceChild(newInput, imageInput);
    
    newInput.addEventListener('change', function(e) {
        console.log('📁 文件選擇事件觸發');
        const file = e.target.files[0];
        
        if (file) {
            console.log(`📷 選擇了文件: ${file.name} (${Math.round(file.size/1024/1024)}MB)`);
            
            const reader = new FileReader();
            reader.onload = function(event) {
                const imageData = event.target.result;
                console.log('✅ 圖片讀取成功');
                
                // 顯示預覽
                const previewImg = document.getElementById('accountImagePreviewImg');
                const placeholder = document.getElementById('accountImagePlaceholder');
                const removeBtn = document.getElementById('accountImageRemoveBtn');
                
                if (previewImg) {
                    previewImg.src = imageData;
                    previewImg.style.display = 'block';
                    console.log('🖼️ 預覽圖片已設置');
                }
                
                if (placeholder) placeholder.style.display = 'none';
                if (removeBtn) removeBtn.style.display = 'block';
                
                // 保存到帳戶
                const accountId = document.getElementById('manageAccountId')?.value;
                if (accountId && typeof getAccounts === 'function') {
                    const accounts = getAccounts();
                    const account = accounts.find(a => a.id === accountId);
                    if (account) {
                        account.image = imageData;
                        saveAccounts(accounts);
                        console.log('💾 圖片已保存到帳戶');
                        
                        // 顯示成功提示
                        alert('✅ 圖片上傳成功！');
                    }
                }
            };
            
            reader.onerror = function() {
                console.error('❌ 圖片讀取失敗');
                alert('❌ 圖片讀取失敗，請重試');
            };
            
            reader.readAsDataURL(file);
        } else {
            console.log('❌ 沒有選擇文件');
        }
    });
    
    console.log('✅ 文件輸入修復完成');
}

console.log('🎉 手機圖片上傳修復完成！請測試上傳功能。');

// 測試指令
console.log('🧪 測試指令：');
console.log('1. 點擊 "📷 上傳圖片" 按鈕');
console.log('2. 選擇一張圖片');
console.log('3. 檢查控制台日誌');
console.log('4. 確認圖片預覽是否顯示');
