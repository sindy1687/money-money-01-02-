/**
 * 股票投資分頁系統 JavaScript
 * 處理分頁切換、數據載入和動態更新
 */

class StockInvestmentTabs {
    constructor() {
        this.currentTab = 'portfolio';
        this.data = {
            portfolio: null,
            holdings: [],
            goals: [],
            analysis: null
        };
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadInitialData();
        this.setupKeyboardNavigation();
    }

    bindEvents() {
        // 綁定分頁按鈕事件
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const tabName = this.getTabNameFromButton(e.currentTarget);
                this.switchTab(tabName);
            });
        });

        // 綁定窗口大小變化事件
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    getTabNameFromButton(button) {
        const onclick = button.getAttribute('onclick');
        const match = onclick.match(/switchTab\('([^']+)'\)/);
        return match ? match[1] : null;
    }

    switchTab(tabName) {
        if (this.currentTab === tabName) return;

        // 移除所有活動狀態
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // 設置新的活動狀態
        const activeButton = document.querySelector(`[onclick="switchTab('${tabName}')"]`);
        const activeContent = document.getElementById(tabName);

        if (activeButton && activeContent) {
            activeButton.classList.add('active');
            activeContent.classList.add('active');
            this.currentTab = tabName;

            // 載入對應的數據
            this.loadTabData(tabName);
            
            // 觸發分頁切換事件
            this.onTabSwitch(tabName);
        }
    }

    onTabSwitch(tabName) {
        console.log(`切換到分頁: ${tabName}`);
        
        // 可以在這裡添加分頁特定的邏輯
        switch (tabName) {
            case 'portfolio':
                this.updatePortfolioDisplay();
                break;
            case 'holdings':
                this.updateHoldingsDisplay();
                break;
            case 'goals':
                this.updateGoalsDisplay();
                break;
            case 'analysis':
                this.updateAnalysisDisplay();
                break;
        }
    }

    loadTabData(tabName) {
        // 模擬數據載入
        switch (tabName) {
            case 'portfolio':
                this.loadPortfolioData();
                break;
            case 'holdings':
                this.loadHoldingsData();
                break;
            case 'goals':
                this.loadGoalsData();
                break;
            case 'analysis':
                this.loadAnalysisData();
                break;
        }
    }

    loadInitialData() {
        // 載入初始數據
        this.loadPortfolioData();
        this.loadHoldingsData();
        this.loadGoalsData();
        this.loadAnalysisData();
    }

    loadPortfolioData() {
        // 模擬投資組合數據
        this.data.portfolio = {
            totalValue: 1250000,
            totalGain: 125000,
            totalGainPercent: 11.1,
            riskLevel: '中等風險',
            riskScore: 45,
            diversificationScore: 72,
            diversificationLevel: '良好',
            sharpeRatio: 1.85
        };
    }

    loadHoldingsData() {
        // 模擬持股數據
        this.data.holdings = [
            {
                symbol: '2330',
                name: '台積電',
                quantity: 1000,
                costPrice: 500,
                currentPrice: 600,
                gain: 100000,
                gainPercent: 20.0
            },
            {
                symbol: '2317',
                name: '鴻海',
                quantity: 2000,
                costPrice: 100,
                currentPrice: 120,
                gain: 40000,
                gainPercent: 20.0
            },
            {
                symbol: '0056',
                name: '高股息ETF',
                quantity: 5000,
                costPrice: 28,
                currentPrice: 30,
                gain: 10000,
                gainPercent: 7.1
            }
        ];
    }

    loadGoalsData() {
        // 模擬目標數據
        this.data.goals = [
            {
                id: 'retirement',
                name: '退休基金',
                icon: '🎯',
                targetAmount: 10000000,
                currentAmount: 3500000,
                progress: 35,
                status: 'on-track',
                statusText: '軌道上'
            },
            {
                id: 'education',
                name: '教育基金',
                icon: '🎓',
                targetAmount: 2000000,
                currentAmount: 560000,
                progress: 28,
                status: 'on-track',
                statusText: '軌道上'
            },
            {
                id: 'house',
                name: '購屋基金',
                icon: '🏠',
                targetAmount: 5000000,
                currentAmount: 750000,
                progress: 15,
                status: 'need-improvement',
                statusText: '需要加強'
            }
        ];
    }

    loadAnalysisData() {
        // 分析數據與投資組合數據相同
        this.data.analysis = this.data.portfolio;
    }

    updatePortfolioDisplay() {
        if (!this.data.portfolio) return;

        const portfolio = this.data.portfolio;
        
        // 更新投資組合指標
        this.updateMetricCard('💰', '總市值', `NT$${portfolio.totalValue.toLocaleString()}`);
        this.updateMetricCard('📊', '總損益', `${portfolio.totalGain >= 0 ? '+' : ''}NT$${portfolio.totalGain.toLocaleString()} (${portfolio.totalGainPercent.toFixed(1)}%)`, portfolio.totalGain >= 0);
        this.updateMetricCard('⚠️', '風險等級', `${portfolio.riskLevel} (${portfolio.riskScore}分)`);
        this.updateMetricCard('🌍', '分散度分數', `${portfolio.diversificationScore}分 (${portfolio.diversificationLevel})`);
        this.updateMetricCard('📈', '夏普比率', portfolio.sharpeRatio.toFixed(2));

        // 更新目標追蹤
        this.updateGoalsList();
    }

    updateHoldingsDisplay() {
        if (!this.data.holdings || this.data.holdings.length === 0) return;

        const tbody = document.querySelector('#holdings .holdings-table tbody');
        if (!tbody) return;

        tbody.innerHTML = this.data.holdings.map(holding => `
            <tr>
                <td class="stock-symbol">${holding.symbol}</td>
                <td class="stock-name">${holding.name}</td>
                <td>${holding.quantity.toLocaleString()}</td>
                <td>NT$${holding.costPrice}</td>
                <td>NT$${holding.currentPrice}</td>
                <td class="${holding.gain >= 0 ? 'gain-positive' : 'gain-negative'}">
                    ${holding.gain >= 0 ? '+' : ''}NT$${holding.gain.toLocaleString()}
                </td>
                <td class="${holding.gainPercent >= 0 ? 'gain-positive' : 'gain-negative'}">
                    ${holding.gainPercent >= 0 ? '+' : ''}${holding.gainPercent.toFixed(1)}%
                </td>
            </tr>
        `).join('');
    }

    updateGoalsDisplay() {
        this.updateGoalsList(true); // 詳細模式
    }

    updateAnalysisDisplay() {
        if (!this.data.analysis) return;

        const analysis = this.data.analysis;
        
        // 更新分析指標
        this.updateMetricCard('💰', '總市值', `NT$${analysis.totalValue.toLocaleString()}`);
        this.updateMetricCard('📊', '總損益', `${analysis.totalGain >= 0 ? '+' : ''}NT$${analysis.totalGain.toLocaleString()} (${analysis.totalGainPercent.toFixed(1)}%)`, analysis.totalGain >= 0);
        this.updateMetricCard('⚠️', '風險等級', `${analysis.riskLevel} (${analysis.riskScore}分)`);
        this.updateMetricCard('🌍', '分散度分數', `${analysis.diversificationScore}分 (${analysis.diversificationLevel})`);
        this.updateMetricCard('📈', '夏普比率', analysis.sharpeRatio.toFixed(2));

        // 更新目標追蹤
        this.updateGoalsList();
    }

    updateMetricCard(icon, label, value, isPositive = null) {
        // 查找對應的指標卡片
        const cards = document.querySelectorAll('.metric-card');
        for (let card of cards) {
            const iconElement = card.querySelector('.metric-icon');
            const labelElement = card.querySelector('.metric-label');
            
            if (iconElement && iconElement.textContent === icon && labelElement && labelElement.textContent === label) {
                const valueElement = card.querySelector('.metric-value');
                if (valueElement) {
                    valueElement.textContent = value;
                    if (isPositive !== null) {
                        valueElement.className = `metric-value ${isPositive ? 'positive' : 'negative'}`;
                    }
                }
                break;
            }
        }
    }

    updateGoalsList(detailed = false) {
        if (!this.data.goals || this.data.goals.length === 0) return;

        const goalLists = document.querySelectorAll('.goal-list');
        goalLists.forEach(goalList => {
            goalList.innerHTML = this.data.goals.map(goal => {
                const statusClass = this.getStatusClass(goal.status);
                
                if (detailed) {
                    return `
                        <div class="goal-item">
                            <div class="goal-icon">${goal.icon}</div>
                            <div class="goal-content">
                                <div class="goal-name">${goal.name}</div>
                                <div class="goal-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${goal.progress}%"></div>
                                    </div>
                                    <span class="progress-text">${goal.progress}%</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                                    <span style="color: #6b7280;">目標: NT$${goal.targetAmount.toLocaleString()}</span>
                                    <span style="color: ${goal.progress >= 50 ? '#059669' : '#d97706'}; font-weight: 500;">當前: NT$${goal.currentAmount.toLocaleString()}</span>
                                </div>
                                <span class="goal-status ${statusClass}">${goal.statusText}</span>
                            </div>
                        </div>
                    `;
                } else {
                    return `
                        <div class="goal-item">
                            <div class="goal-icon">${goal.icon}</div>
                            <div class="goal-content">
                                <div class="goal-name">${goal.name}</div>
                                <div class="goal-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${goal.progress}%"></div>
                                    </div>
                                    <span class="progress-text">${goal.progress}%</span>
                                </div>
                                <span class="goal-status ${statusClass}">${goal.statusText}</span>
                            </div>
                        </div>
                    `;
                }
            }).join('');
        });
    }

    getStatusClass(status) {
        const statusClasses = {
            'on-track': 'status-on-track',
            'need-improvement': 'status-need-improvement',
            'critical': 'status-critical'
        };
        return statusClasses[status] || 'status-need-improvement';
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
            const activeButton = document.querySelector('.tab-button.active');
            const currentIndex = tabButtons.indexOf(activeButton);
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                const prevTab = tabButtons[currentIndex - 1];
                const tabName = this.getTabNameFromButton(prevTab);
                this.switchTab(tabName);
                e.preventDefault();
            } else if (e.key === 'ArrowRight' && currentIndex < tabButtons.length - 1) {
                const nextTab = tabButtons[currentIndex + 1];
                const tabName = this.getTabNameFromButton(nextTab);
                this.switchTab(tabName);
                e.preventDefault();
            }
        });
    }

    handleResize() {
        // 處理響應式布局
        if (window.innerWidth < 768) {
            // 移動端布局調整
            console.log('切換到移動端布局');
        } else {
            // 桌面端布局調整
            console.log('切換到桌面端布局');
        }
    }

    // 公共方法：刷新數據
    refreshData() {
        this.loadInitialData();
        this.onTabSwitch(this.currentTab);
    }

    // 公共方法：獲取當前分頁
    getCurrentTab() {
        return this.currentTab;
    }

    // 公共方法：設置數據
    setData(dataType, newData) {
        this.data[dataType] = newData;
        if (this.currentTab === dataType || 
            (dataType === 'portfolio' && this.currentTab === 'portfolio') ||
            (dataType === 'portfolio' && this.currentTab === 'analysis')) {
            this.onTabSwitch(this.currentTab);
        }
    }
}

// 全域函數（保持向後兼容）
function switchTab(tabName) {
    if (window.stockInvestmentTabs) {
        window.stockInvestmentTabs.switchTab(tabName);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    window.stockInvestmentTabs = new StockInvestmentTabs();
    console.log('股票投資分頁系統已初始化');
});

// 導出類供其他模組使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StockInvestmentTabs;
}
