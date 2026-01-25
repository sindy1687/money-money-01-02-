// 添加夢幻粉色主題到主題系統
(function() {
    // 檢查主題系統是否已載入
    if (typeof themes === 'undefined') {
        console.error('主題系統尚未載入，請確保在 theme.js 之後載入此腳本');
        return;
    }
    
    // 夢幻藍色花卉主題定義
    const dreamyPinkTheme = {
        id: 'dreamyPink',
        name: '夢幻藍色花卉',
        icon: '💙',
        buttonIcon: '🌸',
        preview: 'linear-gradient(135deg, #2196f3 0%, #64b5f6 25%, #90caf9 50%, #1976d2 75%, #1565c0 100%)',
        color: '#2196f3',
        category: 'cute',
        backgroundImage: 'https://i.pinimg.com/736x/4b/8d/f6/4b8df6fa8b0094fa01fd59fa7177a2d2.jpg',
        investmentCardImage: 'https://i.pinimg.com/736x/4b/8d/f6/4b8df6fa8b0094fa01fd59fa7177a2d2.jpg',
        accountingCardImage: 'https://i.pinimg.com/736x/4b/8d/f6/4b8df6fa8b0094fa01fd59fa7177a2d2.jpg',
        walletBudgetCardImage: 'https://i.pinimg.com/736x/4b/8d/f6/4b8df6fa8b0094fa01fd59fa7177a2d2.jpg',
        monthlyPlanningCardImage: 'https://i.pinimg.com/736x/4b/8d/f6/4b8df6fa8b0094fa01fd59fa7177a2d2.jpg',
        investmentSettingsCardImage: 'https://i.pinimg.com/736x/4b/8d/f6/4b8df6fa8b0094fa01fd59fa7177a2d2.jpg',
        holdingCardImage: 'https://i.pinimg.com/736x/4b/8d/f6/4b8df6fa8b0094fa01fd59fa7177a2d2.jpg',
        buyingCardImage: 'https://i.pinimg.com/736x/4b/8d/f6/4b8df6fa8b0094fa01fd59fa7177a2d2.jpg',
        sellingCardImage: 'https://i.pinimg.com/736x/4b/8d/f6/4b8df6fa8b0094fa01fd59fa7177a2d2.jpg',
        dividendCardImage: 'https://i.pinimg.com/736x/4b/8d/f6/4b8df6fa8b0094fa01fd59fa7177a2d2.jpg',
        smartAnalysisCardImage: 'https://i.pinimg.com/736x/4b/8d/f6/4b8df6fa8b0094fa01fd59fa7177a2d2.jpg',
        smartReminderCardImage: 'https://i.pinimg.com/736x/4b/8d/f6/4b8df6fa8b0094fa01fd59fa7177a2d2.jpg',
        regularInvestmentCardImage: 'https://i.pinimg.com/736x/4b/8d/f6/4b8df6fa8b0094fa01fd59fa7177a2d2.jpg'
    };
    
    // 檢查主題是否已存在
    const existingTheme = themes.find(t => t.id === 'dreamyPink');
    if (existingTheme) {
        console.log('夢幻粉色主題已存在，跳過添加');
        return;
    }
    
    // 添加主題到主題陣列
    themes.push(dreamyPinkTheme);
    console.log('✅ 夢幻粉色主題已成功添加到主題系統');
    
    // 添加按鈕圖標配置
    if (typeof updateThemeButtons === 'function') {
        // 等待DOM載入完成後添加按鈕圖標
        document.addEventListener('DOMContentLoaded', function() {
            // 獲取按鈕圖標配置
            const buttonIconsElement = document.querySelector('script[data-theme-buttons]');
            if (buttonIconsElement) {
                // 動態添加按鈕圖標配置
                const currentScript = buttonIconsElement.textContent;
                const dreamyPinkIconsConfig = `
        dreamyPink: {
            fab: '�',
            navLedger: '📖',
            navWallet: '💰',
            navInvestment: '📈',
            navChart: '📊',
            navSettings: '⚙️'
        },`;
                
                // 在現有配置中添加新主題圖標
                const updatedScript = currentScript.replace(
                    '    };',
                    dreamyPinkIconsConfig + '\n    };'
                );
                
                buttonIconsElement.textContent = updatedScript;
                console.log('✅ 夢幻粉色主題按鈕圖標已添加');
            }
        });
    }
    
    // 立即應用主題（如果當前沒有選擇主題）
    const currentTheme = getCurrentTheme();
    if (currentTheme === 'blue' || !themes.find(t => t.id === currentTheme)) {
        // 可以選擇自動應用新主題
        // applyTheme('dreamyPink');
        console.log('💡 可以使用 applyTheme("dreamyPink") 來應用新主題');
    }
    
    // 提供全局函數供其他腳本使用
    window.addDreamyPinkTheme = function() {
        if (!themes.find(t => t.id === 'dreamyPink')) {
            themes.push(dreamyPinkTheme);
            console.log('✅ 夢幻粉色主題已手動添加');
        }
        return dreamyPinkTheme;
    };
    
    // 強制應用夢幻粉色背景
    window.applyDreamyPinkBackground = function() {
        if (document.documentElement.getAttribute('data-theme') === 'dreamyPink') {
            document.body.style.background = "url('https://i.pinimg.com/736x/4b/8d/f6/4b8df6fa8b0094fa01fd59fa7177a2d2.jpg') center/cover fixed";
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundAttachment = 'fixed';
            document.body.style.minHeight = '100vh';
            console.log('✅ 夢幻粉色背景已強制應用');
        }
    };
    
    // 強制應用預算設定內容容器樣式
    window.applyDreamyPinkBudgetStyles = function() {
        if (document.documentElement.getAttribute('data-theme') === 'dreamyPink') {
            const colorPrimary = '#2196f3';
            
            // 查找所有可能的預算設定內容容器
            const selectors = [
                '.budget-settings .card-content',
                '.budget-page .card-content',
                '.budget-config .card-content',
                '.budget-settings-card .card-content',
                '.monthly-planning-card .card-content',
                '.investment-settings-card .card-content',
                '.budget-settings-content',
                '.budget-content',
                '.budget-config-content'
            ];
            
            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    element.style.background = colorPrimary;
                    element.style.borderRadius = '16px';
                    element.style.backdropFilter = 'blur(12px)';
                    element.style.border = '1px solid rgba(33, 150, 243, 0.25)';
                    element.style.boxShadow = '0 6px 24px rgba(33, 150, 243, 0.12)';
                    element.style.padding = '20px';
                    element.style.margin = '16px';
                    element.style.position = 'relative';
                    element.style.zIndex = '9999';
                });
            });
            
            console.log('✅ 夢幻粉色預算設定樣式已強制應用');
        }
    };
    
    // 強制應用當月每日明細樣式
    window.applyDreamyPinkDailyDetailsStyles = function() {
        if (document.documentElement.getAttribute('data-theme') === 'dreamyPink') {
            const colorPrimary = '#2196f3';
            
            // 查找所有可能的當月每日明細元素
            const selectors = [
                '.daily-details',
                '.monthly-details',
                '.expense-details',
                '.daily-expense-details',
                '.current-month-details',
                '.month-details',
                '.daily-transaction-details'
            ];
            
            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    element.style.background = 'rgba(255, 255, 255, 0.12)';
                    element.style.backdropFilter = 'blur(12px)';
                    element.style.border = '1px solid rgba(33, 150, 243, 0.25)';
                    element.style.borderRadius = '18px';
                    element.style.boxShadow = '0 6px 24px rgba(33, 150, 243, 0.12)';
                    element.style.position = 'relative';
                    element.style.overflow = 'hidden';
                    element.style.zIndex = '9999';
                });
                
                // 應用子元素樣式
                const childElements = document.querySelectorAll(selector + ' .container, ' + selector + ' .main-content, ' + selector + ' .card, ' + selector + ' .detail-card');
                childElements.forEach(element => {
                    element.style.background = 'rgba(255, 255, 255, 0.15)';
                    element.style.backdropFilter = 'blur(8px)';
                    element.style.border = '1px solid rgba(33, 150, 243, 0.3)';
                    element.style.borderRadius = '14px';
                    element.style.boxShadow = '0 4px 16px rgba(33, 150, 243, 0.12)';
                    element.style.padding = '16px';
                    element.style.margin = '8px 0';
                    element.style.position = 'relative';
                    element.style.zIndex = '9999';
                });
                
                // 應用列表項目樣式
                const listElements = document.querySelectorAll(selector + ' .list-item, ' + selector + ' .transaction-item');
                listElements.forEach(element => {
                    element.style.background = 'rgba(255, 255, 255, 0.12)';
                    element.style.backdropFilter = 'blur(6px)';
                    element.style.border = '1px solid rgba(33, 150, 243, 0.25)';
                    element.style.borderRadius = '10px';
                    element.style.boxShadow = '0 2px 8px rgba(33, 150, 243, 0.08)';
                    element.style.padding = '12px 16px';
                    element.style.margin = '6px 0';
                    element.style.position = 'relative';
                    element.style.zIndex = '9999';
                });
                
                // 應用表格樣式
                const tableElements = document.querySelectorAll(selector + ' table');
                tableElements.forEach(element => {
                    element.style.background = 'rgba(255, 255, 255, 0.08)';
                    element.style.backdropFilter = 'blur(8px)';
                    element.style.border = '1px solid rgba(33, 150, 243, 0.2)';
                    element.style.borderRadius = '12px';
                    element.style.boxShadow = '0 4px 16px rgba(33, 150, 243, 0.1)';
                    element.style.overflow = 'hidden';
                    element.style.zIndex = '9999';
                });
                
                // 應用輸入框樣式
                const inputElements = document.querySelectorAll(selector + ' input, ' + selector + ' select');
                inputElements.forEach(element => {
                    element.style.background = 'rgba(255, 255, 255, 0.2)';
                    element.style.backdropFilter = 'blur(6px)';
                    element.style.border = '1px solid rgba(33, 150, 243, 0.3)';
                    element.style.borderRadius = '8px';
                    element.style.color = '#333';
                    element.style.padding = '8px 12px';
                    element.style.zIndex = '9999';
                });
                
                // 應用按鈕樣式
                const buttonElements = document.querySelectorAll(selector + ' .btn');
                buttonElements.forEach(element => {
                    element.style.background = 'linear-gradient(135deg, rgba(33, 150, 243, 0.7), rgba(33, 150, 243, 0.5))';
                    element.style.backdropFilter = 'blur(6px)';
                    element.style.border = '1px solid rgba(33, 150, 243, 0.3)';
                    element.style.borderRadius = '8px';
                    element.style.color = 'white';
                    element.style.padding = '8px 16px';
                    element.style.boxShadow = '0 3px 12px rgba(33, 150, 243, 0.2)';
                    element.style.zIndex = '9999';
                });
            });
            
            console.log('✅ 夢幻粉色當月每日明細樣式已強制應用');
        }
    };
    
    // 主題特定的持股卡片配置
    const themeHoldingCardConfig = {
        dreamyPink: {
            background: 'url("https://i.pinimg.com/1200x/a3/79/5c/a3795c5ed00c9589044cd126bfc927b4.jpg") center/cover',
            backgroundImage: 'url("https://i.pinimg.com/1200x/a3/79/5c/a3795c5ed00c9589044cd126bfc927b4.jpg")',
            border: '2px solid rgba(33, 150, 243, 0.4)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(33, 150, 243, 0.15)',
            backdropFilter: 'blur(8px)',
            contentBackground: 'rgba(255, 255, 255, 0.15)',
            titleBackground: 'rgba(255, 255, 255, 0.25)',
            textBackground: 'rgba(255, 255, 255, 0.2)',
            borderColor: 'rgba(33, 150, 243, 0.3)',
            titleColor: '#333',
            textColor: '#333'
        },
        littlePrince: {
            background: 'url("https://i.pinimg.com/736x/91/87/48/918748238a3b26c91dcacd9926591d57.jpg") center/cover fixed',
            backgroundImage: 'url("https://i.pinimg.com/736x/91/87/48/918748238a3b26c91dcacd9926591d57.jpg")',
            border: '1px solid rgba(230, 168, 124, 0.4)',
            borderRadius: '20px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(20px)',
            contentBackground: 'rgba(244, 228, 193, 0.8)',
            titleBackground: 'rgba(230, 168, 124, 0.8)',
            textBackground: 'rgba(244, 228, 193, 0.6)',
            borderColor: 'rgba(230, 168, 124, 0.3)',
            titleColor: '#5D4E37',
            textColor: '#5D4E37'
        },
        dreamyDynamic: {
            background: 'linear-gradient(145deg, #1a1f2e 0%, #2d3748 50%, #1a202c 100%)',
            backgroundImage: 'none',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(15px)',
            contentBackground: 'rgba(26, 31, 46, 0.8)',
            titleBackground: 'rgba(139, 92, 246, 0.2)',
            textBackground: 'rgba(26, 31, 46, 0.6)',
            borderColor: 'rgba(139, 92, 246, 0.3)',
            titleColor: '#fff',
            textColor: '#e2e8f0'
        },
        deepElegant: {
            background: 'url("https://i.pinimg.com/736x/32/91/28/3291288e558fa4511b83ecb6f8a96d22.jpg") center/cover',
            backgroundImage: 'url("https://i.pinimg.com/736x/32/91/28/3291288e558fa4511b83ecb6f8a96d22.jpg")',
            border: '2px solid rgba(74, 60, 140, 0.4)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(26, 31, 58, 0.4)',
            backdropFilter: 'blur(15px)',
            contentBackground: 'rgba(26, 31, 58, 0.85)',
            titleBackground: 'rgba(74, 60, 140, 0.8)',
            textBackground: 'rgba(26, 31, 58, 0.7)',
            borderColor: 'rgba(74, 60, 140, 0.3)',
            titleColor: '#ffffff',
            textColor: '#b8c5d6'
        }
    };
    
    // 卡片類型特定的背景圖片配置
    const cardTypeBackgrounds = {
        buying: {
            background: 'url("https://i.pinimg.com/1200x/3f/46/e1/3f46e156669bfa1588424cccca7172f2.jpg") center/cover',
            backgroundImage: 'url("https://i.pinimg.com/1200x/3f/46/e1/3f46e156669bfa1588424cccca7172f2.jpg")',
            border: '2px solid rgba(76, 175, 80, 0.4)',
            contentBackground: 'rgba(76, 175, 80, 0.15)',
            titleBackground: 'rgba(76, 175, 80, 0.25)',
            textBackground: 'rgba(76, 175, 80, 0.2)',
            borderColor: 'rgba(76, 175, 80, 0.3)',
            titleColor: '#2E7D32',
            textColor: '#1B5E20'
        },
        selling: {
            background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(239, 83, 80, 0.1) 100%)',
            backgroundImage: 'none',
            border: '2px solid rgba(244, 67, 54, 0.4)',
            contentBackground: 'rgba(244, 67, 54, 0.15)',
            titleBackground: 'rgba(244, 67, 54, 0.25)',
            textBackground: 'rgba(244, 67, 54, 0.2)',
            borderColor: 'rgba(244, 67, 54, 0.3)',
            titleColor: '#C62828',
            textColor: '#B71C1C'
        },
        dividend: {
            background: 'url("https://i.pinimg.com/736x/bf/bb/d8/bfbbd8069018715418b04a38e199a34d.jpg") center/cover',
            backgroundImage: 'url("https://i.pinimg.com/736x/bf/bb/d8/bfbbd8069018715418b04a38e199a34d.jpg")',
            border: '2px solid rgba(255, 193, 7, 0.4)',
            contentBackground: 'rgba(255, 193, 7, 0.15)',
            titleBackground: 'rgba(255, 193, 7, 0.25)',
            textBackground: 'rgba(255, 193, 7, 0.2)',
            borderColor: 'rgba(255, 193, 7, 0.3)',
            titleColor: '#F57C00',
            textColor: '#E65100'
        },
        reinvestment: {
            background: 'url("https://i.pinimg.com/1200x/4e/6d/43/4e6d43c6cb709a859c36cea311653657.jpg") center/cover',
            backgroundImage: 'url("https://i.pinimg.com/1200x/4e/6d/43/4e6d43c6cb709a859c36cea311653657.jpg")',
            border: '2px solid rgba(156, 39, 176, 0.4)',
            contentBackground: 'rgba(156, 39, 176, 0.15)',
            titleBackground: 'rgba(156, 39, 176, 0.25)',
            textBackground: 'rgba(156, 39, 176, 0.2)',
            borderColor: 'rgba(156, 39, 176, 0.3)',
            titleColor: '#6A1B9A',
            textColor: '#4A148C'
        }
    };
    
    // 深色優雅主題的特殊卡片配置
    const deepElegantCardBackgrounds = {
        buying: {
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(56, 142, 60, 0.15) 100%)',
            backgroundImage: 'none',
            border: '2px solid rgba(76, 175, 80, 0.6)',
            contentBackground: 'rgba(76, 175, 80, 0.2)',
            titleBackground: 'rgba(76, 175, 80, 0.3)',
            textBackground: 'rgba(76, 175, 80, 0.15)',
            borderColor: 'rgba(76, 175, 80, 0.4)',
            titleColor: '#ffffff',
            textColor: '#e8f5e8'
        },
        selling: {
            background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.15) 0%, rgba(229, 57, 53, 0.15) 100%)',
            backgroundImage: 'none',
            border: '2px solid rgba(244, 67, 54, 0.6)',
            contentBackground: 'rgba(244, 67, 54, 0.2)',
            titleBackground: 'rgba(244, 67, 54, 0.3)',
            textBackground: 'rgba(244, 67, 54, 0.15)',
            borderColor: 'rgba(244, 67, 54, 0.4)',
            titleColor: '#ffffff',
            textColor: '#ffebee'
        },
        dividend: {
            background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.15) 0%, rgba(255, 152, 0, 0.15) 100%)',
            backgroundImage: 'none',
            border: '2px solid rgba(255, 193, 7, 0.6)',
            contentBackground: 'rgba(255, 193, 7, 0.2)',
            titleBackground: 'rgba(255, 193, 7, 0.3)',
            textBackground: 'rgba(255, 193, 7, 0.15)',
            borderColor: 'rgba(255, 193, 7, 0.4)',
            titleColor: '#ffffff',
            textColor: '#fff8e1'
        },
        reinvestment: {
            background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.15) 0%, rgba(123, 31, 162, 0.15) 100%)',
            backgroundImage: 'none',
            border: '2px solid rgba(156, 39, 176, 0.6)',
            contentBackground: 'rgba(156, 39, 176, 0.2)',
            titleBackground: 'rgba(156, 39, 176, 0.3)',
            textBackground: 'rgba(156, 39, 176, 0.15)',
            borderColor: 'rgba(156, 39, 176, 0.4)',
            titleColor: '#ffffff',
            textColor: '#f3e5f5'
        }
    };
    
    // 通用持股卡片樣式應用函數
    window.applyThemeSpecificHoldingCardStyles = function(themeId) {
        const config = themeHoldingCardConfig[themeId];
        if (!config) return;
        
        // 查找所有持股卡片元素 - 包含實際使用的選擇器
        const holdingCards = document.querySelectorAll('.holding-card, div.holding-card, *[class*="holding-card"], .stock-item-card, *[class*="stock-item-card"], .investment-form, *[id*="Form"]');
        console.log(`🔍 找到 ${holdingCards.length} 個持股卡片元素`);
        
        holdingCards.forEach((element, index) => {
            console.log(`處理持股卡片 ${index + 1}:`, element.className, element.id);
            
            // 檢測卡片類型並獲取對應配置
            let cardConfig = config;
            let cardType = null;
            
            // 檢測卡片類型 - 基於ID和類名
            if (element.id === 'buyForm' || element.className.includes('buy') || element.classList.contains('buy-form')) {
                cardType = 'buying';
                // 如果是深色優雅主題，使用特殊配置
                if (themeId === 'deepElegant') {
                    cardConfig = { ...config, ...deepElegantCardBackgrounds.buying };
                } else {
                    cardConfig = { ...config, ...cardTypeBackgrounds.buying };
                }
            } else if (element.id === 'sellForm' || element.className.includes('sell') || element.classList.contains('sell-form')) {
                cardType = 'selling';
                if (themeId === 'deepElegant') {
                    cardConfig = { ...config, ...deepElegantCardBackgrounds.selling };
                } else {
                    cardConfig = { ...config, ...cardTypeBackgrounds.selling };
                }
            } else if (element.id === 'dividendForm' || element.id === 'dividendInputPage' || element.className.includes('dividend') || element.classList.contains('dividend-form')) {
                cardType = 'dividend';
                if (themeId === 'deepElegant') {
                    cardConfig = { ...config, ...deepElegantCardBackgrounds.dividend };
                } else {
                    cardConfig = { ...config, ...cardTypeBackgrounds.dividend };
                }
            } else if (element.id === 'dcaForm' || element.className.includes('dca') || element.className.includes('reinvestment') || element.classList.contains('dca-form')) {
                cardType = 'reinvestment';
                if (themeId === 'deepElegant') {
                    cardConfig = { ...config, ...deepElegantCardBackgrounds.reinvestment };
                } else {
                    cardConfig = { ...config, ...cardTypeBackgrounds.reinvestment };
                }
            } else if (element.classList.contains('buying-card') || element.className.includes('buying')) {
                cardType = 'buying';
                if (themeId === 'deepElegant') {
                    cardConfig = { ...config, ...deepElegantCardBackgrounds.buying };
                } else {
                    cardConfig = { ...config, ...cardTypeBackgrounds.buying };
                }
            } else if (element.classList.contains('selling-card') || element.className.includes('selling')) {
                cardType = 'selling';
                if (themeId === 'deepElegant') {
                    cardConfig = { ...config, ...deepElegantCardBackgrounds.selling };
                } else {
                    cardConfig = { ...config, ...cardTypeBackgrounds.selling };
                }
            } else if (element.classList.contains('dividend-card') || element.className.includes('dividend')) {
                cardType = 'dividend';
                if (themeId === 'deepElegant') {
                    cardConfig = { ...config, ...deepElegantCardBackgrounds.dividend };
                } else {
                    cardConfig = { ...config, ...cardTypeBackgrounds.dividend };
                }
            } else if (element.classList.contains('reinvestment-card') || element.className.includes('reinvestment')) {
                cardType = 'reinvestment';
                if (themeId === 'deepElegant') {
                    cardConfig = { ...config, ...deepElegantCardBackgrounds.reinvestment };
                } else {
                    cardConfig = { ...config, ...cardTypeBackgrounds.reinvestment };
                }
            }
            
            if (cardType) {
                console.log(`🎨 應用 ${cardType} 卡片樣式`);
            }
            
            // 設置卡片背景
            element.style.setProperty('background', cardConfig.background, 'important');
            element.style.setProperty('background-image', cardConfig.backgroundImage, 'important');
            element.style.setProperty('border', cardConfig.border, 'important');
            element.style.setProperty('border-radius', cardConfig.borderRadius, 'important');
            element.style.setProperty('box-shadow', cardConfig.boxShadow, 'important');
            element.style.setProperty('backdrop-filter', cardConfig.backdropFilter, 'important');
            element.style.setProperty('position', 'relative', 'important');
            element.style.setProperty('overflow', 'hidden', 'important');
            element.style.setProperty('z-index', '9999', 'important');
            
            // 設置內容容器樣式
            const contentElements = element.querySelectorAll('.card-content, .card-body, .content, .container, .stock-grid-card-top, .stock-grid-card-title');
            contentElements.forEach(content => {
                content.style.setProperty('background', cardConfig.contentBackground, 'important');
                content.style.setProperty('backdrop-filter', 'blur(12px)', 'important');
                content.style.setProperty('border', cardConfig.borderColor, 'important');
                content.style.setProperty('border-radius', '12px', 'important');
                content.style.setProperty('box-shadow', '0 4px 16px rgba(0, 0, 0, 0.1)', 'important');
                content.style.setProperty('padding', '8px', 'important');
                content.style.setProperty('margin', '4px', 'important');
                content.style.setProperty('position', 'relative', 'important');
                content.style.setProperty('z-index', '9999', 'important');
            });
            
            // 設置標題樣式
            const titleElements = element.querySelectorAll('h3, h4, .card-title, .title, .stock-card-name, .stock-grid-card-title');
            titleElements.forEach(title => {
                title.style.setProperty('background', cardConfig.titleBackground, 'important');
                title.style.setProperty('backdrop-filter', 'blur(10px)', 'important');
                title.style.setProperty('border', cardConfig.borderColor, 'important');
                title.style.setProperty('border-radius', '8px', 'important');
                title.style.setProperty('color', cardConfig.titleColor, 'important');
                title.style.setProperty('font-weight', '600', 'important');
                title.style.setProperty('padding', '4px 8px', 'important');
                title.style.setProperty('margin', '2px', 'important');
                title.style.setProperty('position', 'relative', 'important');
                title.style.setProperty('z-index', '9999', 'important');
            });
            
            // 設置文字內容樣式
            const textElements = element.querySelectorAll('p, .card-text, .text, .description, .stock-card-price, .stock-card-change');
            textElements.forEach(text => {
                text.style.setProperty('background', cardConfig.textBackground, 'important');
                text.style.setProperty('backdrop-filter', 'blur(8px)', 'important');
                text.style.setProperty('border', cardConfig.borderColor, 'important');
                text.style.setProperty('border-radius', '6px', 'important');
                text.style.setProperty('color', cardConfig.textColor, 'important');
                text.style.setProperty('padding', '3px 6px', 'important');
                text.style.setProperty('margin', '2px', 'important');
                text.style.setProperty('position', 'relative', 'important');
                text.style.setProperty('z-index', '9999', 'important');
            });
        });
        
        console.log(`✅ ${themeId} 主題持股卡片樣式已應用到 ${holdingCards.length} 個元素`);
    };
    
    // 強制應用持股卡片樣式 (保持向後兼容)
    window.applyDreamyPinkHoldingCardStyles = function() {
        applyThemeSpecificHoldingCardStyles('dreamyPink');
    };
    
    // 添加新主題持股卡片配置的函數
    window.addThemeHoldingCardConfig = function(themeId, config) {
        themeHoldingCardConfig[themeId] = config;
        console.log(`✅ 已添加 ${themeId} 主題的持股卡片配置`);
    };
    
    // 獲取主題持股卡片配置的函數
    window.getThemeHoldingCardConfig = function(themeId) {
        return themeHoldingCardConfig[themeId];
    };
    
    // 預設的主題配置示例
    const exampleConfigs = {
        cosmicDream: {
            background: 'url("https://i.pinimg.com/736x/8b/5c/9b/8b5c9b1234567890.jpg") center/cover',
            backgroundImage: 'url("https://i.pinimg.com/736x/8b/5c/9b/8b5c9b1234567890.jpg")',
            border: '2px solid rgba(138, 43, 226, 0.4)',
            borderRadius: '18px',
            boxShadow: '0 10px 40px rgba(138, 43, 226, 0.2)',
            backdropFilter: 'blur(12px)',
            contentBackground: 'rgba(255, 255, 255, 0.9)',
            titleBackground: 'rgba(138, 43, 226, 0.8)',
            textBackground: 'rgba(255, 255, 255, 0.8)',
            borderColor: 'rgba(138, 43, 226, 0.3)',
            titleColor: '#fff',
            textColor: '#333'
        },
        cutePastel: {
            background: 'linear-gradient(135deg, #FFE5E5 0%, #E5F5FF 50%, #F0E5FF 100%)',
            backgroundImage: 'none',
            border: '3px solid rgba(255, 182, 193, 0.6)',
            borderRadius: '24px',
            boxShadow: '0 8px 32px rgba(255, 182, 193, 0.3)',
            backdropFilter: 'blur(10px)',
            contentBackground: 'rgba(255, 255, 255, 0.95)',
            titleBackground: 'rgba(255, 182, 193, 0.8)',
            textBackground: 'rgba(255, 255, 255, 0.9)',
            borderColor: 'rgba(255, 182, 193, 0.4)',
            titleColor: '#D23369',
            textColor: '#666'
        }
    };
    
    // 自動添加示例配置（您可以根據需要修改）
    Object.assign(themeHoldingCardConfig, exampleConfigs);
    
    // 調試函數 - 檢查持股卡片實際情況
    window.debugHoldingCards = function() {
        console.log('🔍 持股卡片調試信息:');
        console.log('當前主題:', getCurrentTheme());
        
        // 檢查持股卡片元素 - 包含實際使用的選擇器
        const holdingCards = document.querySelectorAll('.holding-card, div.holding-card, *[class*="holding-card"], .stock-item-card, *[class*="stock-item-card"], .investment-form, *[id*="Form"]');
        console.log('找到的持股卡片數量:', holdingCards.length);
        
        holdingCards.forEach((element, index) => {
            console.log(`持股卡片 ${index + 1}:`, {
                className: element.className,
                tagName: element.tagName,
                id: element.id,
                currentBackground: element.style.background,
                currentBorder: element.style.border,
                currentBorderRadius: element.style.borderRadius
            });
        });
        
        // 檢查主題配置
        const currentTheme = getCurrentTheme();
        const config = themeHoldingCardConfig[currentTheme];
        console.log('當前主題配置:', config);
        
        // 檢查是否有配置
        if (!config) {
            console.log('⚠️ 當前主題沒有持股卡片配置');
        } else {
            console.log('✅ 當前主題有持股卡片配置');
        }
    };
    
    // 強制測試函數
    window.testHoldingCardStyles = function(themeId) {
        console.log(`🧪 測試 ${themeId} 主題持股卡片樣式`);
        
        const config = themeHoldingCardConfig[themeId];
        if (!config) {
            console.log(`❌ ${themeId} 主題沒有配置`);
            return;
        }
        
        const holdingCards = document.querySelectorAll('.holding-card, div.holding-card, *[class*="holding-card"], .stock-item-card, *[class*="stock-item-card"], .investment-form, *[id*="Form"]');
        console.log(`找到 ${holdingCards.length} 個持股卡片`);
        
        holdingCards.forEach((element, index) => {
            console.log(`應用樣式到卡片 ${index + 1}:`, element.className, element.id);
            
            // 強制設置樣式
            element.style.setProperty('background', config.background, 'important');
            element.style.setProperty('border', config.border, 'important');
            element.style.setProperty('border-radius', config.borderRadius, 'important');
            element.style.setProperty('box-shadow', config.boxShadow, 'important');
            
            console.log(`卡片 ${index + 1} 樣式已應用`);
        });
        
        console.log('✅ 測試完成');
    };
    
    // 立即執行調試
    setTimeout(() => {
        console.log('🔍 執行持股卡片調試...');
        debugHoldingCards();
        
        // 如果是夢幻粉色主題，強制測試
        if (getCurrentTheme() === 'dreamyPink') {
            setTimeout(() => testHoldingCardStyles('dreamyPink'), 1000);
        }
    }, 2000);
    
    // 監聽主題變化
    const originalApplyTheme = window.applyTheme;
    if (originalApplyTheme) {
        window.applyTheme = function(themeId) {
            originalApplyTheme(themeId);
            
            // 應用主題特定的持股卡片樣式
            setTimeout(() => applyThemeSpecificHoldingCardStyles(themeId), 400);
            
            // 夢幻粉色主題的特殊處理
            if (themeId === 'dreamyPink') {
                setTimeout(applyDreamyPinkBackground, 100);
                setTimeout(applyDreamyPinkBudgetStyles, 200);
                setTimeout(applyDreamyPinkDailyDetailsStyles, 300);
            }
        };
    }
    
    // 當前主題檢查
    if (getCurrentTheme() === 'dreamyPink') {
        setTimeout(applyDreamyPinkBackground, 500);
        setTimeout(applyDreamyPinkBudgetStyles, 600);
        setTimeout(applyDreamyPinkDailyDetailsStyles, 700);
        setTimeout(applyThemeSpecificHoldingCardStyles('dreamyPink'), 800);
    }
    
    console.log('💙 夢幻藍色花卉主題系統初始化完成');
    console.log('📋 主題ID: dreamyPink');
    console.log('🎨 主題名稱: 夢幻藍色花卉');
    console.log('💙 按鈕圖標: 🌸');
    console.log('🌸 預覽: 藍色花卉漸層');
    
})();

// 深色優雅主題的特殊運算符號樣式應用函數
window.applyDeepElegantOperatorStyles = function() {
    if (document.documentElement.getAttribute('data-theme') === 'deepElegant') {
        // 查找所有運算符號按鈕
        const operatorButtons = document.querySelectorAll(
            'button[class*="operator"], ' +
            'button[class*="plus"], ' +
            'button[class*="minus"], ' +
            'button[class*="multiply"], ' +
            'button[class*="divide"], ' +
            'button[class*="equals"], ' +
            'button[class*="clear"], ' +
            'button[class*="decimal"], ' +
            'button[class*="percent"], ' +
            '.operator, .operator-btn, .calc-operator, .math-operator, .operation-btn, ' +
            '.plus, .minus, .multiply, .divide, .equals, .clear, .decimal, .percent'
        );
        
        console.log(`🔍 找到 ${operatorButtons.length} 個運算符號按鈕`);
        
        operatorButtons.forEach((button, index) => {
            // 獲取按鈕文字
            const buttonText = button.textContent || button.innerText || '';
            const operatorSymbol = buttonText.trim();
            
            // 設置紫色背景
            button.style.setProperty('background', 'linear-gradient(135deg, #4a3c8c 0%, #2d1b69 50%, #4a3c8c 100%)', 'important');
            button.style.setProperty('border', '2px solid rgba(74, 60, 140, 0.4)', 'important');
            button.style.setProperty('border-radius', '12px', 'important');
            button.style.setProperty('box-shadow', '0 4px 20px rgba(74, 60, 140, 0.3)', 'important');
            button.style.setProperty('backdrop-filter', 'blur(10px)', 'important');
            button.style.setProperty('color', 'transparent', 'important');
            button.style.setProperty('font-family', 'var(--font-secondary)', 'important');
            button.style.setProperty('font-weight', '700', 'important');
            button.style.setProperty('text-shadow', '0 2px 4px rgba(255, 215, 0, 0.4)', 'important');
            button.style.setProperty('filter', 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.4))', 'important');
            button.style.setProperty('position', 'relative', 'important');
            button.style.setProperty('overflow', 'hidden', 'important');
            button.style.setProperty('z-index', '10', 'important');
            
            // 設置data-operator屬性
            button.setAttribute('data-operator', operatorSymbol);
            
            // 設置懸停效果
            button.addEventListener('mouseenter', function() {
                this.style.setProperty('background', 'linear-gradient(135deg, #4a3c8c 0%, #1a1f3a 50%, #4a3c8c 100%)', 'important');
                this.style.setProperty('transform', 'translateY(-2px) scale(1.05)', 'important');
                this.style.setProperty('box-shadow', '0 8px 32px rgba(74, 60, 140, 0.4)', 'important');
                this.style.setProperty('border-color', 'rgba(255, 215, 0, 0.6)', 'important');
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.setProperty('background', 'linear-gradient(135deg, #4a3c8c 0%, #2d1b69 50%, #4a3c8c 100%)', 'important');
                this.style.setProperty('transform', 'translateY(0) scale(1)', 'important');
                this.style.setProperty('box-shadow', '0 4px 20px rgba(74, 60, 140, 0.3)', 'important');
                this.style.setProperty('border-color', 'rgba(74, 60, 140, 0.4)', 'important');
            });
            
            // 設置點擊效果
            button.addEventListener('mousedown', function() {
                this.style.setProperty('transform', 'translateY(-1px) scale(0.95)', 'important');
                this.style.setProperty('box-shadow', '0 4px 16px rgba(74, 60, 140, 0.3)', 'important');
            });
            
            button.addEventListener('mouseup', function() {
                this.style.setProperty('transform', 'translateY(-2px) scale(1.05)', 'important');
                this.style.setProperty('box-shadow', '0 8px 32px rgba(74, 60, 140, 0.4)', 'important');
            });
            
            console.log(`✅ 運算符號按鈕 ${index + 1} 樣式已應用: ${operatorSymbol}`);
        });
        
        // 創建金色文字的偽元素
        const style = document.createElement('style');
        style.textContent = `
            [data-theme="deepElegant"] button[data-operator]::before {
                content: attr(data-operator) !important;
                background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%) !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
                color: transparent !important;
                font-family: var(--font-secondary) !important;
                font-weight: 700 !important;
                text-shadow: 0 2px 4px rgba(255, 215, 0, 0.4) !important;
                filter: drop-shadow(0 2px 4px rgba(255, 215, 0, 0.4)) !important;
                position: absolute !important;
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                z-index: 2 !important;
                pointer-events: none !important;
            }
        `;
        document.head.appendChild(style);
        
        console.log('✅ 深色優雅主題運算符號樣式已應用');
    }
};

// 強制股票名字金色文字 - 覆蓋所有可能的樣式
window.forceStockNameGoldText = function() {
    console.log('🔥 強制應用股票名字金色文字...');
    
    // 查找所有可能的股票名字元素
    const selectors = [
        '.stock-name',
        '.stock-code', 
        '.modal-stock-name',
        '.modal-stock-code',
        '#stockDetailName',
        '#stockDetailCode'
    ];
    
    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        console.log(`📊 ${selector}: 找到 ${elements.length} 個元素`);
        
        elements.forEach((element, index) => {
            // 強制設置內聯樣式，覆蓋所有其他樣式
            element.style.cssText = `
                background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%) !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
                color: transparent !important;
                font-family: var(--font-secondary) !important;
                font-weight: 600 !important;
                font-size: 1.1em !important;
                text-shadow: 0 2px 4px rgba(255, 215, 0, 0.3) !important;
                filter: drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3)) !important;
                position: relative !important;
                z-index: 2 !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            `;
            
            console.log(`✅ ${selector} 元素 ${index + 1} 已強制設置金色文字: "${element.textContent}"`);
        });
    });
    
    // 添加全局樣式規則
    const style = document.createElement('style');
    style.textContent = `
        .stock-name, .stock-code, .modal-stock-name, .modal-stock-code,
        #stockDetailName, #stockDetailCode {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
            color: transparent !important;
            font-family: var(--font-secondary) !important;
            font-weight: 600 !important;
            text-shadow: 0 2px 4px rgba(255, 215, 0, 0.3) !important;
            filter: drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3)) !important;
            position: relative !important;
            z-index: 2 !important;
        }
        
        /* 覆蓋所有可能的白色文字樣式 */
        .stock-name *, .stock-code *, .modal-stock-name *, .modal-stock-code *,
        #stockDetailName *, #stockDetailCode * {
            color: transparent !important;
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ 強制股票名字金色文字完成');
};
window.testDirectStockNameGold = function() {
    console.log('🔍 直接測試股票名字金色文字效果...');
    
    // 查找股票名字元素
    const stockNameElement = document.getElementById('stockDetailName');
    const stockCodeElement = document.getElementById('stockDetailCode');
    
    console.log('📊 檢查特定元素:');
    console.log(`  stockDetailName: ${stockNameElement ? '找到' : '未找到'} - 內容: "${stockNameElement ? stockNameElement.textContent : 'N/A'}"`);
    console.log(`  stockDetailCode: ${stockCodeElement ? '找到' : '未找到'} - 內容: "${stockCodeElement ? stockCodeElement.textContent : 'N/A'}"`);
    
    if (stockNameElement) {
        // 直接設置金色文字
        stockNameElement.style.setProperty('background', 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)', 'important');
        stockNameElement.style.setProperty('-webkit-background-clip', 'text', 'important');
        stockNameElement.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
        stockNameElement.style.setProperty('background-clip', 'text', 'important');
        stockNameElement.style.setProperty('color', 'transparent', 'important');
        stockNameElement.style.setProperty('font-family', 'var(--font-secondary)', 'important');
        stockNameElement.style.setProperty('font-weight', '600', 'important');
        stockNameElement.style.setProperty('font-size', '1.1em', 'important');
        stockNameElement.style.setProperty('text-shadow', '0 2px 4px rgba(255, 215, 0, 0.3)', 'important');
        stockNameElement.style.setProperty('filter', 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3))', 'important');
        stockNameElement.style.setProperty('position', 'relative', 'important');
        stockNameElement.style.setProperty('z-index', '2', 'important');
        
        console.log('✅ 股票名字金色文字已直接設置');
    }
    
    if (stockCodeElement) {
        // 直接設置金色文字
        stockCodeElement.style.setProperty('background', 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)', 'important');
        stockCodeElement.style.setProperty('-webkit-background-clip', 'text', 'important');
        stockCodeElement.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
        stockCodeElement.style.setProperty('background-clip', 'text', 'important');
        stockCodeElement.style.setProperty('color', 'transparent', 'important');
        stockCodeElement.style.setProperty('font-family', 'var(--font-secondary)', 'important');
        stockCodeElement.style.setProperty('font-weight', '500', 'important');
        stockCodeElement.style.setProperty('font-size', '0.9em', 'important');
        stockCodeElement.style.setProperty('text-shadow', '0 1px 2px rgba(255, 215, 0, 0.3)', 'important');
        stockCodeElement.style.setProperty('filter', 'drop-shadow(0 1px 2px rgba(255, 215, 0, 0.3))', 'important');
        stockCodeElement.style.setProperty('position', 'relative', 'important');
        stockCodeElement.style.setProperty('z-index', '2', 'important');
        
        console.log('✅ 股票代碼金色文字已直接設置');
    }
    
    // 檢查當前主題
    const currentTheme = document.documentElement.getAttribute('data-theme');
    console.log(`🎨 當前主題: ${currentTheme}`);
    
    // 檢查CSS是否加載
    const cssLink = document.querySelector('link[href*="deep-elegant-theme"]');
    console.log(`📄 深色優雅主題CSS: ${cssLink ? '已加載' : '未加載'}`);
    
    console.log('✅ 直接測試完成');
};
window.testStockNameElements = function() {
    console.log('🔍 開始檢查股票名字元素...');
    
    // 檢查股票名字
    const stockNames = document.querySelectorAll('.stock-name');
    console.log(`📊 找到 ${stockNames.length} 個 .stock-name 元素`);
    stockNames.forEach((element, index) => {
        console.log(`  ${index + 1}. 內容: "${element.textContent}", ID: "${element.id}", 類名: "${element.className}"`);
    });
    
    // 檢查股票代碼
    const stockCodes = document.querySelectorAll('.stock-code');
    console.log(`📊 找到 ${stockCodes.length} 個 .stock-code 元素`);
    stockCodes.forEach((element, index) => {
        console.log(`  ${index + 1}. 內容: "${element.textContent}", ID: "${element.id}", 類名: "${element.className}"`);
    });
    
    // 檢查模態框股票名字
    const modalStockNames = document.querySelectorAll('.modal-stock-name');
    console.log(`📊 找到 ${modalStockNames.length} 個 .modal-stock-name 元素`);
    modalStockNames.forEach((element, index) => {
        console.log(`  ${index + 1}. 內容: "${element.textContent}", ID: "${element.id}", 類名: "${element.className}"`);
    });
    
    // 檢查模態框股票代碼
    const modalStockCodes = document.querySelectorAll('.modal-stock-code');
    console.log(`📊 找到 ${modalStockCodes.length} 個 .modal-stock-code 元素`);
    modalStockCodes.forEach((element, index) => {
        console.log(`  ${index + 1}. 內容: "${element.textContent}", ID: "${element.id}", 類名: "${element.className}"`);
    });
    
    console.log('✅ 股票名字元素檢查完成');
};
window.applyDeepElegantInvestmentStockNameStyles = function() {
    if (document.documentElement.getAttribute('data-theme') === 'deepElegant') {
        // 查找所有股票名字
        const stockNames = document.querySelectorAll('.stock-name, .modal-stock-name');
        
        stockNames.forEach((stockName, index) => {
            // 設置金色文字
            stockName.style.setProperty('background', 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)', 'important');
            stockName.style.setProperty('-webkit-background-clip', 'text', 'important');
            stockName.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
            stockName.style.setProperty('background-clip', 'text', 'important');
            stockName.style.setProperty('color', 'transparent', 'important');
            stockName.style.setProperty('font-family', 'var(--font-secondary)', 'important');
            stockName.style.setProperty('font-weight', '600', 'important');
            stockName.style.setProperty('font-size', '1.1em', 'important');
            stockName.style.setProperty('text-shadow', '0 2px 4px rgba(255, 215, 0, 0.3)', 'important');
            stockName.style.setProperty('filter', 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3))', 'important');
            stockName.style.setProperty('margin', '4px 0', 'important');
            stockName.style.setProperty('padding', '2px 4px', 'important');
            stockName.style.setProperty('position', 'relative', 'important');
            stockName.style.setProperty('z-index', '2', 'important');
            stockName.style.setProperty('transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 'important');
            
            console.log(`✅ 股票名字 ${index + 1} 樣式已應用: ${stockName.textContent}`);
        });
        
        // 查找所有股票代碼
        const stockCodes = document.querySelectorAll('.stock-code, .modal-stock-code');
        
        stockCodes.forEach((stockCode, index) => {
            // 設置金色文字
            stockCode.style.setProperty('background', 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)', 'important');
            stockCode.style.setProperty('-webkit-background-clip', 'text', 'important');
            stockCode.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
            stockCode.style.setProperty('background-clip', 'text', 'important');
            stockCode.style.setProperty('color', 'transparent', 'important');
            stockCode.style.setProperty('font-family', 'var(--font-secondary)', 'important');
            stockCode.style.setProperty('font-weight', '500', 'important');
            stockCode.style.setProperty('font-size', '0.9em', 'important');
            stockCode.style.setProperty('text-shadow', '0 1px 2px rgba(255, 215, 0, 0.3)', 'important');
            stockCode.style.setProperty('filter', 'drop-shadow(0 1px 2px rgba(255, 215, 0, 0.3))', 'important');
            stockCode.style.setProperty('margin', '2px 0', 'important');
            stockCode.style.setProperty('padding', '1px 2px', 'important');
            stockCode.style.setProperty('position', 'relative', 'important');
            stockCode.style.setProperty('z-index', '2', 'important');
            stockCode.style.setProperty('transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 'important');
            
            console.log(`✅ 股票代碼 ${index + 1} 樣式已應用: ${stockCode.textContent}`);
        });
        
        console.log('✅ 深色優雅主題投資專區股票名字樣式已應用');
    }
};
window.applyDeepElegantWalletBudgetCardStyles = function() {
    if (document.documentElement.getAttribute('data-theme') === 'deepElegant') {
        // 查找所有錢包預算卡片
        const walletBudgetCards = document.querySelectorAll('.wallet-budget-card, .wallet-budget-item, .wallet-budget-category, .wallet-budget-overview, .wallet-budget-summary, .wallet-budget-progress, .wallet-budget-analysis, .wallet-budget-planning, .wallet-budget-tracking, .wallet-budget-control, .wallet-budget-limit, .wallet-budget-allocation, .wallet-budget-report');
        
        walletBudgetCards.forEach((card, index) => {
            // 設置紫色背景
            card.style.setProperty('background', 'linear-gradient(135deg, #4a3c8c 0%, #2d1b69 50%, #4a3c8c 100%)', 'important');
            card.style.setProperty('border', '2px solid rgba(74, 60, 140, 0.6)', 'important');
            card.style.setProperty('border-radius', '16px', 'important');
            card.style.setProperty('box-shadow', '0 8px 32px rgba(74, 60, 140, 0.4)', 'important');
            card.style.setProperty('backdrop-filter', 'blur(15px)', 'important');
            card.style.setProperty('color', 'var(--color-text-primary)', 'important');
            card.style.setProperty('font-family', 'var(--font-secondary)', 'important');
            card.style.setProperty('font-weight', '500', 'important');
            card.style.setProperty('text-shadow', '0 1px 2px rgba(255, 215, 0, 0.3)', 'important');
            card.style.setProperty('filter', 'drop-shadow(0 1px 2px rgba(255, 215, 0, 0.3))', 'important');
            card.style.setProperty('transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 'important');
            card.style.setProperty('position', 'relative', 'important');
            card.style.setProperty('overflow', 'hidden', 'important');
            card.style.setProperty('z-index', '10', 'important');
            
            // 查找標題並設置金色文字
            const titles = card.querySelectorAll('h1, h2, h3, h4, h5, h6');
            titles.forEach((title) => {
                title.style.setProperty('background', 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)', 'important');
                title.style.setProperty('-webkit-background-clip', 'text', 'important');
                title.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
                title.style.setProperty('background-clip', 'text', 'important');
                title.style.setProperty('color', 'transparent', 'important');
                title.style.setProperty('font-family', 'var(--font-secondary)', 'important');
                title.style.setProperty('font-weight', '600', 'important');
                title.style.setProperty('text-shadow', '0 2px 4px rgba(255, 215, 0, 0.3)', 'important');
                title.style.setProperty('filter', 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3))', 'important');
                title.style.setProperty('margin', '8px 0', 'important');
                title.style.setProperty('padding', '4px 8px', 'important');
                title.style.setProperty('position', 'relative', 'important');
                title.style.setProperty('z-index', '2', 'important');
            });
            
            // 查找內容文字並設置金色文字
            const contents = card.querySelectorAll('*');
            contents.forEach((content) => {
                // 跳過標題和表單元素
                if (!content.matches('h1, h2, h3, h4, h5, h6, button, input, select, textarea')) {
                    content.style.setProperty('background', 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)', 'important');
                    content.style.setProperty('-webkit-background-clip', 'text', 'important');
                    content.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
                    content.style.setProperty('background-clip', 'text', 'important');
                    content.style.setProperty('color', 'transparent', 'important');
                    content.style.setProperty('font-family', 'var(--font-secondary)', 'important');
                    content.style.setProperty('font-weight', '500', 'important');
                    content.style.setProperty('text-shadow', '0 1px 2px rgba(255, 215, 0, 0.3)', 'important');
                    content.style.setProperty('filter', 'drop-shadow(0 1px 2px rgba(255, 215, 0, 0.3))', 'important');
                    content.style.setProperty('position', 'relative', 'important');
                    content.style.setProperty('z-index', '2', 'important');
                }
            });
            
            console.log(`✅ 錢包預算卡片 ${index + 1} 樣式已應用`);
        });
        
        console.log('✅ 深色優雅主題錢包預算卡片樣式已應用');
    }
};
window.applyDeepElegantBudgetPageStyles = function() {
    if (document.documentElement.getAttribute('data-theme') === 'deepElegant') {
        // 查找預算設定頁面
        const budgetPage = document.querySelector('.wallet-budget');
        if (budgetPage) {
            console.log('🔍 找到預算設定頁面');
            
            // 設置頁面背景
            budgetPage.style.setProperty('background', '#9b88d1', 'important');
            budgetPage.style.setProperty('border', '2px solid rgba(74, 60, 140, 0.6)', 'important');
            budgetPage.style.setProperty('border-radius', '16px', 'important');
            budgetPage.style.setProperty('box-shadow', '0 8px 32px rgba(74, 60, 140, 0.4)', 'important');
            budgetPage.style.setProperty('backdrop-filter', 'blur(15px)', 'important');
            budgetPage.style.setProperty('color', 'var(--color-text-primary)', 'important');
            budgetPage.style.setProperty('font-family', 'var(--font-secondary)', 'important');
            budgetPage.style.setProperty('font-weight', '500', 'important');
            budgetPage.style.setProperty('text-shadow', '0 1px 2px rgba(255, 215, 0, 0.3)', 'important');
            budgetPage.style.setProperty('filter', 'drop-shadow(0 1px 2px rgba(255, 215, 0, 0.3))', 'important');
            budgetPage.style.setProperty('transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 'important');
            budgetPage.style.setProperty('position', 'relative', 'important');
            budgetPage.style.setProperty('overflow', 'hidden', 'important');
            budgetPage.style.setProperty('z-index', '10', 'important');
            
            console.log('✅ 預算設定頁面背景已應用');
        }
        
        // 查找預算設定頁面標題
        const budgetTitles = document.querySelectorAll('.wallet-budget h1, .wallet-budget h2, .wallet-budget h3, .wallet-budget h4, .wallet-budget h5, .wallet-budget h6, .wallet-budget .budget-title');
        budgetTitles.forEach((title, index) => {
            title.style.setProperty('background', 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)', 'important');
            title.style.setProperty('-webkit-background-clip', 'text', 'important');
            title.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
            title.style.setProperty('background-clip', 'text', 'important');
            title.style.setProperty('color', 'transparent', 'important');
            title.style.setProperty('font-family', 'var(--font-secondary)', 'important');
            title.style.setProperty('font-weight', '600', 'important');
            title.style.setProperty('text-shadow', '0 2px 4px rgba(255, 215, 0, 0.3)', 'important');
            title.style.setProperty('filter', 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3))', 'important');
            title.style.setProperty('margin', '8px 0', 'important');
            title.style.setProperty('padding', '4px 8px', 'important');
            title.style.setProperty('position', 'relative', 'important');
            title.style.setProperty('z-index', '2', 'important');
            
            console.log(`✅ 預算設定頁面標題 ${index + 1} 樣式已應用`);
        });
        
        // 查找預算設定頁面內容文字
        const budgetContents = document.querySelectorAll('.wallet-budget *');
        budgetContents.forEach((content, index) => {
            // 跳過標題和按鈕
            if (!content.matches('h1, h2, h3, h4, h5, h6, button, input, select, textarea')) {
                content.style.setProperty('background', 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)', 'important');
                content.style.setProperty('-webkit-background-clip', 'text', 'important');
                content.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
                content.style.setProperty('background-clip', 'text', 'important');
                content.style.setProperty('color', 'transparent', 'important');
                content.style.setProperty('font-family', 'var(--font-secondary)', 'important');
                content.style.setProperty('font-weight', '500', 'important');
                content.style.setProperty('text-shadow', '0 1px 2px rgba(255, 215, 0, 0.3)', 'important');
                content.style.setProperty('filter', 'drop-shadow(0 1px 2px rgba(255, 215, 0, 0.3))', 'important');
                content.style.setProperty('position', 'relative', 'important');
                content.style.setProperty('z-index', '2', 'important');
            }
        });
        
        // 查找預算摘要
        const budgetSummary = document.querySelector('.wallet-budget .budget-summary');
        if (budgetSummary) {
            budgetSummary.style.setProperty('background', '#9b88d1', 'important');
            budgetSummary.style.setProperty('border', '2px solid rgba(74, 60, 140, 0.6)', 'important');
            budgetSummary.style.setProperty('border-radius', '16px', 'important');
            budgetSummary.style.setProperty('box-shadow', '0 8px 32px rgba(74, 60, 140, 0.4)', 'important');
            budgetSummary.style.setProperty('backdrop-filter', 'blur(15px)', 'important');
            budgetSummary.style.setProperty('color', 'var(--color-text-primary)', 'important');
            budgetSummary.style.setProperty('font-family', 'var(--font-secondary)', 'important');
            budgetSummary.style.setProperty('font-weight', '500', 'important');
            budgetSummary.style.setProperty('text-shadow', '0 1px 2px rgba(255, 215, 0, 0.3)', 'important');
            budgetSummary.style.setProperty('filter', 'drop-shadow(0 1px 2px rgba(255, 215, 0, 0.3))', 'important');
            budgetSummary.style.setProperty('transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 'important');
            budgetSummary.style.setProperty('position', 'relative', 'important');
            budgetSummary.style.setProperty('overflow', 'hidden', 'important');
            budgetSummary.style.setProperty('z-index', '10', 'important');
            
            console.log('✅ 預算摘要樣式已應用');
        }
        
        // 查找預算摘要項目
        const budgetSummaryItems = document.querySelectorAll('.wallet-budget .budget-summary-item, .wallet-budget .budget-summary-item *');
        budgetSummaryItems.forEach((item, index) => {
            item.style.setProperty('background', 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)', 'important');
            item.style.setProperty('-webkit-background-clip', 'text', 'important');
            item.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
            item.style.setProperty('background-clip', 'text', 'important');
            item.style.setProperty('color', 'transparent', 'important');
            item.style.setProperty('font-family', 'var(--font-secondary)', 'important');
            item.style.setProperty('font-weight', '500', 'important');
            item.style.setProperty('text-shadow', '0 1px 2px rgba(255, 215, 0, 0.3)', 'important');
            item.style.setProperty('filter', 'drop-shadow(0 1px 2px rgba(255, 215, 0, 0.3))', 'important');
            item.style.setProperty('position', 'relative', 'important');
            item.style.setProperty('z-index', '2', 'important');
            
            console.log(`✅ 預算摘要項目 ${index + 1} 樣式已應用`);
        });
        
        // 查找預算列表
        const budgetList = document.querySelector('.wallet-budget .budget-list');
        if (budgetList) {
            budgetList.style.setProperty('background', '#9b88d1', 'important');
            budgetList.style.setProperty('border', '2px solid rgba(74, 60, 140, 0.6)', 'important');
            budgetList.style.setProperty('border-radius', '16px', 'important');
            budgetList.style.setProperty('box-shadow', '0 8px 32px rgba(74, 60, 140, 0.4)', 'important');
            budgetList.style.setProperty('backdrop-filter', 'blur(15px)', 'important');
            budgetList.style.setProperty('color', 'var(--color-text-primary)', 'important');
            budgetList.style.setProperty('font-family', 'var(--font-secondary)', 'important');
            budgetList.style.setProperty('font-weight', '500', 'important');
            budgetList.style.setProperty('text-shadow', '0 1px 2px rgba(255, 215, 0, 0.3)', 'important');
            budgetList.style.setProperty('filter', 'drop-shadow(0 1px 2px rgba(255, 215, 0, 0.3))', 'important');
            budgetList.style.setProperty('transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 'important');
            budgetList.style.setProperty('position', 'relative', 'important');
            budgetList.style.setProperty('overflow', 'hidden', 'important');
            budgetList.style.setProperty('z-index', '10', 'important');
            
            console.log('✅ 預算列表樣式已應用');
        }
        
        // 查找預算列表項目
        const budgetListItems = document.querySelectorAll('.wallet-budget .budget-list-item, .wallet-budget .budget-list-item *');
        budgetListItems.forEach((item, index) => {
            item.style.setProperty('background', 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)', 'important');
            item.style.setProperty('-webkit-background-clip', 'text', 'important');
            item.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
            item.style.setProperty('background-clip', 'text', 'important');
            item.style.setProperty('color', 'transparent', 'important');
            item.style.setProperty('font-family', 'var(--font-secondary)', 'important');
            item.style.setProperty('font-weight', '500', 'important');
            item.style.setProperty('text-shadow', '0 1px 2px rgba(255, 215, 0, 0.3)', 'important');
            item.style.setProperty('filter', 'drop-shadow(0 1px 2px rgba(255, 215, 0, 0.3))', 'important');
            item.style.setProperty('position', 'relative', 'important');
            item.style.setProperty('z-index', '2', 'important');
            
            console.log(`✅ 預算列表項目 ${index + 1} 樣式已應用`);
        });
        
        console.log('✅ 深色優雅主題預算設定頁面樣式已應用');
    }
};

// 主題切換時自動應用運算符號、預算設定頁面、錢包預算卡片和投資專區股票名字樣式
const originalApplyThemeSpecificHoldingCardStyles = window.applyThemeSpecificHoldingCardStyles;
window.applyThemeSpecificHoldingCardStyles = function(themeId) {
    // 調用原始函數
    if (originalApplyThemeSpecificHoldingCardStyles) {
        originalApplyThemeSpecificHoldingCardStyles(themeId);
    }
    
    // 如果是深色優雅主題，應用運算符號、預算設定頁面、錢包預算卡片和投資專區股票名字樣式
    if (themeId === 'deepElegant') {
        setTimeout(() => {
            applyDeepElegantOperatorStyles();
            applyDeepElegantBudgetPageStyles();
            applyDeepElegantWalletBudgetCardStyles();
            applyDeepElegantInvestmentStockNameStyles();
        }, 100);
    }
};

// 立即執行股票名字金色文字測試（不等待主題）
setTimeout(() => {
    console.log('🔍 立即測試股票名字金色文字...');
    testDirectStockNameGold();
}, 1000);

// 頁面加載完成時檢查主題並應用樣式
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'deepElegant') {
            applyDeepElegantOperatorStyles();
            applyDeepElegantBudgetPageStyles();
            applyDeepElegantWalletBudgetCardStyles();
            applyDeepElegantInvestmentStockNameStyles();
        }
        
        // 無論什麼主題，都測試一下股票名字元素
        console.log('🔍 頁面加載完成，檢查股票名字元素...');
        testDirectStockNameGold();
    }, 500);
});

// 監聽主題變化
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
            const newTheme = document.documentElement.getAttribute('data-theme');
            if (newTheme === 'deepElegant') {
                setTimeout(() => {
                    applyDeepElegantOperatorStyles();
                    applyDeepElegantBudgetPageStyles();
                    applyDeepElegantWalletBudgetCardStyles();
                    applyDeepElegantInvestmentStockNameStyles();
                }, 100);
            }
        }
    });
});

observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
});
