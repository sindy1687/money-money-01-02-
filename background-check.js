// 專業深色背景檢查程式
function checkProfessionalDarkBackground() {
    console.log('🔍 開始檢查專業深色背景設定...');
    
    // 檢查當前主題
    const currentTheme = document.documentElement.getAttribute('data-theme');
    console.log('📱 當前主題:', currentTheme);
    
    if (currentTheme !== 'dreamy-dynamic') {
        console.log('⚠️ 請先切換到夢幻動態主題');
        return false;
    }
    
    // 檢查投資和持有卡片元素
    const investmentCards = document.querySelectorAll('.investment-card');
    const holdingCards = document.querySelectorAll('.holding-card');
    
    console.log('📊 投資卡片數量:', investmentCards.length);
    console.log('📊 持有卡片數量:', holdingCards.length);
    
    if (investmentCards.length === 0 && holdingCards.length === 0) {
        console.log('❌ 未找到投資或持有卡片元素');
        return false;
    }
    
    // 檢查每個卡片的背景設定
    const allCards = [...investmentCards, ...holdingCards];
    let results = [];
    
    allCards.forEach((card, index) => {
        const computedStyle = window.getComputedStyle(card);
        const cardType = card.classList.contains('investment-card') ? '投資卡片' : '持有卡片';
        
        const result = {
            index: index + 1,
            type: cardType,
            element: card,
            background: computedStyle.background,
            backgroundColor: computedStyle.backgroundColor,
            backgroundImage: computedStyle.backgroundImage,
            backgroundSize: computedStyle.backgroundSize,
            backgroundPosition: computedStyle.backgroundPosition,
            backgroundRepeat: computedStyle.backgroundRepeat,
            backgroundAttachment: computedStyle.backgroundAttachment,
            color: computedStyle.color,
            borderColor: computedStyle.borderColor,
            boxShadow: computedStyle.boxShadow,
            isDarkBackground: false,
            hasGradient: false,
            hasImportant: false
        };
        
        // 檢查是否為深色背景
        const darkColors = ['#1a1f2e', '#2d3748', '#1a202c', '#1e2433'];
        const bgValue = result.backgroundColor;
        
        result.isDarkBackground = darkColors.some(color => 
            bgValue.includes(color) || 
            bgValue.includes('rgb(26, 31, 46)') || 
            bgValue.includes('rgb(45, 55, 72)') ||
            bgValue.includes('rgb(26, 32, 44)')
        );
        
        // 檢查是否為漸層背景
        result.hasGradient = result.background.includes('gradient');
        
        // 檢查是否使用 !important
        const cssRules = document.styleSheets;
        let hasImportant = false;
        
        for (let sheet of cssRules) {
            try {
                for (let rule of sheet.cssRules) {
                    if (rule.selectorText && 
                        (rule.selectorText.includes('.investment-card') || 
                         rule.selectorText.includes('.holding-card')) &&
                        rule.style.cssText.includes('!important')) {
                        hasImportant = true;
                        break;
                    }
                }
                if (hasImportant) break;
            } catch (e) {
                // 跨域樣式表可能無法訪問
            }
        }
        result.hasImportant = hasImportant;
        
        results.push(result);
        
        console.log(`📋 ${cardType} #${index + 1}:`);
        console.log(`   背景: ${result.background}`);
        console.log(`   背景色: ${result.backgroundColor}`);
        console.log(`   背景圖片: ${result.backgroundImage}`);
        console.log(`   文字顏色: ${result.color}`);
        console.log(`   邊框顏色: ${result.borderColor}`);
        console.log(`   是否深色背景: ${result.isDarkBackground}`);
        console.log(`   是否漸層背景: ${result.hasGradient}`);
        console.log(`   是否使用 !important: ${result.hasImportant}`);
        console.log('---');
    });
    
    // 總結檢查結果
    const darkBackgroundCount = results.filter(r => r.isDarkBackground).length;
    const gradientCount = results.filter(r => r.hasGradient).length;
    const importantCount = results.filter(r => r.hasImportant).length;
    
    console.log('\n📈 檢查結果總結:');
    console.log(`✅ 深色背景卡片: ${darkBackgroundCount}/${allCards.length}`);
    console.log(`✅ 漸層背景卡片: ${gradientCount}/${allCards.length}`);
    console.log(`✅ 使用 !important 的卡片: ${importantCount}/${allCards.length}`);
    
    const success = darkBackgroundCount === allCards.length && 
                   gradientCount === allCards.length && 
                   importantCount > 0;
    
    if (success) {
        console.log('🎉 專業深色背景設定成功！');
        console.log('💡 所有投資和持有卡片都使用強制深色背景');
    } else {
        console.log('❌ 專業深色背景設定失敗！');
        console.log('💡 請檢查CSS優先級或瀏覽器緩存');
    }
    
    return success;
}

// 檢查CSS變數
function checkCSSVariables() {
    console.log('\n🎨 檢查CSS變數...');
    
    const root = document.documentElement;
    const computedStyle = window.getComputedStyle(root);
    
    const variables = [
        '--text-primary',
        '--text-secondary', 
        '--text-muted',
        '--text-dark',
        '--text-dark-secondary',
        '--text-dark-muted',
        '--border-color',
        '--shadow-color',
        '--glass-bg',
        '--glass-border'
    ];
    
    variables.forEach(variable => {
        const value = computedStyle.getPropertyValue(variable);
        console.log(`${variable}: ${value}`);
    });
}

// 檢查主題CSS文件載入狀態
function checkThemeCSSLoaded() {
    console.log('\n📚 檢查主題CSS文件載入狀態...');
    
    const themeCSS = Array.from(document.styleSheets).find(sheet => 
        sheet.href && sheet.href.includes('dreamy-dynamic-theme.css')
    );
    
    if (themeCSS) {
        console.log('✅ dreamy-dynamic-theme.css 已載入');
        console.log(`📁 文件路徑: ${themeCSS.href}`);
        
        // 檢查CSS規則數量
        try {
            console.log(`📊 CSS規則數量: ${themeCSS.cssRules.length}`);
            
            // 查找投資和持有卡片相關規則
            const cardRules = Array.from(themeCSS.cssRules).filter(rule => 
                rule.selectorText && 
                (rule.selectorText.includes('.investment-card') || 
                 rule.selectorText.includes('.holding-card'))
            );
            
            console.log(`🎯 投資和持有卡片相關規則數量: ${cardRules.length}`);
            
            cardRules.forEach((rule, index) => {
                console.log(`   規則 ${index + 1}: ${rule.selectorText}`);
                console.log(`   樣式: ${rule.style.cssText.substring(0, 100)}...`);
            });
        } catch (e) {
            console.log('⚠️ 無法訪問CSS規則（可能是跨域限制）');
        }
    } else {
        console.log('❌ dreamy-dynamic-theme.css 未載入');
    }
}

// 強制重新應用深色背景
function forceApplyDarkBackground() {
    console.log('\n🔧 強制重新應用深色背景...');
    
    const investmentCards = document.querySelectorAll('.investment-card');
    const holdingCards = document.querySelectorAll('.holding-card');
    
    const allCards = [...investmentCards, ...holdingCards];
    
    allCards.forEach((card, index) => {
        // 強制設置內聯樣式
        card.style.setProperty('background', 'linear-gradient(145deg, #1a1f2e 0%, #2d3748 50%, #1a202c 100%)', 'important');
        card.style.setProperty('background-color', '#1a1f2e', 'important');
        card.style.setProperty('background-image', 'linear-gradient(145deg, #1a1f2e 0%, #2d3748 50%, #1a202c 100%)', 'important');
        card.style.setProperty('color', '#FFFFFF', 'important');
        card.style.setProperty('border', '1px solid rgba(139, 92, 246, 0.3)', 'important');
        card.style.setProperty('border-radius', '16px', 'important');
        
        console.log(`✅ 強制設置 ${card.classList.contains('investment-card') ? '投資卡片' : '持有卡片'} #${index + 1}`);
    });
    
    console.log('🎯 強制重新應用完成');
}

// 主檢查函數
function runFullCheck() {
    console.log('🚀 開始完整檢查程式...\n');
    
    // 檢查主題CSS載入
    checkThemeCSSLoaded();
    
    // 檢查CSS變數
    checkCSSVariables();
    
    // 檢查專業深色背景
    const success = checkProfessionalDarkBackground();
    
    if (!success) {
        console.log('\n🔧 嘗試強制修復...');
        forceApplyDarkBackground();
        
        // 重新檢查
        setTimeout(() => {
            console.log('\n🔄 重新檢查...');
            checkProfessionalDarkBackground();
        }, 1000);
    }
    
    console.log('\n✅ 檢查程式完成！');
    return success;
}

// 自動運行檢查
if (typeof window !== 'undefined') {
    // 等待DOM載入完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runFullCheck);
    } else {
        runFullCheck();
    }
}

// 導出到全局供手動調用
if (typeof window !== 'undefined') {
    window.checkProfessionalDarkBackground = checkProfessionalDarkBackground;
    window.forceApplyDarkBackground = forceApplyDarkBackground;
    window.runFullCheck = runFullCheck;
}
