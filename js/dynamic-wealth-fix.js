// 動態財富主題修復腳本
// 用於修復動態財富主題的顯示問題

(function() {
    'use strict';
    
    // 檢查是否已經載入主題系統
    if (typeof window.themes === 'undefined') {
        console.warn('動態財富主題修復：主題系統未載入');
        return;
    }
    
    // 動態財富主題配置
    const dynamicWealthTheme = {
        id: 'dynamicWealth',
        name: '動態財富',
        icon: '💰',
        buttonIcon: '💎',
        preview: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 35%, #FF8A65 100%)',
        color: '#FFD700',
        category: 'wealth'
    };
    
    // 檢查主題是否已存在
    const existingTheme = window.themes.find(t => t.id === dynamicWealthTheme.id);
    
    if (!existingTheme) {
        // 添加主題到主題列表
        window.themes.push(dynamicWealthTheme);
        console.log('✅ 動態財富主題已添加到主題列表');
    } else {
        // 更新現有主題配置
        Object.assign(existingTheme, dynamicWealthTheme);
        console.log('✅ 動態財富主題配置已更新');
    }
    
    // 添加按鈕圖標配置
    if (typeof window.buttonIcons !== 'undefined') {
        window.buttonIcons.dynamicWealth = {
            fab: '💰',
            navLedger: '💎',
            navWallet: '💰',
            navInvestment: '📈',
            navChart: '📊',
            navSettings: '⚙️'
        };
        console.log('✅ 動態財富主題按鈕圖標已配置');
    }
    
    // 修復CSS載入問題
    function ensureDynamicWealthCSS() {
        const cssId = 'dynamic-wealth-theme-css';
        let cssElement = document.getElementById(cssId);
        
        if (!cssElement) {
            cssElement = document.createElement('link');
            cssElement.id = cssId;
            cssElement.rel = 'stylesheet';
            cssElement.href = 'dynamic-wealth-theme.css';
            document.head.appendChild(cssElement);
            console.log('✅ 動態財富主題CSS已載入');
        }
    }
    
    // 立即載入CSS
    ensureDynamicWealthCSS();
    
    // 監聽主題變更，確保CSS正確載入
    const originalApplyTheme = window.applyTheme;
    if (typeof originalApplyTheme === 'function') {
        window.applyTheme = function(themeId) {
            const result = originalApplyTheme.call(this, themeId);
            
            // 如果切換到動態財富主題，確保CSS已載入
            if (themeId === 'dynamicWealth') {
                ensureDynamicWealthCSS();
            }
            
            return result;
        };
        console.log('✅ 動態財富主題應用函數已修復');
    }
    
    // 修復主題選擇器中的顯示
    function updateThemeSelector() {
        const themeGrid = document.getElementById('themeGrid');
        if (themeGrid) {
            // 檢查是否包含動態財富主題
            const themeItems = themeGrid.querySelectorAll('.theme-item');
            let hasDynamicWealth = false;
            
            themeItems.forEach(item => {
                if (item.dataset.themeId === 'dynamicWealth') {
                    hasDynamicWealth = true;
                    // 確保圖標和名稱正確
                    const icon = item.querySelector('.theme-item-icon');
                    const name = item.querySelector('.theme-item-name');
                    
                    if (icon) icon.textContent = dynamicWealthTheme.icon;
                    if (name) name.textContent = dynamicWealthTheme.name;
                }
            });
            
            if (!hasDynamicWealth) {
                console.log('⚠️ 動態財富主題未在選擇器中找到，可能需要重新載入主題選擇器');
            }
        }
    }
    
    // 延遲更新主題選擇器
    setTimeout(updateThemeSelector, 1000);
    
    // 添加到全局修復列表
    if (!window.themeFixes) {
        window.themeFixes = [];
    }
    window.themeFixes.push({
        name: '動態財富主題修復',
        version: '1.0.0',
        applied: new Date().toISOString()
    });
    
    console.log('🎉 動態財富主題修復腳本已執行完成');
    
})();
