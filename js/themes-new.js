// ========== 新主題定義模組 ==========
// 這個檔案專門用於存放新添加的主題
// 會在主 theme.js 之後載入，確保主題系統正常運行

// 新主題陣列 - 將會合併到主題系統中
const newThemes = [
    {
        id: 'deepElegant',
        name: '深色優雅',
        category: 'elegant',
        description: '基於深色圖片的優雅主題，包含漸層和毛玻璃效果',
        icon: '🌙',
        preview: 'url("https://i.pinimg.com/736x/32/91/28/3291288e558fa4511b83ecb6f8a96d22.jpg") center/cover',
        cssFile: 'deep-elegant-theme.css',
        author: 'System',
        version: '1.0.0',
        tags: ['dark', 'elegant', 'gradient', 'glass'],
        features: [
            '深色背景圖片',
            '毛玻璃效果',
            '高對比度文字',
            '優雅卡片設計',
            '響應式適配'
        ],
        customColors: {
            primary: '#1a1f3a',
            secondary: '#2d1b69',
            accent: '#4a3c8c',
            background: '#0d0d1a',
            text: '#ffffff'
        }
    }
];

// 新主題分類定義
const newThemeCategories = {
    elegant: {
        name: '優雅風格',
        description: '優雅、現代的主題風格',
        icon: '✨',
        color: '#4a3c8c'
    }
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

// 頁面載入完成後立即合併新主題（無延遲）
document.addEventListener('DOMContentLoaded', () => {
    // 立即合併新主題，確保在主題系統初始化之前完成
    mergeNewThemes();
    
    // 等待主題系統初始化完成後更新選擇器
    setTimeout(() => {
        if (typeof updateThemeSelector === 'function') {
            updateThemeSelector();
        }
        
        // 如果當前已經選擇了我們的新主題，重新應用
        const currentTheme = getCurrentTheme ? getCurrentTheme() : null;
        // 主題相關的檢查和應用邏輯已移除
    }, 200);
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
