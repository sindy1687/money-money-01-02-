// ========== 主題系統 ==========

// 主題定義
const themes = [
    // 基礎主題
    {
        id: 'pink',
        name: '粉色主題',
        icon: '💖',
        buttonIcon: '💗',
        preview: 'linear-gradient(135deg, #ffeef5 0%, #fff5f9 100%)',
        color: '#ff69b4',
        category: 'basic'
    },
    {
        id: 'blue',
        name: '藍色主題',
        icon: '💙',
        buttonIcon: '💙',
        preview: 'linear-gradient(135deg, #e8f4fd 0%, #f0f8ff 100%)',
        color: '#4a90e2',
        category: 'basic'
    },
    {
        id: 'green',
        name: '綠色主題',
        icon: '💚',
        buttonIcon: '💚',
        preview: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8f4 100%)',
        color: '#4caf50',
        category: 'basic'
    },
    {
        id: 'purple',
        name: '紫色主題',
        icon: '💜',
        buttonIcon: '💜',
        preview: 'linear-gradient(135deg, #f3e5f5 0%, #fce4ec 100%)',
        color: '#9c27b0',
        category: 'basic'
    },
    {
        id: 'orange',
        name: '橙色主題',
        icon: '🧡',
        buttonIcon: '🧡',
        preview: 'linear-gradient(135deg, #fff3e0 0%, #fff8f0 100%)',
        color: '#ff9800',
        category: 'basic'
    },
    {
        id: 'cyan',
        name: '青色主題',
        icon: '💠',
        buttonIcon: '💠',
        preview: 'linear-gradient(135deg, #e0f7fa 0%, #f0fdff 100%)',
        color: '#00bcd4',
        category: 'basic'
    },
    
    // 特殊主題
    {
        id: 'shinobu',
        name: '蝴蝶忍',
        icon: '🦋',
        buttonIcon: '🗡️',
        preview: 'url("https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg") center/cover',
        color: '#9B59B6',
        category: 'anime',
        backgroundImage: 'https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg',
        investmentCardImage: 'https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg',
        accountingCardImage: 'https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg',
        walletBudgetCardImage: 'https://i.pinimg.com/736x/8b/18/2b/8b182b4b3bdc6420ae9bb42b08025854.jpg',
        monthlyPlanningCardImage: 'https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg',
        investmentSettingsCardImage: 'https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg',
        holdingCardImage: 'https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg',
        buyingCardImage: 'https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg',
        sellingCardImage: 'https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg',
        dividendCardImage: 'https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg'
    },
    
    // 其他主題...
    // (這裡可以繼續添加其他主題定義)
];

// 主題分類
const themeCategories = {
    basic: {
        name: '基礎色彩',
        icon: '🎨',
        description: '簡潔的單色主題'
    },
    anime: {
        name: '動漫風格',
        icon: '🎌',
        description: '吉卜力、鬼滅等動漫主題'
    },
    nature: {
        name: '自然風景',
        icon: '🌿',
        description: '森林、海洋等自然主題'
    },
    luxury: {
        name: '奢華風格',
        icon: '💎',
        description: '高檔、典雅的主題'
    }
};

// 按鈕圖標配置
const buttonIcons = {
    pink: {
        fab: '💖',
        navLedger: '💗',
        navWallet: '💳',
        navInvestment: '📈',
        navChart: '📊',
        navSettings: '⚙️'
    },
    blue: {
        fab: '💙',
        navLedger: '📘',
        navWallet: '💳',
        navInvestment: '📈',
        navChart: '📊',
        navSettings: '⚙️'
    },
    green: {
        fab: '💚',
        navLedger: '📘',
        navWallet: '💳',
        navInvestment: '📈',
        navChart: '📊',
        navSettings: '⚙️'
    },
    shinobu: {
        fab: '🦋',
        navLedger: '🗡️',
        navWallet: '💜',
        navInvestment: '🌸',
        navChart: '🦋',
        navSettings: '⚡'
    }
    // 其他主題的按鈕圖標...
};

// ========== 核心功能 ==========

// 獲取當前主題
function getCurrentTheme() {
    // 優先使用 selectedTheme，如果沒有則使用舊的 theme 鍵值以保持向後兼容
    return localStorage.getItem('selectedTheme') || localStorage.getItem('theme') || 'blue';
}

function getCustomTheme() {
    // 獲取自定義主題設置
    const customTheme = {
        backgroundImage: localStorage.getItem('customBackgroundImage') || '',
        backgroundSize: localStorage.getItem('customBackgroundSize') || 'cover',
        backgroundPosition: localStorage.getItem('customBackgroundPosition') || 'center',
        backgroundRepeat: localStorage.getItem('customBackgroundRepeat') || 'no-repeat',
        backgroundAttachment: localStorage.getItem('customBackgroundAttachment') || 'fixed'
    };
    return customTheme;
}

function applyCustomTheme() {
    const customTheme = getCustomTheme();
    if (customTheme.backgroundImage) {
        document.body.style.backgroundImage = `url(${customTheme.backgroundImage})`;
        document.body.style.backgroundSize = customTheme.backgroundSize;
        document.body.style.backgroundPosition = customTheme.backgroundPosition;
        document.body.style.backgroundRepeat = customTheme.backgroundRepeat;
        document.body.style.backgroundAttachment = customTheme.backgroundAttachment;
    }
}

// 應用主題
function applyTheme(themeId) {
    const root = document.documentElement;
    const theme = themes.find(t => t.id === themeId);
    
    if (!theme) return;
    
    // 設置主題屬性
    root.setAttribute('data-theme', themeId);
    
    // 保存到本地存儲
    localStorage.setItem('selectedTheme', themeId);
    localStorage.setItem('theme', themeId); // 向後兼容
    
    // 清除背景樣式
    root.style.removeProperty('--bg-white');
    
    // 應用背景圖片
    if (theme.backgroundImage) {
        applyThemeBackgroundImage(theme.backgroundImage);
    } else {
        clearThemeBackgroundImage();
    }
    
    // 更新UI
    updateThemeButtons(themeId);
    themeVideoController.setActive(themeId);
    
    // 更新圖表
    updateChartsIfVisible();
}

// 應用主題背景圖片
function applyThemeBackgroundImage(imageUrl) {
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
}

// 清除主題背景圖片
function clearThemeBackgroundImage() {
    document.body.style.backgroundImage = '';
    document.body.style.backgroundSize = '';
    document.body.style.backgroundPosition = '';
    document.body.style.backgroundRepeat = '';
    document.body.style.backgroundAttachment = '';
}

// 更新主題按鈕
function updateThemeButtons(themeId) {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return;
    
    const icons = buttonIcons[themeId];
    if (!icons) return;
    
    // 更新FAB按鈕
    const fabBtn = document.querySelector('.fab-btn');
    if (fabBtn) {
        fabBtn.textContent = icons.fab;
    }
    
    // 更新導航按鈕
    const navButtons = {
        '.nav-ledger': icons.navLedger,
        '.nav-wallet': icons.navWallet,
        '.nav-investment': icons.navInvestment,
        '.nav-chart': icons.navChart,
        '.nav-settings': icons.navSettings
    };
    
    Object.entries(navButtons).forEach(([selector, icon]) => {
        const btn = document.querySelector(selector);
        if (btn) {
            btn.textContent = icon;
        }
    });
}

// 更新圖表（如果可見）
function updateChartsIfVisible() {
    const pageChart = document.getElementById('pageChart');
    if (pageChart && pageChart.style.display !== 'none') {
        if (typeof updateAllCharts === 'function') {
            updateAllCharts();
        }
    }
}

// ========== 主題選擇器 ==========

// 顯示主題選擇器
function showThemeSelector() {
    // 創建模態框
    const modal = createThemeModal();
    document.body.appendChild(modal);
    
    // 添加事件監聽器
    setupModalEventListeners(modal);
}

// 創建主題模態框
function createThemeModal() {
    const modal = document.createElement('div');
    modal.className = 'theme-modal';
    modal.innerHTML = `
        <div class="theme-modal-content">
            <div class="theme-modal-header">
                <h2>選擇主題</h2>
                <button class="theme-close-btn">×</button>
            </div>
            <div class="theme-modal-body">
                ${createThemeGrid()}
            </div>
        </div>
    `;
    return modal;
}

// 創建主題網格
function createThemeGrid() {
    let html = '';
    
    // 按分類組織主題
    const themesByCategory = {};
    themes.forEach(theme => {
        if (!themesByCategory[theme.category]) {
            themesByCategory[theme.category] = [];
        }
        themesByCategory[theme.category].push(theme);
    });
    
    // 生成HTML
    Object.entries(themesByCategory).forEach(([category, categoryThemes]) => {
        const categoryInfo = themeCategories[category];
        html += `
            <div class="theme-category">
                <h3>${categoryInfo.icon} ${categoryInfo.name}</h3>
                <p>${categoryInfo.description}</p>
                <div class="theme-grid">
                    ${categoryThemes.map(theme => createThemeCard(theme)).join('')}
                </div>
            </div>
        `;
    });
    
    return html;
}

// 創建主題卡片
function createThemeCard(theme) {
    const currentTheme = getCurrentTheme();
    const isActive = theme.id === currentTheme;
    
    return `
        <div class="theme-card ${isActive ? 'active' : ''}" data-theme="${theme.id}">
            <div class="theme-preview" style="background: ${theme.preview}"></div>
            <div class="theme-info">
                <span class="theme-icon">${theme.icon}</span>
                <span class="theme-name">${theme.name}</span>
            </div>
        </div>
    `;
}

// 設置模態框事件監聽器
function setupModalEventListeners(modal) {
    // 主題卡片點擊事件
    modal.querySelectorAll('.theme-card').forEach(card => {
        card.addEventListener('click', () => {
            const themeId = card.dataset.theme;
            applyTheme(themeId);
            document.body.removeChild(modal);
        });
    });
    
    // 關閉按鈕事件
    const closeBtn = modal.querySelector('.theme-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
    
    // 背景點擊關閉
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// ========== 視頻控制器 ==========

const themeVideoController = (() => {
    let activeTheme = null;
    
    const setActive = (themeId) => {
        activeTheme = themeId;
        updateVideoDisplay();
    };
    
    const updateVideoDisplay = () => {
        const moneyVideoEl = document.getElementById('moneyThemeVideo');
        const spaceVideoEl = document.getElementById('spaceThemeVideo');
        
        if (!moneyVideoEl || !spaceVideoEl) return;
        
        // 根據主題顯示對應視頻
        if (activeTheme === 'space') {
            moneyVideoEl.style.display = 'none';
            spaceVideoEl.style.display = 'block';
            
            const playPromise = spaceVideoEl.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => {});
            }
        } else if (activeTheme === 'money') {
            moneyVideoEl.style.display = 'block';
            spaceVideoEl.style.display = 'none';
            
            const playPromise = moneyVideoEl.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => {});
            }
        } else {
            moneyVideoEl.style.display = 'none';
            spaceVideoEl.style.display = 'none';
        }
    };
    
    return { setActive };
})();

// ========== 初始化 ==========

function initTheme() {
    const savedTheme = getCurrentTheme();
    applyTheme(savedTheme);
    
    // 延遲更新按鈕以確保DOM已準備好
    setTimeout(() => {
        updateThemeButtons(savedTheme);
    }, 100);
}

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', initTheme);

// ========== 導出 ==========

// 導出主要函數供其他腳本使用
window.ThemeManager = {
    getCurrentTheme,
    applyTheme,
    showThemeSelector,
    themes,
    themeCategories,
    buttonIcons
};
