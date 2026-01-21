// 修復圖示編碼問題的JavaScript腳本
function fixIconEncoding() {
    console.log('開始修復圖示編碼問題...');
    
    // 定義圖示元素的選擇器
    const iconSelectors = [
        '.summary-icon',
        '.record-type-icon', 
        '.ledger-tab-icon',
        '.type-icon',
        '.dividend-stat-icon',
        '.title-icon',
        '.stock-icon-large',
        '.form-header-icon',
        '.back-btn-icon',
        '.tab-icon',
        '.fab-btn',
        '.back-btn',
        '.input-back-btn',
        '.modal-back-btn',
        '.dca-back-btn',
        '.dca-setup-back-btn',
        '.detail-back-btn',
        '.investment-back-btn',
        '.investment-form-back-btn',
        '.daily-budget-back-btn',
        '.nav-back-btn'
    ];
    
    // 修復每個圖示元素
    iconSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            // 確保使用正確的emoji字體
            element.style.fontFamily = 'Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, Emoji';
            element.style.fontStyle = 'normal';
            element.style.fontWeight = 'normal';
            element.style.fontVariant = 'normal';
            element.style.textTransform = 'none';
            element.style.lineHeight = '1';
            element.style.webkitFontSmoothing = 'antialiased';
            element.style.mozOsxFontSmoothing = 'grayscale';
            
            // 確保emoji正確顯示
            const text = element.textContent;
            if (text && text.length > 0) {
                // 如果內容看起來像亂碼，嘗試修復
                if (text.charCodeAt(0) > 127 && text.charCodeAt(0) < 256) {
                    console.log('發現可能的亂碼圖示:', text, 'in element:', element);
                    // 可以在這裡添加特定的修復邏輯
                }
            }
        });
    });
    
    // 修復所有包含emoji的元素
    const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;
    
    document.querySelectorAll('*').forEach(element => {
        if (emojiRegex.test(element.textContent)) {
            element.style.fontFamily = element.style.fontFamily + ', Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, Emoji';
        }
    });
    
    console.log('圖示編碼修復完成！');
}

// 頁面載入完成後執行修復
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixIconEncoding);
} else {
    fixIconEncoding();
}

// 主題切換時也要修復
const iconEncodingObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
            setTimeout(fixIconEncoding, 100);
        }
    });
});

iconEncodingObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
});

// 導出修復函數供手動調用
window.fixIconEncoding = fixIconEncoding;
