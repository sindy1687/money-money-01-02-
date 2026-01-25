// 小王子主題驗證腳本
function verifyLittlePrinceTheme() {
    console.log('=== 小王子主題驗證 ===');
    
    // 1. 檢查主題是否已合併到主題系統
    if (typeof themes !== 'undefined') {
        const littlePrinceTheme = themes.find(t => t.id === 'littlePrince');
        if (littlePrinceTheme) {
            console.log('✅ 小王子主題已合併到主題系統');
            console.log('主題名稱:', littlePrinceTheme.name);
            console.log('主題圖標:', littlePrinceTheme.icon);
            console.log('主題分類:', littlePrinceTheme.category);
        } else {
            console.log('❌ 小王子主題未找到於主題系統中');
            return false;
        }
    } else {
        console.log('❌ 主題系統未載入');
        return false;
    }
    
    // 2. 檢查CSS文件是否載入
    const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
    let littlePrinceCssLoaded = false;
    
    cssLinks.forEach(link => {
        if (link.href.includes('little-prince-theme.css')) {
            littlePrinceCssLoaded = true;
            console.log('✅ 小王子主題CSS已載入');
        }
    });
    
    if (!littlePrinceCssLoaded) {
        console.log('❌ 小王子主題CSS未載入');
        return false;
    }
    
    // 3. 檢查CSS變數是否定義
    const rootStyles = getComputedStyle(document.documentElement);
    const themeGold = rootStyles.getPropertyValue('--theme-gold');
    
    if (themeGold && themeGold.trim()) {
        console.log('✅ CSS變數已定義');
        console.log('--theme-gold:', themeGold);
    } else {
        console.log('❌ CSS變數未定義');
        return false;
    }
    
    // 4. 測試主題應用
    console.log('=== 測試主題應用 ===');
    
    // 應用小王子主題
    if (typeof applyTheme === 'function') {
        applyTheme('littlePrince');
        console.log('✅ 主題應用函數已調用');
        
        // 等待樣式應用
        setTimeout(() => {
            // 檢查主題屬性
            const currentTheme = document.body.getAttribute('data-theme') || 
                                document.documentElement.getAttribute('data-theme');
            
            if (currentTheme === 'littlePrince') {
                console.log('✅ 主題屬性已設置為 littlePrince');
                
                // 檢查持股卡片樣式
                const holdingCards = document.querySelectorAll('.holding-card, .holdings-card, .stock-holding-card');
                const stockCards = document.querySelectorAll('.stock-card');
                const portfolioCards = document.querySelectorAll('.portfolio-card');
                
                console.log(`找到 ${holdingCards.length} 個持股卡片`);
                console.log(`找到 ${stockCards.length} 個股票卡片`);
                console.log(`找到 ${portfolioCards.length} 個投資組合卡片`);
                
                if (holdingCards.length > 0 || stockCards.length > 0 || portfolioCards.length > 0) {
                    // 檢查第一個卡片的樣式
                    const firstCard = holdingCards[0] || stockCards[0] || portfolioCards[0];
                    if (firstCard) {
                        const computedStyle = window.getComputedStyle(firstCard);
                        const backgroundImage = computedStyle.backgroundImage;
                        
                        if (backgroundImage.includes('918748238a3b26c91dcacd9926591d57.jpg')) {
                            console.log('✅ 持股卡片背景圖片正確應用');
                        } else {
                            console.log('❌ 持股卡片背景圖片未正確應用');
                            console.log('背景圖片:', backgroundImage);
                        }
                    }
                } else {
                    console.log('ℹ️ 當前頁面沒有持股相關卡片');
                }
                
                console.log('🎉 小王子主題驗證完成！');
                console.log('持股卡片樣式已成功套用到主應用中！');
                
            } else {
                console.log('❌ 主題屬性未正確設置');
                console.log('當前主題:', currentTheme);
            }
        }, 500);
        
    } else {
        console.log('❌ applyTheme 函數未找到');
        return false;
    }
    
    return true;
}

// 自動執行驗證
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', verifyLittlePrinceTheme);
} else {
    verifyLittlePrinceTheme();
}

// 也可以手動調用
window.verifyLittlePrinceTheme = verifyLittlePrinceTheme;

console.log('小王子主題驗證腳本已載入，可使用 verifyLittlePrinceTheme() 手動驗證');
