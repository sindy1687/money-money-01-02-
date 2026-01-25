// 強制小王子主題持股卡片樣式應用腳本
function forceLittlePrinceCardStyles() {
    // 檢查當前是否為小王子主題
    const currentTheme = document.body.getAttribute('data-theme') || 
                        document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'littlePrince') {
        console.log('強制應用小王子主題持股卡片樣式...');
        
        // 查找所有持股相關卡片
        const allCards = document.querySelectorAll('.holding-card, .holdings-card, .stock-holding-card, .stock-card, .portfolio-card');
        
        allCards.forEach((card, index) => {
            // 強制設置內聯樣式以覆蓋所有其他樣式
            card.style.setProperty('background', 'url("https://i.pinimg.com/736x/91/87/48/918748238a3b26c91dcacd9926591d57.jpg") center/cover fixed', 'important');
            card.style.setProperty('background-image', 'url("https://i.pinimg.com/736x/91/87/48/918748238a3b26c91dcacd9926591d57.jpg")', 'important');
            card.style.setProperty('background-size', 'cover', 'important');
            card.style.setProperty('background-position', 'center', 'important');
            card.style.setProperty('background-repeat', 'no-repeat', 'important');
            card.style.setProperty('border', '3px solid #D4AF37', 'important');
            card.style.setProperty('border-radius', '16px', 'important');
            card.style.setProperty('box-shadow', '0 8px 32px rgba(212, 175, 55, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2)', 'important');
            card.style.setProperty('backdrop-filter', 'blur(20px)', 'important');
            card.style.setProperty('position', 'relative', 'important');
            card.style.setProperty('overflow', 'hidden', 'important');
            
            // 添加懸停效果
            card.addEventListener('mouseenter', function() {
                this.style.setProperty('transform', 'translateY(-4px) scale(1.02)', 'important');
                this.style.setProperty('box-shadow', '0 12px 40px rgba(212, 175, 55, 0.4), 0 6px 20px rgba(0, 0, 0, 0.3)', 'important');
                this.style.setProperty('border-color', '#E6A87C', 'important');
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.setProperty('transform', 'none', 'important');
                this.style.setProperty('box-shadow', '0 8px 32px rgba(212, 175, 55, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2)', 'important');
                this.style.setProperty('border-color', '#D4AF37', 'important');
            });
            
            console.log(`持股卡片 ${index + 1} 樣式已強制應用`);
        });
        
        // 強制設置文字樣式
        allCards.forEach(card => {
            const textElements = card.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div');
            textElements.forEach(element => {
                element.style.setProperty('color', '#2C3E50', 'important');
                element.style.setProperty('font-family', 'Georgia, Times New Roman, Noto Sans TC, serif', 'important');
                element.style.setProperty('position', 'relative', 'important');
                element.style.setProperty('z-index', '2', 'important');
            });
        });
        
        console.log(`✅ 已強制應用 ${allCards.length} 個持股卡片的小王子主題樣式`);
    }
}

// 監聽主題變化
function observeThemeChanges() {
    // 創建一個觀察器來監聽屬性變化
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && 
                (mutation.attributeName === 'data-theme' || 
                 mutation.attributeName === 'class')) {
                // 延遲一點時間讓CSS樣式應用
                setTimeout(forceLittlePrinceCardStyles, 100);
            }
        });
    });
    
    // 觀察body和html元素的屬性變化
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme', 'class']
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'class']
    });
    
    console.log('主題變化監聽器已啟動');
}

// 攔截原始的applyTheme函數
if (typeof applyTheme === 'function') {
    const originalApplyTheme = applyTheme;
    applyTheme = function(themeId) {
        // 調用原始函數
        const result = originalApplyTheme.apply(this, arguments);
        
        // 如果是小王子主題，強制應用卡片樣式
        if (themeId === 'littlePrince') {
            setTimeout(forceLittlePrinceCardStyles, 200);
        }
        
        return result;
    };
    
    console.log('applyTheme函數已攔截並增強');
}

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    // 啟動主題變化監聽
    observeThemeChanges();
    
    // 如果當前已經是小王子主題，立即應用
    setTimeout(forceLittlePrinceCardStyles, 500);
});

// 也可以手動調用
window.forceLittlePrinceCardStyles = forceLittlePrinceCardStyles;

console.log('小王子主題持股卡片強制應用腳本已載入');
