// ========== 新主題定義模組 ==========
// 這個檔案專門用於存放新添加的主題
// 會在主 theme.js 之後載入，確保主題系統正常運行

// 新主題陣列 - 將會合併到主題系統中
const newThemes = [
    {
        id: 'cosmicDream',
        name: '宇宙夢幻',
        icon: '🌌',
        buttonIcon: '✨',
        preview: 'url("images/theme/cosmic-dream-bg.jpg") center/cover',
        color: '#B19CD9',
        category: 'cosmic',
        backgroundImage: 'images/theme/cosmic-dream-bg.jpg',
        investmentCardImage: 'images/theme/cosmic-dream-bg.jpg',
        accountingCardImage: 'images/theme/cosmic-dream-bg.jpg',
        walletBudgetCardImage: 'images/theme/cosmic-dream-bg.jpg',
        monthlyPlanningCardImage: 'images/theme/cosmic-dream-bg.jpg',
        investmentSettingsCardImage: 'images/theme/cosmic-dream-bg.jpg',
        holdingCardImage: 'images/theme/cosmic-dream-bg.jpg',
        buyingCardImage: 'images/theme/cosmic-dream-bg.jpg',
        sellingCardImage: 'images/theme/cosmic-dream-bg.jpg',
        dividendCardImage: 'images/theme/cosmic-dream-bg.jpg',
        smartAnalysisCardImage: 'images/theme/cosmic-dream-bg.jpg',
        smartReminderCardImage: 'images/theme/cosmic-dream-bg.jpg',
        regularInvestmentCardImage: 'images/theme/cosmic-dream-bg.jpg'
    },
    {
        id: 'flowerSeaStar',
        name: '花海星語',
        icon: '🌸',
        buttonIcon: '🌊',
        preview: 'url("https://i.pinimg.com/736x/bf/6c/3c/bf6c3c24e13b16480fe60f0fded5d5d2.jpg") center/cover',
        color: '#9BB5FF',
        category: 'anime',
        backgroundImage: 'https://i.pinimg.com/736x/bf/6c/3c/bf6c3c24e13b16480fe60f0fded5d5d2.jpg',
        walletBudgetCardImage: 'https://i.pinimg.com/736x/00/b1/a5/00b1a59e8f876c4cfeb2374f25e95381.jpg'
    }
    // 未來的新主題將在這裡添加
];

// 新主題分類定義
const newThemeCategories = {
    // 未來的新分類將在這裡添加
};

// 新主題動畫定義
const newThemeAnimations = {
    // 未來的新動畫將在這裡添加
};

// 主題合併函數
function mergeNewThemes() {
    try {
        // 檢查主題系統是否存在
        if (typeof themes !== 'undefined' && Array.isArray(themes)) {
            // 合併新主題到主題陣列
            themes.push(...newThemes);
            console.log(`✅ 已合併 ${newThemes.length} 個新主題`);
        } else {
            console.warn('⚠️ 主題系統未載入，無法合併新主題');
        }

        // 合併新主題分類
        if (typeof themeCategories !== 'undefined' && themeCategories) {
            Object.assign(themeCategories, newThemeCategories);
            console.log(`✅ 已合併新主題分類`);
        }

        // 合併新主題動畫
        if (typeof themeAnimations !== 'undefined' && themeAnimations) {
            Object.assign(themeAnimations, newThemeAnimations);
            console.log(`✅ 已合併新主題動畫`);
        }

        // 更新主題選擇器（如果存在）
        if (typeof updateThemeSelector === 'function') {
            updateThemeSelector();
        }

    } catch (error) {
        console.error('❌ 合併新主題時發生錯誤:', error);
    }
}

// 添加新主題的便捷函數
function addNewTheme(themeObject) {
    try {
        if (typeof themes !== 'undefined' && Array.isArray(themes)) {
            themes.push(themeObject);
            console.log(`✅ 已添加新主題: ${themeObject.name}`);
            
            // 更新主題選擇器
            if (typeof updateThemeSelector === 'function') {
                updateThemeSelector();
            }
            
            return true;
        } else {
            console.warn('⚠️ 主題系統未載入，無法添加新主題');
            return false;
        }
    } catch (error) {
        console.error('❌ 添加新主題時發生錯誤:', error);
        return false;
    }
}

// 移除主題的便捷函數
function removeTheme(themeId) {
    try {
        if (typeof themes !== 'undefined' && Array.isArray(themes)) {
            const index = themes.findIndex(theme => theme.id === themeId);
            if (index !== -1) {
                const removedTheme = themes.splice(index, 1)[0];
                console.log(`✅ 已移除主題: ${removedTheme.name}`);
                
                // 更新主題選擇器
                if (typeof updateThemeSelector === 'function') {
                    updateThemeSelector();
                }
                
                return true;
            } else {
                console.warn(`⚠️ 找不到主題: ${themeId}`);
                return false;
            }
        } else {
            console.warn('⚠️ 主題系統未載入，無法移除主題');
            return false;
        }
    } catch (error) {
        console.error('❌ 移除主題時發生錯誤:', error);
        return false;
    }
}

// 獲取所有新主題
function getNewThemes() {
    return [...newThemes];
}

// 獲取特定新主題
function getNewTheme(themeId) {
    return newThemes.find(theme => theme.id === themeId);
}

// 頁面載入完成後自動合併新主題
document.addEventListener('DOMContentLoaded', () => {
    // 等待一確保主題系統已載入
    setTimeout(() => {
        mergeNewThemes();
    }, 100);
});

// 導出函數供外部使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addNewTheme,
        removeTheme,
        getNewThemes,
        getNewTheme,
        mergeNewThemes
    };
}
