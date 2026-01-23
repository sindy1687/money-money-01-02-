// 動漫優雅主題應用腳本
// 在主應用中加載此腳本來自動應用動漫優雅主題

(function() {
    'use strict';
    
    // 主題ID
    const ANIME_ELEGANCE_THEME_ID = 'anime-elegance';
    
    // 檢查是否已經應用了主題
    function isThemeApplied() {
        return document.documentElement.getAttribute('data-theme') === ANIME_ELEGANCE_THEME_ID;
    }
    
    // 應用動漫優雅主題
    function applyAnimeEleganceTheme() {
        if (isThemeApplied()) {
            console.log('🌸 動漫優雅主題已經應用');
            return;
        }
        
        // 設置主題屬性
        document.documentElement.setAttribute('data-theme', ANIME_ELEGANCE_THEME_ID);
        
        // 保存到本地存儲
        localStorage.setItem('selectedTheme', ANIME_ELEGANCE_THEME_ID);
        
        // 應用背景圖片
        const backgroundImage = 'https://i.pinimg.com/736x/62/ae/43/62ae43241893a8a0bb1bc79055d78cfe.jpg';
        document.body.style.backgroundImage = `url(${backgroundImage})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundAttachment = 'fixed';
        
        // 添加背景覆層
        let overlay = document.getElementById('anime-elegance-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'anime-elegance-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, rgba(125, 168, 199, 0.3) 0%, rgba(244, 228, 212, 0.2) 100%);
                pointer-events: none;
                z-index: -1;
            `;
            document.body.appendChild(overlay);
        }
        
        // 更新導航按鈕圖標
        updateNavigationIcons();
        
        // 更新FAB按鈕
        updateFabButton();
        
        console.log('🌸 動漫優雅主題應用成功！');
    }
    
    // 更新導航圖標
    function updateNavigationIcons() {
        const icons = {
            fab: '🌸',
            navLedger: '🦋',
            navWallet: '💎',
            navInvestment: '🌺',
            navChart: '🕊️',
            navSettings: '✨'
        };
        
        // 更新FAB按鈕
        const fabBtn = document.getElementById('fabBtn');
        if (fabBtn) {
            fabBtn.textContent = icons.fab;
        }
        
        // 更新導航項目
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const page = item.dataset.page;
            const navIcon = item.querySelector('.nav-icon');
            if (navIcon) {
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
        });
    }
    
    // 更新FAB按鈕
    function updateFabButton() {
        const fabBtn = document.getElementById('fabBtn');
        if (fabBtn) {
            fabBtn.style.background = 'linear-gradient(135deg, #7da8c7 0%, #5b8db3 100%)';
            fabBtn.style.color = '#ffffff';
            fabBtn.style.boxShadow = '0 15px 45px rgba(125, 168, 199, 0.3)';
        }
    }
    
    // 增強小森對話框
    function enhanceXiaosenDialog() {
        const xiaosenDialogs = document.querySelectorAll('.xiaosen-dialog, .advisor-dialog, .chat-dialog');
        xiaosenDialogs.forEach(dialog => {
            if (!dialog.classList.contains('anime-elegance-enhanced')) {
                dialog.classList.add('anime-elegance-enhanced');
                
                // 設置響應式樣式
                const updateDialogSize = () => {
                    if (window.innerWidth < 768) {
                        dialog.style.maxWidth = '95vw';
                        dialog.style.margin = '10px';
                        dialog.style.borderRadius = '16px';
                    } else if (window.innerWidth < 1024) {
                        dialog.style.maxWidth = '80vw';
                        dialog.style.margin = '20px';
                        dialog.style.borderRadius = '20px';
                    } else {
                        dialog.style.maxWidth = '600px';
                        dialog.style.margin = '20px auto';
                        dialog.style.borderRadius = '24px';
                    }
                };
                
                updateDialogSize();
                window.addEventListener('resize', updateDialogSize);
                
                // 添加優雅的動畫效果
                dialog.style.transition = 'all 0.3s ease';
            }
        });
    }
    
    // 增強投資卡片
    function enhanceInvestmentCards() {
        const investmentCards = document.querySelectorAll('.investment-card');
        investmentCards.forEach(card => {
            if (!card.classList.contains('anime-elegance-enhanced')) {
                card.classList.add('anime-elegance-enhanced');
                
                // 添加投資背景圖片
                const investmentBg = 'https://i.pinimg.com/736x/d5/9c/15/d59c15a48547bc1cb02c23d607eaf875.jpg';
                const bgOverlay = document.createElement('div');
                bgOverlay.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: url(${investmentBg});
                    background-size: cover;
                    background-position: center;
                    opacity: 0.15;
                    pointer-events: none;
                    z-index: 0;
                `;
                card.style.position = 'relative';
                card.style.zIndex = '1';
                card.insertBefore(bgOverlay, card.firstChild);
            }
        });
    }
    
    // 增強買入和定期定額按鈕
    function enhanceActionButtons() {
        const buyButtons = document.querySelectorAll('.buy-btn, .recurring-btn');
        buyButtons.forEach(btn => {
            if (!btn.classList.contains('anime-elegance-enhanced')) {
                btn.classList.add('anime-elegance-enhanced');
                btn.style.background = 'linear-gradient(135deg, #6fa870 0%, #5a8b5b 100%)';
                btn.style.color = '#ffffff';
                btn.style.border = '1px solid rgba(111, 168, 112, 0.3)';
                btn.style.borderRadius = '14px';
                btn.style.padding = '14px 28px';
                btn.style.fontWeight = '600';
                btn.style.fontSize = '15px';
                btn.style.boxShadow = '0 4px 15px rgba(111, 168, 112, 0.3)';
                btn.style.transition = 'all 0.3s ease';
            }
        });
    }
    
    // 增強智慧分析和提醒卡片
    function enhanceSmartCards() {
        const smartCards = document.querySelectorAll('.analysis-card, .reminder-card');
        smartCards.forEach(card => {
            if (!card.classList.contains('anime-elegance-enhanced')) {
                card.classList.add('anime-elegance-enhanced');
                card.style.background = 'linear-gradient(135deg, rgba(244, 248, 250, 0.85) 0%, rgba(168, 197, 216, 0.75) 100%)';
                card.style.border = '1px solid rgba(125, 168, 199, 0.5)';
                card.style.borderRadius = '18px';
                card.style.boxShadow = '0 8px 25px rgba(125, 168, 199, 0.2)';
                card.style.backdropFilter = 'blur(10px)';
            }
        });
    }
    
    // 初始化主題
    function initTheme() {
        // 應用主題
        applyAnimeEleganceTheme();
        
        // 延遲增強元素，確保DOM已經加載
        setTimeout(() => {
            enhanceXiaosenDialog();
            enhanceInvestmentCards();
            enhanceActionButtons();
            enhanceSmartCards();
        }, 100);
        
        // 監聽DOM變化，動態增強新元素
        const observer = new MutationObserver(() => {
            enhanceXiaosenDialog();
            enhanceInvestmentCards();
            enhanceActionButtons();
            enhanceSmartCards();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // 等待DOM加載完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
    
    // 導出函數供外部使用
    window.AnimeEleganceTheme = {
        apply: applyAnimeEleganceTheme,
        enhance: {
            xiaosenDialog: enhanceXiaosenDialog,
            investmentCards: enhanceInvestmentCards,
            actionButtons: enhanceActionButtons,
            smartCards: enhanceSmartCards
        }
    };
    
})();
