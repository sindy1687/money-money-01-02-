// ========== 主題顏色功能 ==========
const themes = [
    {
        id: 'pink',
        name: '粉色主題',
        icon: '💖',
        buttonIcon: '💗',
        preview: 'linear-gradient(135deg, #ffeef5 0%, #fff5f9 100%)',
        color: '#ff69b4'
    },
    {
        id: 'blue',
        name: '藍色主題',
        icon: '💙',
        buttonIcon: '💙',
        preview: 'linear-gradient(135deg, #e8f4fd 0%, #f0f8ff 100%)',
        color: '#4a90e2'
    },
    {
        id: 'green',
        name: '綠色主題',
        icon: '💚',
        buttonIcon: '💚',
        preview: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8f4 100%)',
        color: '#4caf50'
    },
    {
        id: 'forest',
        name: '森林清風',
        icon: '🌿',
        buttonIcon: '🌲',
        preview: 'linear-gradient(135deg, #03130d 0%, #103524 45%, #2f855a 100%)',
        color: '#2f855a'
    },
        {
        id: 'totoro',
        name: '龍貓主題',
        icon: '🌼',
        buttonIcon: '🌼',
        preview: 'linear-gradient(135deg, #f5f5dc 0%, #b0e0e6 60%, #87ceeb 100%)',
        color: '#4682B4'
    },
    {
        id: 'noface',
        name: '無臉男主題',
        icon: '🎭',
        buttonIcon: '🎭',
        preview: 'linear-gradient(135deg, #0f0c12 0%, #1f1b24 55%, #f6c343 100%)',
        color: '#f6c343'
    },
    {
        id: 'demonslayer',
        name: '鬼滅之刃主題',
        icon: '🗡️',
        buttonIcon: '🗡️',
        preview: 'linear-gradient(135deg, #08131e 0%, #0f2434 60%, #00c2d1 100%)',
        color: '#00c2d1'
    },
    {
        id: 'purple',
        name: '紫色主題',
        icon: '💜',
        buttonIcon: '💜',
        preview: 'linear-gradient(135deg, #f3e5f5 0%, #fce4ec 100%)',
        color: '#9c27b0'
    },
    {
        id: 'orange',
        name: '橙色主題',
        icon: '🧡',
        buttonIcon: '🧡',
        preview: 'linear-gradient(135deg, #fff3e0 0%, #fff8f0 100%)',
        color: '#ff9800'
    },
    {
        id: 'cyan',
        name: '青色主題',
        icon: '💠',
        buttonIcon: '💠',
        preview: 'linear-gradient(135deg, #e0f7fa 0%, #f0fdfe 100%)',
        color: '#00bcd4'
    },
    {
        id: 'star',
        name: '星空主題',
        icon: '✨',
        buttonIcon: '✨',
        preview: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
        color: '#8b7cf6'
    },
    {
        id: 'red',
        name: '紅色主題',
        icon: '❤️',
        buttonIcon: '❤️',
        preview: 'linear-gradient(135deg, #ffebee 0%, #fce4ec 100%)',
        color: '#e53935'
    },
    {
        id: 'yellow',
        name: '黃色主題',
        icon: '💛',
        buttonIcon: '💛',
        preview: 'linear-gradient(135deg, #fffde7 0%, #fffef5 100%)',
        color: '#fbc02d'
    },
    {
        id: 'indigo',
        name: '靛藍主題',
        icon: '💙',
        buttonIcon: '💙',
        preview: 'linear-gradient(135deg, #e8eaf6 0%, #f3f4f9 100%)',
        color: '#5c6bc0'
    },
    {
        id: 'teal',
        name: '茶色主題',
        icon: '💚',
        buttonIcon: '💚',
        preview: 'linear-gradient(135deg, #e0f2f1 0%, #f0f9f8 100%)',
        color: '#26a69a'
    },
        {
        id: 'aurora',
        name: '極光主題',
        icon: '🌈',
        buttonIcon: '🌈',
        preview: 'linear-gradient(135deg, #071a52 0%, #0b8457 50%, #7c3aed 100%)',
        color: '#00d4ff'
    },
        {
        id: 'firefly',
        name: '螢火蟲主題',
        icon: '✨',
        buttonIcon: '✨',
        preview: 'linear-gradient(135deg, #0b1020 0%, #1a2b3f 100%)',
        color: '#facc15'
    },
    {
        id: 'neon',
        name: '霓虹波動',
        icon: '🟣',
        buttonIcon: '🟣',
        preview: 'linear-gradient(135deg, #0b1020 0%, #1f1147 50%, #00d4ff 100%)',
        color: '#7c3aed'
    },
    {
        id: 'money',
        name: '金錢滿滿',
        icon: '💸',
        buttonIcon: '💸',
        preview: 'linear-gradient(135deg, #03130d 0%, #0b3720 45%, #31ff9b 100%)',
        color: '#16f49a'
    },
    {
        id: 'peach',
        name: '蜜桃柔霧',
        icon: '🍑',
        buttonIcon: '🍑',
        preview: 'linear-gradient(135deg, #fff1f2 0%, #ffedd5 50%, #ffe4e6 100%)',
        color: '#fb7185'
    },
    {
        id: 'snow',
        name: '飄雪主題',
        icon: '❄️',
        buttonIcon: '❄️',
        preview: 'linear-gradient(135deg, #e8f1ff 0%, #ffffff 100%)',
        color: '#93c5fd'
    },
    {
        id: 'cute',
        name: '可愛圖片主題',
        icon: '🐾',
        buttonIcon: '🐾',
        preview: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(230, 247, 255, 0.75) 100%), url("image/BMG.jpg") center/cover',
        color: '#4dd0e1'
    },
    {
        id: 'midnight',
        name: '午夜深色',
        icon: '🌙',
        buttonIcon: '🌙',
        preview: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        color: '#6366f1'
    },
    {
        id: 'space',
        name: '星際宇航',
        icon: '🚀',
        buttonIcon: '🌌',
        preview: 'linear-gradient(135deg, #001428 0%, #002850 60%, #8a2be2 100%)',
        color: '#00d4ff'
    },
    {
        id: 'caitu',
        name: '財兔滿滿',
        icon: '🐰',
        buttonIcon: '🐰',
        preview: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 223, 0, 0.2) 50%, rgba(255, 193, 7, 0.3) 100%), url("https://i.pinimg.com/736x/85/9c/7c/859c7c50479b84c65089909c4acec1f3.jpg") center/cover',
        color: '#FFD700'
    },
    {
        id: 'goldenTree',
        name: '金樹計畫',
        icon: '🌳',
        buttonIcon: '🌳',
        preview: 'linear-gradient(135deg, rgba(139, 69, 19, 0.3) 0%, rgba(160, 82, 45, 0.2) 50%, rgba(184, 134, 11, 0.3) 100%), url("https://i.pinimg.com/736x/28/a0/be/28a0be222d619be4c2944dbd309c4153.jpg") center/cover',
        color: '#8B4513'
    },
    {
        id: 'chaonengli',
        name: '鈔能力',
        icon: '💰',
        buttonIcon: '💰',
        preview: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(255, 215, 0, 0.2) 50%, rgba(184, 134, 11, 0.3) 100%), url("https://i.pinimg.com/736x/cc/56/8d/cc568d4109c2c92d507f597ba0ece7be.jpg") center/cover',
        color: '#D4AF37'
    },
    {
        id: 'fruit',
        name: '水果清爽',
        icon: '🍓',
        buttonIcon: '🍋',
        preview: 'linear-gradient(135deg, rgba(64, 224, 208, 0.3) 0%, rgba(255, 105, 180, 0.2) 50%, rgba(50, 205, 50, 0.3) 100%), url("https://i.pinimg.com/736x/3a/57/69/3a576934dcdf3bb2ba06b3d2964ab296.jpg") center/cover',
        color: '#40E0D0'
    },
    {
        id: 'meow',
        name: '喵喵喵',
        icon: '🐱',
        buttonIcon: '🐈',
        preview: 'linear-gradient(135deg, rgba(135, 206, 235, 0.4) 0%, rgba(255, 182, 193, 0.3) 50%, rgba(152, 251, 152, 0.4) 100%), url("https://i.pinimg.com/736x/9b/c1/cd/9bc1cd5e89c11cd36a290ef3cf707919.jpg") center/cover',
        color: '#87CEEB'
    },
    {
        id: 'enchanter',
        name: '秘術師',
        icon: '🧙‍♂️',
        buttonIcon: '🪄',
        preview: 'linear-gradient(135deg, rgba(26, 58, 58, 0.4) 0%, rgba(58, 90, 90, 0.3) 50%, rgba(57, 255, 20, 0.4) 100%), url("https://i.pinimg.com/1200x/88/01/f5/8801f51ecd5d4fa73e8bef1c314c2eab.jpg") center/cover',
        color: '#1a3a3a'
    }
];

const themeAnimations = {};

const themeVideoController = (() => {
    let moneyVideoEl = null;
    let spaceVideoEl = null;
    let containerEl = null;

    const ensureElements = () => {
        if (!moneyVideoEl) {
            moneyVideoEl = document.getElementById('moneyThemeVideo');
        }
        if (!spaceVideoEl) {
            spaceVideoEl = document.getElementById('spaceThemeVideo');
        }
        if (!containerEl) {
            containerEl = document.querySelector('.theme-video-background');
        }
        return moneyVideoEl && spaceVideoEl && containerEl;
    };

    const setActive = (themeId) => {
        if (!ensureElements()) return;
        moneyVideoEl.pause();
        spaceVideoEl.pause();

        const isActive = themeId === 'money' || themeId === 'space';
        containerEl.classList.toggle('active', isActive);

        if (isActive) {
            let activeVideo = null;
            if (themeId === 'money') {
                activeVideo = moneyVideoEl;
                moneyVideoEl.style.display = 'block';
                spaceVideoEl.style.display = 'none';
            } else if (themeId === 'space') {
                activeVideo = spaceVideoEl;
                spaceVideoEl.style.display = 'block';
                moneyVideoEl.style.display = 'none';
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
    updateThemeButtons(themeId);
    themeVideoController.setActive(themeId);

    const pageChart = document.getElementById('pageChart');
    if (pageChart && pageChart.style.display !== 'none') {
        if (typeof updateAllCharts === 'function') {
            updateAllCharts();
        }
    }
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
            navWallet: '�',
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
        money: {
            fab: '💸',
            navLedger: '📒',
            navWallet: '💰',
            navInvestment: '💹',
            navChart: '📊',
            navSettings: '⚙️'
        },
        galaxy: {
            fab: '🪐',
            navLedger: '🪐',
            navWallet: '💫',
            navInvestment: '🌟',
            navChart: '🔭',
            navSettings: '🌠'
        },
        peach: {
            fab: '🍑',
            navLedger: '🍑',
            navWallet: '💰',
            navInvestment: '📉',
            navChart: '📊',
            navSettings: '⚙️'
        },
        sunrise: {
            fab: '🌅',
            navLedger: '🌄',
            navWallet: '💰',
            navInvestment: '📈',
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
        enchanter: {
            fab: '🧙‍♂️',
            navLedger: '🪄',
            navWallet: '💰',
            navInvestment: '📈',
            navChart: '📊',
            navSettings: '⚙️'
        }
    };

    const iconAssetsDefault = {
        nav: {
            ledger: 'image/1.png',
            wallet: 'image/2.png',
            investment: 'image/3.png',
            chart: 'image/4.png',
            settings: 'image/5.png'
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
        if (!btn) return;
        btn.innerHTML = `<img src="${src}" alt="icon" class="ui-icon-img" style="width: 28px; height: 28px; object-fit: contain;" />`;
    };

    const icons = buttonIcons[themeId] || buttonIcons.pink;
    const iconAssets = themeId === 'cute' ? iconAssetsCute : iconAssetsDefault;

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
                const src = iconAssets.nav[page];
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

    const defaultColors = {
        primaryColor: customTheme.primaryColor || 'var(--color-primary, #4a90e2)',
        buttonColor: customTheme.buttonColor || 'var(--color-primary, #4a90e2)',
        boxColor: customTheme.boxColor || 'var(--bg-white, #ffffff)',
        backgroundColor: customTheme.backgroundColor || 'var(--bg-light-gradient, linear-gradient(135deg, #ffffff 0%, #e8f4fd 100%))',
        chartColor1: customTheme.chartColors?.[0] || 'var(--color-primary, #4a90e2)',
        chartColor2: customTheme.chartColors?.[1] || 'var(--color-primary-light, #7bb3f0)',
        chartColor3: customTheme.chartColors?.[2] || 'var(--color-primary-lighter, #5da3ed)',
        chartColor4: customTheme.chartColors?.[3] || 'var(--color-primary-dark, #2e7bd6)',
        chartColor5: customTheme.chartColors?.[4] || 'var(--color-primary-darker, #1e5ba8)'
    };

    modal.innerHTML = `
        <div class="theme-custom-content modal-content-standard">
            <div class="theme-modal-header">
                <div class="theme-modal-title">🎨 主題</div>
                <button class="theme-close-btn" type="button" aria-label="Close">✕</button>
            </div>

            <div class="theme-section">
                <div class="theme-section-title">主題</div>
                <div class="theme-toolbar">
                    <input id="themeSearchInput" class="theme-search-input" type="text" placeholder="搜尋主題..." autocomplete="off" />
                </div>
                <div id="themeGrid" class="theme-grid theme-grid--auto"></div>
            </div>

            <div class="theme-section theme-section--divider">
                <div class="theme-section-title">自訂顏色</div>

                <div class="theme-form">
                    <div class="theme-field">
                        <label class="theme-label">主色調（按鈕、邊框）</label>
                        <div class="theme-field-row">
                            <input type="color" id="primaryColorPicker" value="${defaultColors.primaryColor}" class="theme-color-picker">
                            <input type="text" id="primaryColorText" value="${defaultColors.primaryColor}" class="theme-text-input">
                        </div>
                    </div>

                    <div class="theme-field">
                        <label class="theme-label">框的背景顏色</label>
                        <div class="theme-field-row">
                            <input type="color" id="boxColorPicker" value="${defaultColors.boxColor}" class="theme-color-picker">
                            <input type="text" id="boxColorText" value="${defaultColors.boxColor}" class="theme-text-input">
                        </div>
                    </div>

                    <div class="theme-field">
                        <label class="theme-label">背景顏色</label>
                        <div class="theme-field-row">
                            <input type="color" id="backgroundColorPicker" value="#ffeef5" class="theme-color-picker">
                            <input type="text" id="backgroundColorText" value="${defaultColors.backgroundColor}" placeholder="例如: #ffeef5 或 linear-gradient(...)" class="theme-text-input">
                        </div>
                        <div class="theme-help">支援顏色代碼或漸層（linear-gradient）</div>
                    </div>
                </div>
            </div>

            <div class="theme-section theme-section--divider">
                <div class="theme-section-title">圖表顏色</div>
                <div class="theme-form">
                    ${[1, 2, 3, 4, 5].map(i => `
                        <div class="theme-field">
                            <label class="theme-label">圖表顏色 ${i}</label>
                            <div class="theme-field-row">
                                <input type="color" id="chartColor${i}Picker" value="${defaultColors[`chartColor${i}`]}" class="theme-color-picker">
                                <input type="text" id="chartColor${i}Text" value="${defaultColors[`chartColor${i}`]}" class="theme-text-input">
                            </div>
                        </div>
                    `).join('')}
                </div>
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

    const renderThemeGrid = (query = '') => {
        const q = (query || '').trim().toLowerCase();
        const grid = document.getElementById('themeGrid');
        if (!grid) return;

        const list = themes.filter(t => {
            if (!q) return true;
            return (t.name || '').toLowerCase().includes(q) || (t.id || '').toLowerCase().includes(q);
        });

        grid.innerHTML = list.map(theme => {
            const isSelected = theme.id === currentTheme && !customTheme.primaryColor;
            return `
                <div class="theme-item ${isSelected ? 'selected' : ''}" data-theme-id="${theme.id}">
                    <div class="theme-item-preview" style="background: ${theme.preview};"></div>
                    <div class="theme-item-content theme-item-content--compact">
                        <div class="theme-item-icon">${theme.icon}</div>
                        <div class="theme-item-name">${theme.name}</div>
                        ${isSelected ? '<div class="theme-item-check">✓</div>' : '<div class="theme-item-check theme-item-check--placeholder"></div>'}
                    </div>
                </div>
            `;
        }).join('');

        grid.querySelectorAll('.theme-item').forEach(item => {
            item.addEventListener('click', () => {
                const themeId = item.dataset.themeId;
                applyTheme(themeId);
                saveCustomTheme({});
                applyCustomTheme();

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

    renderThemeGrid('');

    const themeSearchInput = document.getElementById('themeSearchInput');
    if (themeSearchInput) {
        themeSearchInput.addEventListener('input', (e) => {
            renderThemeGrid(e.target.value);
        });
    }

    const colorInputs = [
        { picker: 'primaryColorPicker', text: 'primaryColorText' },
        { picker: 'boxColorPicker', text: 'boxColorText' },
        { picker: 'backgroundColorPicker', text: 'backgroundColorText' },
        ...Array.from({length: 5}, (_, i) => ({ picker: `chartColor${i+1}Picker`, text: `chartColor${i+1}Text` }))
    ];

    colorInputs.forEach(({picker, text}) => {
        const pickerEl = document.getElementById(picker);
        const textEl = document.getElementById(text);
        if (pickerEl && textEl) {
            pickerEl.addEventListener('input', (e) => {
                textEl.value = e.target.value;
            });
            textEl.addEventListener('input', (e) => {
                if (e.target.value.match(/^#[0-9A-Fa-f]{6}$/)) {
                    pickerEl.value = e.target.value;
                }
            });
        }
    });

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
            const theme = {
                primaryColor: document.getElementById('primaryColorText').value,
                buttonColor: document.getElementById('primaryColorText').value,
                boxColor: document.getElementById('boxColorText').value,
                backgroundColor: document.getElementById('backgroundColorText').value,
                chartColors: [
                    document.getElementById('chartColor1Text').value,
                    document.getElementById('chartColor2Text').value,
                    document.getElementById('chartColor3Text').value,
                    document.getElementById('chartColor4Text').value,
                    document.getElementById('chartColor5Text').value
                ]
            };

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
    setTimeout(() => {
        updateThemeButtons(savedTheme);
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
});
