// 統一圖示修復腳本 - 避免變數衝突
console.log('🔧 載入統一圖示修復腳本...');

(function() {
    'use strict';
    
    // 使用 IIFE 避免全域變數衝突
    let iconFixObserver = null;
    let isInitialized = false;
    
    // 主要修復函數
    function unifiedIconFix() {
        if (isInitialized) {
            console.log('圖示修復已初始化，跳過重複執行');
            return;
        }
        
        console.log('🚀 執行統一圖示修復...');
        
        // 1. 修復字體設置
        const iconSelectors = [
            '.summary-icon', '.record-type-icon', '.ledger-tab-icon', '.type-icon',
            '.dividend-stat-icon', '.title-icon', '.stock-icon-large', '.form-header-icon',
            '.back-btn-icon', '.tab-icon', '.fab-btn', '.back-btn', '.input-back-btn',
            '.modal-back-btn', '.dca-back-btn', '.dca-setup-back-btn', '.detail-back-btn',
            '.investment-back-btn', '.investment-form-back-btn', '.daily-budget-back-btn',
            '.nav-back-btn', '[class*="icon"]', '[class*="Icon"]'
        ];
        
        iconSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
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
            });
        });
        
        // 2. 清理亂碼
        const garbageElements = document.querySelectorAll('.metric-quote-btn, .metric-quick-link, .theme-item-preview--image.error, .record-card.dividend-reinvest');
        garbageElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element, '::before');
            if (computedStyle.content && computedStyle.content.includes('')) {
                element.style.setProperty('--before-content', 'none', 'important');
            }
        });
        
        // 3. 攔截 emoji URL 請求
        if (!window.fetch._intercepted) {
            const originalFetch = window.fetch;
            window.fetch = function(url, options) {
                if (typeof url === 'string' && /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(url)) {
                    console.warn('🚫 攔截 emoji URL 請求:', url);
                    return Promise.reject(new Error('Emoji URL 請求被阻止'));
                }
                return originalFetch.apply(this, arguments);
            };
            window.fetch._intercepted = true;
        }
        
        isInitialized = true;
        console.log('✅ 統一圖示修復完成');
    }
    
    // 初始化觀察器
    function initObserver() {
        if (iconFixObserver) {
            iconFixObserver.disconnect();
        }
        
        iconFixObserver = new MutationObserver((mutations) => {
            let shouldFix = false;
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    shouldFix = true;
                }
            });
            
            if (shouldFix) {
                setTimeout(unifiedIconFix, 200);
            }
        });
        
        iconFixObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }
    
    // 頁面載入時執行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            unifiedIconFix();
            initObserver();
        });
    } else {
        setTimeout(() => {
            unifiedIconFix();
            initObserver();
        }, 100);
    }
    
    // 導出函數
    window.unifiedIconFix = unifiedIconFix;
    window.forceIconFix = () => {
        isInitialized = false;
        unifiedIconFix();
    };
    
    console.log('🔧 統一圖示修復腳本已載入');
})();
