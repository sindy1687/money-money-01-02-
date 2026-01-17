// 手機優化的帳戶圖片上傳修復
// 將此代碼添加到 script.js 中的 initAccountImageUpload 函數

function initAccountImageUploadMobileOptimized() {
    const uploadBtn = document.getElementById('accountImageUploadBtn');
    const imageInput = document.getElementById('accountImageInput');
    const removeBtn = document.getElementById('accountImageRemoveBtn');
    const previewImg = document.getElementById('accountImagePreviewImg');
    const placeholder = document.getElementById('accountImagePlaceholder');
    
    console.log('🔧 初始化手機優化帳戶圖片上傳功能');
    
    if (!uploadBtn || !imageInput) {
        console.error('❌ 缺少必要的元素');
        return;
    }
    
    // 檢測是否為移動設備
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    console.log('📱 是否為移動設備:', isMobile);
    
    // 清除之前的事件監聽器
    const newUploadBtn = uploadBtn.cloneNode(true);
    uploadBtn.parentNode.replaceChild(newUploadBtn, uploadBtn);
    
    // 統一的點擊處理函數
    const handleUploadClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('📸 上傳按鈕被點擊');
        
        // 手機專用處理
        if (isMobile) {
            try {
                // 手機瀏覽器可能需要直接聚焦
                imageInput.focus();
                setTimeout(() => {
                    imageInput.click();
                }, 100);
            } catch (error) {
                console.error('❌ 手機點擊文件輸入失敗:', error);
                // 備用方案：創建臨時文件輸入
                const tempInput = document.createElement('input');
                tempInput.type = 'file';
                tempInput.accept = 'image/*';
                tempInput.style.position = 'absolute';
                tempInput.style.left = '-9999px';
                document.body.appendChild(tempInput);
                
                tempInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        // 觸發原始文件輸入的 change 事件
                        const dataTransfer = new DataTransfer();
                        dataTransfer.items.add(file);
                        imageInput.files = dataTransfer.files;
                        
                        const event = new Event('change', { bubbles: true });
                        imageInput.dispatchEvent(event);
                    }
                    document.body.removeChild(tempInput);
                });
                
                tempInput.click();
            }
        } else {
            // 桌面處理
            imageInput.click();
        }
    };
    
    // 事件綁定 - 移動設備優化
    if (isMobile) {
        // 手機只使用 touchend 事件，避免雙重觸發
        newUploadBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            handleUploadClick(e);
        }, { passive: false });
        
        // 添加視覺反饋
        newUploadBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            newUploadBtn.style.transform = 'scale(0.95)';
            newUploadBtn.style.opacity = '0.8';
        }, { passive: true });
        
        newUploadBtn.addEventListener('touchend', (e) => {
            setTimeout(() => {
                newUploadBtn.style.transform = 'scale(1)';
                newUploadBtn.style.opacity = '1';
            }, 150);
        }, { passive: true });
    } else {
        // 桌面使用 click 事件
        newUploadBtn.addEventListener('click', handleUploadClick);
    }
    
    // 清除文件輸入的之前事件監聽器
    const newImageInput = imageInput.cloneNode(true);
    imageInput.parentNode.replaceChild(newImageInput, imageInput);
    
    // 文件選擇處理
    newImageInput.addEventListener('change', (e) => {
        console.log('📁 文件選擇事件觸發');
        const file = e.target.files[0];
        if (file) {
            console.log(`📷 處理帳戶圖片: ${file.name}，大小: ${Math.round(file.size/1024/1024)}MB，類型: ${file.type}`);
            
            // 手機專用檢查
            if (isMobile) {
                // 手機可能需要更嚴格的文件類型檢查
                const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
                if (!validTypes.includes(file.type)) {
                    alert('請選擇支援的圖片格式 (JPG, PNG, GIF, WebP)');
                    return;
                }
                
                // 手機文件大小警告（但允許上傳）
                if (file.size > 10 * 1024 * 1024) {
                    console.warn('⚠️ 文件較大，可能需要較長時間處理');
                }
            }
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imageData = event.target.result;
                    console.log('✅ 圖片讀取完成，大小:', imageData.length);
                    
                    // 顯示預覽
                    if (previewImg) {
                        previewImg.src = imageData;
                        previewImg.style.display = 'block';
                        console.log('🖼️ 預覽圖片已設置');
                    } else {
                        console.error('❌ 找不到預覽圖片元素');
                    }
                    
                    if (placeholder) placeholder.style.display = 'none';
                    if (removeBtn) removeBtn.style.display = 'block';
                    
                    // 保存到帳戶數據
                    const accountId = document.getElementById('manageAccountId')?.value;
                    console.log('🏦 當前帳戶ID:', accountId);
                    
                    if (accountId) {
                        const accounts = getAccounts();
                        const account = accounts.find(a => a.id === accountId);
                        if (account) {
                            account.image = imageData;
                            saveAccounts(accounts);
                            console.log('💾 圖片已保存到帳戶數據');
                            
                            // 手機成功提示
                            if (isMobile) {
                                const successMsg = document.createElement('div');
                                successMsg.textContent = '✅ 圖片上傳成功';
                                successMsg.style.cssText = `
                                    position: fixed;
                                    top: 20px;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    background: #4CAF50;
                                    color: white;
                                    padding: 12px 20px;
                                    border-radius: 8px;
                                    z-index: 10000;
                                    font-size: 14px;
                                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                                `;
                                document.body.appendChild(successMsg);
                                
                                setTimeout(() => {
                                    if (document.body.contains(successMsg)) {
                                        document.body.removeChild(successMsg);
                                    }
                                }, 2000);
                            }
                        } else {
                            console.error('❌ 找不到帳戶:', accountId);
                        }
                    } else {
                        console.warn('⚠️ 沒有帳戶ID，可能是新增模式');
                    }
                } catch (error) {
                    console.error('❌ 處理圖片時發生錯誤:', error);
                    alert('處理圖片時發生錯誤，請重試');
                }
            };
            
            reader.onerror = (error) => {
                console.error('❌ 讀取圖片失敗:', error);
                alert('讀取圖片失敗，請重試');
            };
            
            reader.readAsDataURL(file);
        } else {
            console.log('❌ 沒有選擇文件');
        }
    });
    
    // 移除圖片功能（手機優化）
    if (removeBtn) {
        const newRemoveBtn = removeBtn.cloneNode(true);
        removeBtn.parentNode.replaceChild(newRemoveBtn, removeBtn);
        
        const handleRemoveClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🗑️ 移除按鈕被點擊');
            
            if (previewImg) {
                previewImg.src = '';
                previewImg.style.display = 'none';
            }
            if (placeholder) placeholder.style.display = 'block';
            if (newRemoveBtn) newRemoveBtn.style.display = 'none';
            
            // 從帳戶數據中移除圖片
            const accountId = document.getElementById('manageAccountId')?.value;
            if (accountId) {
                const accounts = getAccounts();
                const account = accounts.find(a => a.id === accountId);
                if (account) {
                    delete account.image;
                    saveAccounts(accounts);
                    console.log('🗑️ 圖片已從帳戶數據中移除');
                }
            }
        };
        
        if (isMobile) {
            newRemoveBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                handleRemoveClick(e);
            }, { passive: false });
        } else {
            newRemoveBtn.addEventListener('click', handleRemoveClick);
        }
    }
    
    console.log('✅ 手機優化帳戶圖片上傳功能初始化完成');
}

// 使用說明：
// 1. 將此函數添加到 script.js 中
// 2. 在帳戶管理模態框打開時調用此函數而不是原來的 initAccountImageUpload()
// 3. 或者直接替換原來的 initAccountImageUpload 函數
