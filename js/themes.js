// ========== 主題顏色功能 ==========
var themes = window.AppThemes || (window.AppThemes = [
    {
        id: 'pink',
        name: '粉色主題',
        icon: '💖',
        buttonIcon: '🌸',
        preview: 'linear-gradient(135deg, #ffeef5 0%, #fff5f9 100%)',
        color: '#ff69b4',
        category: 'basic'
    },
    {
        id: 'blue',
        name: '藍色主題',
        icon: '💙',
        buttonIcon: '🌊',
        preview: 'linear-gradient(135deg, #e8f4fd 0%, #f0f8ff 100%)',
        color: '#4a90e2',
        category: 'basic'
    },
    {
        id: 'green',
        name: '綠色主題',
        icon: '💚',
        buttonIcon: '🍃',
        preview: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8f4 100%)',
        color: '#4caf50',
        category: 'basic'
    },
    {
        id: 'purple',
        name: '紫色主題',
        icon: '💜',
        buttonIcon: '🦋',
        preview: 'linear-gradient(135deg, #f3e5f5 0%, #fce4ec 100%)',
        color: '#9c27b0',
        category: 'basic'
    },
    {
        id: 'orange',
        name: '橙色主題',
        icon: '🧡',
        buttonIcon: '🔥',
        preview: 'linear-gradient(135deg, #fff3e0 0%, #fff8f0 100%)',
        color: '#ff9800',
        category: 'basic'
    },
    {
        id: 'cyan',
        name: '青色主題',
        icon: '🩵',
        buttonIcon: '💧',
        preview: 'linear-gradient(135deg, #e0f7fa 0%, #f0fdfe 100%)',
        color: '#00bcd4',
        category: 'basic'
    },
    {
        id: 'red',
        name: '紅色主題',
        icon: '❤️',
        buttonIcon: '🌹',
        preview: 'linear-gradient(135deg, #ffebee 0%, #fce4ec 100%)',
        color: '#e53935',
        category: 'basic'
    },
    {
        id: 'yellow',
        name: '黃色主題',
        icon: '💛',
        buttonIcon: '☀️',
        preview: 'linear-gradient(135deg, #fffde7 0%, #fffef5 100%)',
        color: '#fbc02d',
        category: 'basic'
    },
    {
        id: 'indigo',
        name: '靛藍主題',
        icon: '🔵',
        buttonIcon: '🌙',
        preview: 'linear-gradient(135deg, #e8eaf6 0%, #f3f4f9 100%)',
        color: '#5c6bc0',
        category: 'basic'
    },
    {
        id: 'teal',
        name: '茶色主題',
        icon: '💚',
        buttonIcon: '🐢',
        preview: 'linear-gradient(135deg, #e0f2f1 0%, #f0f9f8 100%)',
        color: '#26a69a',
        category: 'basic'
    },
    {
        id: 'forest',
        name: '森林清風',
        icon: '🌿',
        buttonIcon: '🌳',
        preview: 'linear-gradient(135deg, #03130d 0%, #103524 45%, #2f855a 100%)',
        color: '#2f855a',
        category: 'nature'
    },
    {
        id: 'snow',
        name: '飄雪主題',
        icon: '❄️',
        buttonIcon: '⛄',
        preview: 'linear-gradient(135deg, #e8f1ff 0%, #ffffff 100%)',
        color: '#93c5fd',
        category: 'nature'
    },
    {
        id: 'star',
        name: '星空主題',
        icon: '✨',
        buttonIcon: '⭐',
        preview: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
        color: '#8b7cf6',
        category: 'cosmic'
    },
    {
        id: 'aurora',
        name: '極光主題',
        icon: '🌈',
        buttonIcon: '🌌',
        preview: 'linear-gradient(135deg, #071a52 0%, #0b8457 50%, #7c3aed 100%)',
        color: '#00d4ff',
        category: 'cosmic'
    },
    {
        id: 'firefly',
        name: '螢火蟲主題',
        icon: '✨',
        buttonIcon: '🔦',
        preview: 'linear-gradient(135deg, #0b1020 0%, #1a2b3f 100%)',
        color: '#facc15',
        category: 'cosmic'
    },
    {
        id: 'neon',
        name: '霓虹波動',
        icon: '🟣',
        buttonIcon: '💫',
        preview: 'linear-gradient(135deg, #0b1020 0%, #1f1147 50%, #00d4ff 100%)',
        color: '#7c3aed',
        category: 'cosmic'
    },
    {
        id: 'cyberpunkCity',
        name: '賽博龐克 City',
        icon: '🌆',
        buttonIcon: '🌃',
        preview: 'linear-gradient(135deg, #050014 0%, #120122 35%, #1c1b45 65%, #301d6f 100%)',
        color: '#ff3f81',
        category: 'cosmic',
        backgroundImage: 'https://i.pinimg.com/1200x/5f/a6/ab/5fa6ab63037b1ec5381ac02bcc0a4963.jpg'
    },
    {
        id: 'halloween',
        name: '🎃 萬聖節',
        icon: '🎃',
        buttonIcon: '👻',
        preview: 'linear-gradient(135deg, #1A1A1A 0%, #3E2723 45%, #FF6B35 100%)',
        color: '#FF6B35',
        category: 'seasonal',
        backgroundImage: 'https://i.pinimg.com/1200x/ae/a4/be/aea4be0e868161d58dcab76c3de7f1fb.jpg'
    },
    // ... (other themes)
]);

// 主題分類定義
const themeCategories = {
    basic: {
        name: '基礎',
        icon: '🎨',
        description: '經典基礎色彩'
    },
    nature: {
        name: '自然',
        icon: '🌿',
        description: '大自然靈感主題'
    },
    cosmic: {
        name: '宇宙',
        icon: '🌌',
        description: '星空銀河風格'
    },
    seasonal: {
        name: '節慶',
        icon: '🎉',
        description: '節日慶典主題'
    },
    fantasy: {
        name: '奇幻',
        icon: '✨',
        description: '夢幻魔法世界'
    },
    gaming: {
        name: '遊戲',
        icon: '🎮',
        description: '遊戲動漫風格'
    },
    luxury: {
        name: '奢華',
        icon: '💎',
        description: '優雅奢華設計'
    }
};

const themeAnimations = {};

const themeVideoController = (() => {
    let moneyVideoEl = null;
    let spaceVideoEl = null;
    let cyberpunkCityVideoEl = null;
    let containerEl = null;

    const ensureElements = () => {
        if (!moneyVideoEl) {
            moneyVideoEl = document.getElementById('moneyThemeVideo');
        }
        if (!spaceVideoEl) {
            spaceVideoEl = document.getElementById('spaceThemeVideo');
        }
        if (!cyberpunkCityVideoEl) {
            cyberpunkCityVideoEl = document.getElementById('cyberpunkCityThemeVideo');
        }
        if (!containerEl) {
            containerEl = document.querySelector('.theme-video-background');
        }
        return moneyVideoEl && spaceVideoEl && cyberpunkCityVideoEl && containerEl;
    };

    const setActive = (themeId) => {
        if (!ensureElements()) return;
        moneyVideoEl.pause();
        spaceVideoEl.pause();
        cyberpunkCityVideoEl.pause();

        const isActive = themeId === 'money' || themeId === 'space' || themeId === 'cyberpunkCity';
        containerEl.classList.toggle('active', isActive);

        if (isActive) {
            let activeVideo = null;
            if (themeId === 'money') {
                activeVideo = moneyVideoEl;
                moneyVideoEl.style.display = 'block';
                spaceVideoEl.style.display = 'none';
                cyberpunkCityVideoEl.style.display = 'none';
            } else if (themeId === 'space') {
                activeVideo = spaceVideoEl;
                spaceVideoEl.style.display = 'block';
                moneyVideoEl.style.display = 'none';
                cyberpunkCityVideoEl.style.display = 'none';
            } else if (themeId === 'cyberpunkCity') {
                activeVideo = cyberpunkCityVideoEl;
                cyberpunkCityVideoEl.style.display = 'block';
                moneyVideoEl.style.display = 'none';
                spaceVideoEl.style.display = 'none';
            }

            if (activeVideo) {
                activeVideo.currentTime = 0;
                const playPromise = activeVideo.play();

                if (playPromise && typeof playPromise.catch === 'function') {
                    playPromise.catch(() => {});
                }
            }
        } else {
            moneyVideoEl.style.display = 'none';
            spaceVideoEl.style.display = 'none';
            cyberpunkCityVideoEl.style.display = 'none';
        }
    };

    return { setActive };
})();

function getCurrentTheme() {
    return localStorage.getItem('selectedTheme') || 'blue';
}

function applyTheme(themeId) {
    const root = document.documentElement;
    root.setAttribute('data-theme', themeId);
    localStorage.setItem('selectedTheme', themeId);
    root.style.removeProperty('--bg-white');
    
    // 自動應用主題背景圖片
    const theme = themes.find(t => t.id === themeId);
    if (theme && theme.backgroundImage) {
        applyThemeBackgroundImage(theme.backgroundImage);
    } else {
        // 如果主題沒有背景圖片，清除背景
        document.body.style.backgroundImage = '';
        document.body.style.backgroundSize = '';
        document.body.style.backgroundPosition = '';
        document.body.style.backgroundRepeat = '';
    }
    
    // 更新FAB圖示
    const fabBtn = document.getElementById('fabBtn');
    if (fabBtn && theme && theme.buttonIcon) {
        fabBtn.textContent = theme.buttonIcon;
        console.log(`🎨 FAB圖示已更新為: ${theme.buttonIcon} (主題: ${theme.name})`);
    }
    
    updateThemeButtons(themeId);
    themeVideoController.setActive(themeId);

    const pageChart = document.getElementById('pageChart');
    if (pageChart && pageChart.style.display !== 'none') {
        if (typeof updateAllCharts === 'function') {
            updateAllCharts();
        }
    }
}

function applyThemeBackgroundImage(imageUrl) {
    if (!imageUrl) return;
    
    // 檢查圖片是否可以載入
    const img = new Image();
    img.onload = function() {
        // 圖片載入成功，應用背景
        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundAttachment = 'fixed';
        
        // 可選：添加載入成功的視覺反饋
        console.log(`✅ 主題背景圖片載入成功: ${imageUrl}`);
    };
    
    img.onerror = function() {
        // 圖片載入失敗，清除背景
        document.body.style.backgroundImage = '';
        document.body.style.backgroundSize = '';
        document.body.style.backgroundPosition = '';
        document.body.style.backgroundRepeat = '';
        
        console.warn(`⚠️ 主題背景圖片載入失敗: ${imageUrl}`);
    };
    
    // 開始載入圖片
    img.src = imageUrl;
}

function updateThemeButtons(themeId) {
    const buttonIcons = {
        pink: {
            fab: '✏️',
            navLedger: '📖',
            navWallet: '💰',
            navInvestment: '📈',
            navChart: '📊',
            navSettings: '⚙️'
        },
        blue: {
            fab: '✍️',
            navLedger: '📘',
            navWallet: '💵',
            navInvestment: '📉',
            navChart: '📋',
            navSettings: '🔧'
        },
        green: {
            fab: '📝',
            navLedger: '📗',
            navWallet: '💴',
            navInvestment: '📊',
            navChart: '📈',
            navSettings: '⚙️'
        },
        purple: {
            fab: '🖊️',
            navLedger: '📕',
            navWallet: '💶',
            navInvestment: '💹',
            navChart: '📉',
            navSettings: '🎛️'
        },
        orange: {
            fab: '✎',
            navLedger: '📓',
            navWallet: '💷',
            navInvestment: '📌',
            navChart: '📑',
            navSettings: '🔩'
        },
        cyan: {
            fab: '✐',
            navLedger: '📙',
            navWallet: '💸',
            navInvestment: '📍',
            navChart: '📄',
            navSettings: '🛠️'
        },
        star: {
            fab: '⭐',
            navLedger: '🌌',
            navWallet: '💫',
            navInvestment: '🌟',
            navChart: '🔭',
            navSettings: '🌠'
        },
        red: {
            fab: '❤️',
            navLedger: '📕',
            navWallet: '💴',
            navInvestment: '📊',
            navChart: '📈',
            navSettings: '⚙️'
        },
        yellow: {
            fab: '💛',
            navLedger: '📒',
            navWallet: '💰',
            navInvestment: '📈',
            navChart: '📊',
            navSettings: '🔧'
        },
        indigo: {
            fab: '💙',
            navLedger: '📘',
            navWallet: '💵',
            navInvestment: '📉',
            navChart: '📋',
            navSettings: '🔧'
        },
        teal: {
            fab: '💚',
            navLedger: '📗',
            navWallet: '💶',
            navInvestment: '💹',
            navChart: '📉',
            navSettings: '🎛️'
        },
                aurora: {
            fab: '🌈',
            navLedger: '🌈',
            navWallet: '💎',
            navInvestment: '📈',
            navChart: '📊',
            navSettings: '⚙️'
        },
                noface: {
            fab: '🪙',
            navLedger: '📜',
            navWallet: '💰',
            navInvestment: '📈',
            navChart: '📊',
            navSettings: '⚙️'
        },
        demonslayer: {
            fab: '🗡️',
            navLedger: '📓',
            navWallet: '💠',
            navInvestment: '📈',
            navChart: '📊',
            navSettings: '⚙️'
        },
        totoro: {
            fab: '🌱',
            navLedger: '📗',
            navWallet: '💰',
            navInvestment: '📈',
            navChart: '📊',
            navSettings: '⚙️'
        },
        firefly: {
            fab: '✨',
            navLedger: '✨',
            navWallet: '💫',
            navInvestment: '🌟',
            navChart: '🔭',
            navSettings: '🌠'
        },
        snow: {
            fab: '❄️',
            navLedger: '❄️',
            navWallet: '💎',
            navInvestment: '📈',
            navChart: '📊',
            navSettings: '⚙️'
        },
        cute: {
            fab: '🐾',
            navLedger: '🐾',
            navWallet: '💰',
            navInvestment: '📈',
            navChart: '📊',
            navSettings: '⚙️'
        },
        neon: {
            fab: '🟣',
            navLedger: '🟣',
            navWallet: '💎',
            navInvestment: '📈',
            navChart: '📊',
            navSettings: '⚙️'
        },
        cyberpunk: {
            fab: '🤖',
            navLedger: '🗂️',
            navWallet: '💳',
            navInvestment: '💹',
            navChart: '📈',
            navSettings: '🛠️'
        },
        money: {
            fab: '💸',
            navLedger: '📒',
            navWallet: '💰',
            navInvestment: '💹',
            navChart: '📊',
            navSettings: '⚙️'
        },
        space: {
            fab: '🚀',
            navLedger: '🛸',
            navWallet: '🌌',
            navInvestment: '🛰️',
            navChart: '🔭',
            navSettings: '⚙️'
        },
        fruit: {
            fab: '🍓',
            navLedger: '🍉',
            navWallet: '🍋',
            navInvestment: '🥝',
            navChart: '🍊',
            navSettings: '🍇'
        },
        meow: {
            fab: '🐱',
            navLedger: '🐈',
            navWallet: '🐾',
            navInvestment: '🐭',
            navChart: '🐹',
            navSettings: '🐰'
        },
        bluerose: {
            fab: '🗡️',
            navLedger: '📜',
            navWallet: '💎',
            navInvestment: '🛡️',
            navChart: '🏰',
            navSettings: '⚔️'
        },
        emeraldPrince: {
            fab: '👑',
            navLedger: '📜',
            navWallet: '💎',
            navInvestment: '🗡️',
            navChart: '🏰',
            navSettings: '⚔️'
        },
        goldenElegance: {
            fab: '🦋',
            navLedger: '📜',
            navWallet: '💎',
            navInvestment: '🗡️',
            navChart: '🏰',
            navSettings: '⚔️'
        },
        cuteCats: {
            fab: '🐱',
            navLedger: '🐈',
            navWallet: '🐾',
            navInvestment: '🐭',
            navChart: '🐹',
            navSettings: '🐰'
        },
        dreamy: {
            fab: '🌈',
            navLedger: '🎨',
            navWallet: '💖',
            navInvestment: '🌸',
            navChart: '🦋',
            navSettings: '✨'
        },
        dreamyfish: {
            fab: '🐠',
            navLedger: '🐟',
            navWallet: '🐡',
            navInvestment: '🦈',
            navChart: '🐙',
            navSettings: '🦑'
        },
        emerald: {
            fab: '💎',
            navLedger: '🌿',
            navWallet: '🍃',
            navInvestment: '🌱',
            navChart: '🍀',
            navSettings: '🌳'
        },
        halloween: {
            fab: '🎃',
            navLedger: '📖',
            navWallet: '💰',
            navInvestment: '📈',
            navChart: '📊',
            navSettings: '⚙️'
        }
    };

    const iconAssetsCute = {
        nav: {
            ledger: 'image/1.png',
            wallet: 'image/2.png',
            investment: 'image/3.png',
            chart: 'image/4.png',
            settings: 'image/5.png'
        },
        fab: 'image/6.png'
    };

    const setButtonImgIcon = (btn, src) => {
        btn.innerHTML = `<img src="${src}" alt="icon" class="ui-icon-img" style="width: 28px; height: 28px; object-fit: contain;" />`;
    };

    const icons = buttonIcons[themeId] || buttonIcons.pink;
    const iconAssets = themeId === 'cute' ? iconAssetsCute : null;

    const fabBtn = document.getElementById('fabBtn');
    if (fabBtn) {
        if (themeId === 'cute') {
            setButtonImgIcon(fabBtn, iconAssetsCute.fab);
        } else {
            fabBtn.textContent = icons.fab;
        }
    }

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const page = item.dataset.page;
        const navIcon = item.querySelector('.nav-icon');
        if (navIcon) {
            if (navIcon.tagName === 'IMG') {
                const src = iconAssets && iconAssets.nav && iconAssets.nav[page];
                if (src) {
                    navIcon.src = src;
                }
            } else {
                switch(page) {
                    case 'ledger':
                        navIcon.textContent = icons.navLedger;
                        break;
                    case 'wallet':
                        navIcon.textContent = icons.navWallet;
                        break;
                    case 'investment':
                        navIcon.textContent = icons.navInvestment;
                        break;
                    case 'chart':
                        navIcon.textContent = icons.navChart;
                        break;
                    case 'settings':
                        navIcon.textContent = icons.navSettings;
                        break;
                }
            }
        }
    });

    restoreButtonIcons();
}

const originalButtonIcons = {
    accountBtn: '💳',
    emojiBtn: '😊',
    memberBtn: '👤',
    imageBtn: '📷',
    checkBtn: '✓',
    searchBtn: '🔍',
    addCategoryBtn: '➕',
    quickNotes: {
        '早餐': '🍳',
        '午餐': '🍱',
        '晚餐': '🍽️',
        '交通': '🚗',
        '購物': '🛒',
        '娛樂': '🎮'
    }
};

function restoreButtonIcons() {
    document.querySelectorAll('[data-original-icon]').forEach(btn => {
        const originalIcon = btn.dataset.originalIcon;
        if (originalIcon) {
            if (btn.classList.contains('quick-note-btn')) {
                btn.innerHTML = originalIcon;
            } else {
                btn.textContent = originalIcon;
            }
            btn.removeAttribute('data-original-icon');
        }
    });

    const quickNoteButtons = document.querySelectorAll('.quick-note-btn');
    quickNoteButtons.forEach(btn => {
        const note = btn.dataset.note;
        if (note && originalButtonIcons.quickNotes[note]) {
            btn.innerHTML = `${originalButtonIcons.quickNotes[note]} ${note}`;
        }
    });

    const accountBtn = document.querySelector('.account-btn');
    if (accountBtn && !accountBtn.dataset.originalIcon) {
        accountBtn.textContent = originalButtonIcons.accountBtn;
    }

    const emojiBtn = document.querySelector('.emoji-btn');
    if (emojiBtn && !emojiBtn.dataset.originalIcon) {
        emojiBtn.textContent = originalButtonIcons.emojiBtn;
    }

    const memberBtn = document.getElementById('memberBtn');
    if (memberBtn && !memberBtn.dataset.originalIcon) {
        memberBtn.textContent = originalButtonIcons.memberBtn;
    }

    const imageBtn = document.getElementById('imageBtn');
    if (imageBtn && !imageBtn.dataset.originalIcon) {
        imageBtn.textContent = originalButtonIcons.imageBtn;
    }

    const checkBtn = document.getElementById('saveBtn');
    if (checkBtn && !checkBtn.dataset.originalIcon) {
        checkBtn.textContent = originalButtonIcons.checkBtn;
    }

    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn && !searchBtn.dataset.originalIcon) {
        searchBtn.textContent = originalButtonIcons.searchBtn;
    }

    const addCategoryBtn = document.getElementById('addCategoryBtn');
    if (addCategoryBtn && !addCategoryBtn.dataset.originalIcon) {
        addCategoryBtn.textContent = originalButtonIcons.addCategoryBtn;
    }

    const equalBtnRestore = document.querySelector('.key-btn.equal');
    if (equalBtnRestore && equalBtnRestore.dataset.key === '=' && !equalBtnRestore.dataset.originalIcon) {
        equalBtnRestore.textContent = '=';
    }
}

function getCustomTheme() {
    return JSON.parse(localStorage.getItem('customTheme') || '{}');
}

function saveCustomTheme(theme) {
    localStorage.setItem('customTheme', JSON.stringify(theme));
}

function applyCustomTheme() {
    const customTheme = getCustomTheme();
    const root = document.documentElement;

    if (!customTheme || Object.keys(customTheme).length === 0) {
        root.style.removeProperty('--color-primary');
        root.style.removeProperty('--color-primary-light');
        root.style.removeProperty('--color-primary-lighter');
        root.style.removeProperty('--color-primary-dark');
        root.style.removeProperty('--border-primary');
        root.style.removeProperty('--bg-white');
        root.style.removeProperty('--bg-primary');
        document.body.style.background = '';
        document.body.style.backgroundImage = '';
        document.body.style.backgroundSize = '';
        document.body.style.backgroundPosition = '';
        document.body.style.backgroundRepeat = '';
        return;
    }

    if (customTheme.primaryColor) {
        root.style.setProperty('--color-primary', customTheme.primaryColor);
        root.style.setProperty('--border-primary', customTheme.primaryColor);

        const hex = customTheme.primaryColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);

        const lightR = Math.min(255, Math.floor(r + (255 - r) * 0.3));
        const lightG = Math.min(255, Math.floor(g + (255 - g) * 0.3));
        const lightB = Math.min(255, Math.floor(b + (255 - b) * 0.3));
        root.style.setProperty('--color-primary-light', `rgb(${lightR}, ${lightG}, ${lightB})`);

        const lighterR = Math.min(255, Math.floor(r + (255 - r) * 0.5));
        const lighterG = Math.min(255, Math.floor(g + (255 - g) * 0.5));
        const lighterB = Math.min(255, Math.floor(b + (255 - b) * 0.5));
        root.style.setProperty('--color-primary-lighter', `rgb(${lighterR}, ${lighterG}, ${lighterB})`);

        const darkR = Math.max(0, Math.floor(r * 0.8));
        const darkG = Math.max(0, Math.floor(g * 0.8));
        const darkB = Math.max(0, Math.floor(b * 0.8));
        root.style.setProperty('--color-primary-dark', `rgb(${darkR}, ${darkG}, ${darkB})`);
    }

    if (customTheme.buttonColor) {
        root.style.setProperty('--color-primary', customTheme.buttonColor);
    }

    const effectivePrimaryColor = customTheme.buttonColor || customTheme.primaryColor;
    if (effectivePrimaryColor) {
        const parseRgb = (color) => {
            const c = String(color || '').trim();
            if (/^#?[0-9a-fA-F]{6}$/.test(c)) {
                const hex = c.replace('#', '');
                return {
                    r: parseInt(hex.slice(0, 2), 16),
                    g: parseInt(hex.slice(2, 4), 16),
                    b: parseInt(hex.slice(4, 6), 16)
                };
            }
            const m = c.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);
            if (m) {
                return {
                    r: Math.min(255, Math.max(0, parseInt(m[1], 10))),
                    g: Math.min(255, Math.max(0, parseInt(m[2], 10))),
                    b: Math.min(255, Math.max(0, parseInt(m[3], 10)))
                };
            }
            return null;
        };

        const base = parseRgb(effectivePrimaryColor);
        if (base) {
            const { r, g, b } = base;

            root.style.setProperty('--color-primary', effectivePrimaryColor);
            root.style.setProperty('--border-primary', effectivePrimaryColor);

            const lightR = Math.min(255, Math.floor(r + (255 - r) * 0.3));
            const lightG = Math.min(255, Math.floor(g + (255 - g) * 0.3));
            const lightB = Math.min(255, Math.floor(b + (255 - b) * 0.3));
            root.style.setProperty('--color-primary-light', `rgb(${lightR}, ${lightG}, ${lightB})`);

            const lighterR = Math.min(255, Math.floor(r + (255 - r) * 0.5));
            const lighterG = Math.min(255, Math.floor(g + (255 - g) * 0.5));
            const lighterB = Math.min(255, Math.floor(b + (255 - b) * 0.5));
            root.style.setProperty('--color-primary-lighter', `rgb(${lighterR}, ${lighterG}, ${lighterB})`);

            const darkR = Math.max(0, Math.floor(r * 0.8));
            const darkG = Math.max(0, Math.floor(g * 0.8));
            const darkB = Math.max(0, Math.floor(b * 0.8));
            root.style.setProperty('--color-primary-dark', `rgb(${darkR}, ${darkG}, ${darkB})`);

            const setAlpha = (suffix, alpha) => {
                root.style.setProperty(`--color-primary-rgba-${suffix}`, `rgba(${r}, ${g}, ${b}, ${alpha})`);
            };
            setAlpha('08', '0.08');
            setAlpha('10', '0.1');
            setAlpha('12', '0.12');
            setAlpha('15', '0.15');
            setAlpha('18', '0.18');
            setAlpha('20', '0.2');
            setAlpha('25', '0.25');
            setAlpha('30', '0.3');

            const setLightAlpha = (suffix, alpha) => {
                root.style.setProperty(`--color-primary-light-rgba-${suffix}`, `rgba(${lightR}, ${lightG}, ${lightB}, ${alpha})`);
            };
            setLightAlpha('08', '0.08');
            setLightAlpha('10', '0.1');
            setLightAlpha('15', '0.15');
            setLightAlpha('20', '0.2');
            setLightAlpha('25', '0.25');
        }
    }

    if (customTheme.boxColor) {
        root.style.setProperty('--bg-white', customTheme.boxColor);
    }

    if (customTheme.backgroundColor) {
        root.style.setProperty('--bg-primary', customTheme.backgroundColor);
        if (!customTheme.backgroundColor.includes('gradient')) {
            document.body.style.background = customTheme.backgroundColor;
        } else {
            document.body.style.background = customTheme.backgroundColor;
        }
    }

    if (customTheme.backgroundImage) {
        document.body.style.backgroundImage = `url(${customTheme.backgroundImage})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
    } else {
        document.body.style.backgroundImage = '';
        document.body.style.backgroundSize = '';
        document.body.style.backgroundPosition = '';
        document.body.style.backgroundRepeat = '';
    }
}

function showThemeSelector() {
    const modal = document.createElement('div');
    modal.className = 'theme-select-modal';

    const currentTheme = getCurrentTheme();
    const customTheme = getCustomTheme();

    modal.innerHTML = `
        <div class="theme-custom-content modal-content-standard">
            <div class="theme-modal-header">
                <div class="theme-modal-title">🎨 主題</div>
                <button class="theme-close-btn" type="button" aria-label="Close">✕</button>
            </div>

            <div class="theme-section">
                <div class="theme-section-title">主題分類</div>
                <div class="theme-toolbar">
                    <input id="themeSearchInput" class="theme-search-input" type="text" placeholder="搜尋主題..." autocomplete="off" />
                    <div id="categoryTabs" class="theme-category-tabs"></div>
                </div>
                <div id="themeGrid" class="theme-grid theme-grid--categorized"></div>
            </div>

            
            
            <div class="theme-section theme-section--divider">
                <div class="theme-section-title">背景圖片</div>
                <input type="file" id="backgroundImageInput" accept="image/*" style="display: none;">
                <button id="uploadImageBtn" class="theme-primary-btn" type="button">📷 上傳背景圖片</button>
                ${customTheme.backgroundImage ? `
                    <div id="imagePreviewContainer" class="theme-image-preview">
                        <img src="${customTheme.backgroundImage}" alt="背景預覽" class="theme-image-preview-img">
                        <button id="removeImageBtn" class="theme-image-remove-btn" type="button">✕</button>
                    </div>
                ` : '<div id="imagePreviewContainer"></div>'}
            </div>

            <div class="theme-actions">
                <button id="resetThemeBtn" class="theme-secondary-btn" type="button">重置</button>
                <button id="saveThemeBtn" class="theme-primary-btn" type="button">儲存設定</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // 初始化分類標籤
    const initCategoryTabs = () => {
        const categoryTabs = document.getElementById('categoryTabs');
        if (!categoryTabs) return;

        // 添加「全部」選項
        let tabsHTML = `
            <button class="category-tab active" data-category="all">
                <span class="category-tab-icon">🎨</span>
                <span class="category-tab-name">全部</span>
                <span class="category-tab-count">${themes.length}</span>
            </button>
        `;

        // 添加各個分類
        Object.entries(themeCategories).forEach(([categoryId, categoryInfo]) => {
            const categoryThemes = themes.filter(t => t.category === categoryId);
            if (categoryThemes.length > 0) {
                tabsHTML += `
                    <button class="category-tab" data-category="${categoryId}">
                        <span class="category-tab-icon">${categoryInfo.icon}</span>
                        <span class="category-tab-name">${categoryInfo.name}</span>
                        <span class="category-tab-count">${categoryThemes.length}</span>
                    </button>
                `;
            }
        });

        categoryTabs.innerHTML = tabsHTML;

        // 添加點擊事件
        categoryTabs.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                categoryTabs.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderThemeGrid('', tab.dataset.category);
            });
        });
    };

    const renderThemeGrid = (query = '', selectedCategory = 'all') => {
        const q = (query || '').trim().toLowerCase();
        const grid = document.getElementById('themeGrid');
        if (!grid) return;

        let list = themes.filter(t => {
            if (!q) return true;
            return (t.name || '').toLowerCase().includes(q) || (t.id || '').toLowerCase().includes(q);
        });

        // 按分類篩選
        if (selectedCategory !== 'all') {
            list = list.filter(t => t.category === selectedCategory);
        }

        let gridHTML = '';
        
        // 顯示所有主題在同一排
        gridHTML += `
            <div class="theme-category-section">
                <div class="theme-category-grid">
                    ${list.map(theme => {
                        const isSelected = theme.id === currentTheme && !customTheme.primaryColor;
                        const hasBackgroundImage = theme.backgroundImage;
                        return `
                            <div class="theme-item ${isSelected ? 'selected' : ''}" data-theme-id="${theme.id}">
                                <div class="theme-item-preview ${hasBackgroundImage ? 'theme-item-preview--image' : ''}" ${hasBackgroundImage ? `style="background-image: url('${theme.backgroundImage}');"` : `style="background: ${theme.preview};"`}></div>
                                <div class="theme-item-name">${theme.name}</div>
                                ${isSelected ? '<div class="theme-item-check">✓</div>' : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        grid.innerHTML = gridHTML;

        grid.querySelectorAll('.theme-item').forEach(item => {
            item.addEventListener('click', () => {
                const themeId = item.dataset.themeId;
                const theme = themes.find(t => t.id === themeId);
                
                // 清除自訂主題設定，應用預設主題
                saveCustomTheme({});
                applyTheme(themeId);
                
                // 如果主題有背景圖片，會自動在applyTheme中處理
                if (theme && theme.backgroundImage) {
                    console.log(` 切換到主題 "${theme.name}" 並載入背景圖片`);
                }

                grid.querySelectorAll('.theme-item').forEach(t => t.classList.remove('selected'));
                item.classList.add('selected');

                setTimeout(() => {
                    if (document.body.contains(modal)) {
                        document.body.removeChild(modal);
                    }
                    alert('主題已切換！');
                }, 300);
            });
        });
    };

    // 初始化
    initCategoryTabs();
    renderThemeGrid('');

    const themeSearchInput = document.getElementById('themeSearchInput');
    if (themeSearchInput) {
        themeSearchInput.addEventListener('input', (e) => {
            const activeTab = document.querySelector('.category-tab.active');
            const selectedCategory = activeTab ? activeTab.dataset.category : 'all';
            renderThemeGrid(e.target.value, selectedCategory);
        });
    }

    
    const uploadBtn = document.getElementById('uploadImageBtn');
    const imageInput = document.getElementById('backgroundImageInput');
    const removeImageBtn = document.getElementById('removeImageBtn');

    if (uploadBtn && imageInput) {
        uploadBtn.addEventListener('click', () => imageInput.click());
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const imageUrl = event.target.result;
                    const previewContainer = document.getElementById('imagePreviewContainer');
                    previewContainer.innerHTML = `
                        <img src="${imageUrl}" alt="背景預覽" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 8px;">
                        <button id="removeImageBtn" style="position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.6); color: white; border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; font-size: 18px;">✕</button>
                    `;
                    previewContainer.style.position = 'relative';
                    previewContainer.style.marginTop = '12px';

                    const newRemoveBtn = document.getElementById('removeImageBtn');
                    if (newRemoveBtn) {
                        newRemoveBtn.addEventListener('click', () => {
                            imageInput.value = '';
                            previewContainer.innerHTML = '';
                            previewContainer.style.marginTop = '0';
                        });
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (removeImageBtn) {
        removeImageBtn.addEventListener('click', () => {
            imageInput.value = '';
            const previewContainer = document.getElementById('imagePreviewContainer');
            previewContainer.innerHTML = '';
            previewContainer.style.marginTop = '0';
        });
    }

    const saveBtn = document.getElementById('saveThemeBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            playClickSound();
            const theme = {};

            const imagePreview = document.querySelector('#imagePreviewContainer img');
            if (imagePreview) {
                theme.backgroundImage = imagePreview.src;
            }

            saveCustomTheme(theme);
            applyCustomTheme();

            if (typeof updateAllCharts === 'function') {
                updateAllCharts();
            }

            alert('主題設定已儲存！');
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        });
    }

    const resetBtn = document.getElementById('resetThemeBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('確定要重置所有自訂設定嗎？')) {
                saveCustomTheme({});
                applyTheme('blue');
                applyCustomTheme();
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
                showThemeSelector();
            }
        });
    }

    const closeBtn = modal.querySelector('.theme-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }
    });
}

function initTheme() {
    const savedTheme = getCurrentTheme();
    applyTheme(savedTheme);
    applyCustomTheme();
    const customTheme = getCustomTheme();
    if (customTheme.backgroundImage) {
        document.body.style.backgroundImage = `url(${customTheme.backgroundImage})`;
    }
    setTimeout(() => {
        updateThemeButtons(savedTheme);
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
});