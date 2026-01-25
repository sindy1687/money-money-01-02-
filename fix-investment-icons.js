// 投資類型圖示修復
// 修復 emoji 顯示為問號的問題

function fixInvestmentTypeIcons() {
    console.log('🔧 修復投資類型圖示...');
    
    // 找到所有投資類型圖示
    const typeIcons = document.querySelectorAll('.type-icon');
    
    console.log(`找到 ${typeIcons.length} 個投資類型圖示`);
    
    typeIcons.forEach((icon, index) => {
        const originalText = icon.textContent;
        console.log(`圖示 ${index + 1}: "${originalText}"`);
        
        // 強制設置字體樣式
        icon.style.setProperty('font-family', 'Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, EmojiOne Color, Twemoji, Android Emoji, sans-serif', 'important');
        icon.style.setProperty('font-style', 'normal', 'important');
        icon.style.setProperty('font-weight', 'normal', 'important');
        icon.style.setProperty('font-variant', 'normal', 'important');
        icon.style.setProperty('text-transform', 'none', 'important');
        icon.style.setProperty('line-height', '1', 'important');
        icon.style.setProperty('unicode-bidi', 'isolate', 'important');
        icon.style.setProperty('text-orientation', 'mixed', 'important');
        icon.style.setProperty('-webkit-font-smoothing', 'antialiased', 'important');
        icon.style.setProperty('-moz-osx-font-smoothing', 'grayscale', 'important');
        
        // 根據圖示類型設置正確的 emoji
        if (icon.closest('[data-type="stock"]')) {
            icon.textContent = '📈';
        } else if (icon.closest('[data-type="etf"]')) {
            icon.textContent = '📊';
        } else if (icon.closest('[data-type="bond"]')) {
            icon.textContent = '💼';
        }
        
        // 強制重新渲染
        const display = icon.style.display;
        icon.style.display = 'none';
        icon.offsetHeight; // 觸發 reflow
        icon.style.display = display;
    });
    
    console.log('✅ 投資類型圖示修復完成！');
}

// 多重執行確保修復成功
function runIconFix() {
    fixInvestmentTypeIcons();
    
    // 延遲再次執行
    setTimeout(fixInvestmentTypeIcons, 100);
    setTimeout(fixInvestmentTypeIcons, 500);
    setTimeout(fixInvestmentTypeIcons, 1000);
}

// 頁面載入時執行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runIconFix);
} else {
    runIconFix();
}

// 主題切換時執行
const iconFixObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
            setTimeout(fixInvestmentTypeIcons, 200);
        }
    });
});

iconFixObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
});

// 導出函數供手動調用
window.fixInvestmentTypeIcons = fixInvestmentTypeIcons;

console.log('🔧 投資類型圖示修復腳本已載入');
