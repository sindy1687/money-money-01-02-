// 清理亂碼圖示腳本
console.log('🧹 開始清理亂碼圖示...');

function cleanGarbageIcons() {
    console.log('🗑️ 清理 CSS 中的亂碼圖示...');
    
    // 需要清理的亂碼 content 屬性
    const garbagePatterns = [
        'content: \'\';',
        'content: \'麱\';',
        'content: \' 硋翰罸\';',
        'content: \'\';',
        'content: \'\';',
        'content: \'\';',
        'content: \'\';'
    ];
    
    // 清理 CSS 中的亂碼
    const stylesheets = document.styleSheets;
    let cleanedCount = 0;
    
    for (let i = 0; i < stylesheets.length; i++) {
        try {
            const rules = stylesheets[i].cssRules || stylesheets[i].rules;
            for (let j = 0; j < rules.length; j++) {
                const rule = rules[j];
                if (rule.style) {
                    garbagePatterns.forEach(pattern => {
                        if (rule.style.content && rule.style.content.includes('')) {
                            console.log('清理亂碼:', rule.selectorText, rule.style.content);
                            rule.style.content = '';
                            cleanedCount++;
                        }
                    });
                }
            }
        } catch (e) {
            // 跨域樣式表可能無法訪問
        }
    }
    
    // 清理 DOM 中的偽元素
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
        const computedStyle = window.getComputedStyle(element, ':before');
        const beforeContent = computedStyle.content;
        
        if (beforeContent && beforeContent.includes('')) {
            console.log('清理元素偽元素:', element.className, beforeContent);
            // 強制移除偽元素
            element.style.setProperty('--before-content', 'none');
            cleanedCount++;
        }
        
        const afterStyle = window.getComputedStyle(element, ':after');
        const afterContent = afterStyle.content;
        
        if (afterContent && afterContent.includes('')) {
            console.log('清理元素偽元素(after):', element.className, afterContent);
            element.style.setProperty('--after-content', 'none');
            cleanedCount++;
        }
    });
    
    // 添加清理 CSS
    const cleanStyle = document.createElement('style');
    cleanStyle.textContent = `
        /* 清理亂碼圖示 */
        .metric-quote-btn::before { content: none !important; }
        .metric-quick-link::before { content: none !important; }
        .theme-item-preview--image.error::after { content: none !important; }
        .record-card.dividend-reinvest::after { content: none !important; }
        .investment-form-back-btn::before { content: none !important; }
        .form-query-btn::before { content: none !important; }
        .quick-title::before { content: none !important; }
        .input-page-header::after { content: none !important; }
        .investment-back-btn::before { content: none !important; }
        .input-field-label::before { content: none !important; }
        :root[data-theme="fruit"] .card::after { content: none !important; }
        :root[data-theme="fruit"] .investment-card::after { content: none !important; }
        :root[data-theme="fruit"] .budget-card::after { content: none !important; }
        :root[data-theme="fruit"] .wallet-card::after { content: none !important; }
        :root[data-theme="fruit"] .chart-card::after { content: none !important; }
        .stock-grid-card-tag--shares::before { content: none !important; }
        :root[data-theme="emeraldPrince"] .komori-dialog::before { content: none !important; }
        
        /* 隱藏所有包含亂碼的偽元素 */
        [class*="btn"]::before,
        [class*="icon"]::before,
        [class*="card"]::after {
            content: none !important;
        }
    `;
    document.head.appendChild(cleanStyle);
    
    console.log(`✅ 清理完成，共清理了 ${cleanedCount} 個亂碼圖示`);
    
    return cleanedCount;
}

// 立即執行清理
cleanGarbageIcons();

// 頁面載入完成後再次清理
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanGarbageIcons);
} else {
    setTimeout(cleanGarbageIcons, 1000);
}

// 導出函數供手動調用
window.cleanGarbageIcons = cleanGarbageIcons;

console.log('🧹 亂碼圖示清理腳本已載入');
