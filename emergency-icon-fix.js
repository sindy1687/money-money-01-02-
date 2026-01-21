// 緊急圖示修復 - 強制執行
console.log('🔧 開始緊急圖示修復...');

function emergencyIconFix() {
    console.log('🚀 執行緊急圖示修復...');
    
    // 1. 強制設置所有圖示元素的字體
    const allIconElements = document.querySelectorAll(`
        .summary-icon,
        .record-type-icon,
        .ledger-tab-icon,
        .type-icon,
        .dividend-stat-icon,
        .title-icon,
        .stock-icon-large,
        .form-header-icon,
        .back-btn-icon,
        .tab-icon,
        .fab-btn,
        .back-btn,
        .input-back-btn,
        .modal-back-btn,
        .dca-back-btn,
        .dca-setup-back-btn,
        .detail-back-btn,
        .investment-back-btn,
        .investment-form-back-btn,
        .daily-budget-back-btn,
        .nav-back-btn,
        [class*="icon"],
        [class*="Icon"],
        button,
        .btn,
        [class*="btn"]
    `);
    
    console.log(`找到 ${allIconElements.length} 個需要修復的元素`);
    
    allIconElements.forEach((element, index) => {
        // 強制設置字體
        element.style.setProperty('font-family', 'Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, Emoji, Segoe UI, Microsoft YaHei, PingFang SC, Helvetica Neue, Arial, sans-serif', 'important');
        element.style.setProperty('font-style', 'normal', 'important');
        element.style.setProperty('font-weight', 'normal', 'important');
        element.style.setProperty('font-variant', 'normal', 'important');
        element.style.setProperty('text-transform', 'none', 'important');
        element.style.setProperty('line-height', '1', 'important');
        element.style.setProperty('unicode-bidi', 'isolate', 'important');
        element.style.setProperty('text-orientation', 'mixed', 'important');
        element.style.setProperty('-webkit-font-smoothing', 'antialiased', 'important');
        element.style.setProperty('-moz-osx-font-smoothing', 'grayscale', 'important');
        
        // 檢查是否包含 emoji
        const text = element.textContent;
        if (/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|←|→|↑|↓|✓|✕|➕|✨|📂|💰|👤|💳|🧧|📷|😊/u.test(text)) {
            console.log(`修復圖示 ${index + 1}: "${text}"`);
            
            // 特殊處理按鈕
            if (element.tagName === 'BUTTON' || element.classList.contains('btn')) {
                element.style.setProperty('font-size', '16px', 'important');
                element.style.setProperty('display', 'flex', 'important');
                element.style.setProperty('align-items', 'center', 'important');
                element.style.setProperty('justify-content', 'center', 'important');
            }
            
            // 特殊處理 FAB 按鈕
            if (element.classList.contains('fab-btn')) {
                element.style.setProperty('font-size', '24px', 'important');
                element.style.setProperty('width', '56px', 'important');
                element.style.setProperty('height', '56px', 'important');
                element.style.setProperty('border-radius', '50%', 'important');
                element.style.setProperty('display', 'flex', 'important');
                element.style.setProperty('align-items', 'center', 'important');
                element.style.setProperty('justify-content', 'center', 'important');
            }
            
            // 特殊處理返回按鈕
            if (element.classList.contains('back-btn') || text.includes('←')) {
                element.style.setProperty('font-size', '18px', 'important');
                element.style.setProperty('width', '40px', 'important');
                element.style.setProperty('height', '40px', 'important');
                element.style.setProperty('border-radius', '50%', 'important');
                element.style.setProperty('display', 'flex', 'important');
                element.style.setProperty('align-items', 'center', 'important');
                element.style.setProperty('justify-content', 'center', 'important');
            }
            
            // 特殊處理圖示類型
            if (element.classList.contains('record-type-icon')) {
                element.style.setProperty('font-size', '20px', 'important');
            }
            
            if (element.classList.contains('tab-icon')) {
                element.style.setProperty('font-size', '20px', 'important');
            }
        }
    });
    
    // 2. 特殊修復：強制重新渲染
    setTimeout(() => {
        document.body.style.display = 'none';
        document.body.offsetHeight; // 觸發 reflow
        document.body.style.display = '';
        console.log('✅ 強制重新渲染完成');
    }, 100);
    
    console.log('🎉 緊急圖示修復完成！');
}

// 立即執行修復
emergencyIconFix();

// 頁面載入完成後再次執行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', emergencyIconFix);
} else {
    setTimeout(emergencyIconFix, 500);
}

// 主題切換時執行修復
const emergencyObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
            setTimeout(emergencyIconFix, 200);
        }
    });
});

emergencyObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
});

// 導出函數供手動調用
window.emergencyIconFix = emergencyIconFix;

console.log('🔧 緊急圖示修復腳本已載入');
