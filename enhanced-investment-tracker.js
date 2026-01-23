// 增強投資追蹤系統
// 提供詳細的投資分析、追蹤和管理功能

console.log('📈 載入增強投資追蹤系統...');

class EnhancedInvestmentTracker {
    constructor() {
        this.records = JSON.parse(localStorage.getItem('investmentRecords') || '[]');
        this.portfolio = this.calculatePortfolio();
        this.targets = JSON.parse(localStorage.getItem('investmentTargets') || '[]');
        this.watchlist = JSON.parse(localStorage.getItem('investmentWatchlist') || '[]');
    }

    // 計算投資組合
    calculatePortfolio() {
        const portfolio = {};
        
        this.records.forEach(record => {
            const stockCode = record.stockCode;
            
            if (!portfolio[stockCode]) {
                portfolio[stockCode] = {
                    stockCode: stockCode,
                    stockName: record.stockName || stockCode,
                    shares: 0,
                    totalCost: 0,
                    avgCost: 0,
                    buyRecords: [],
                    sellRecords: [],
                    dividendRecords: []
                };
            }
            
            if (record.type === 'buy') {
                const cost = record.price * record.shares + (record.fee || 0);
                portfolio[stockCode].shares += record.shares;
                portfolio[stockCode].totalCost += cost;
                portfolio[stockCode].avgCost = portfolio[stockCode].totalCost / portfolio[stockCode].shares;
                portfolio[stockCode].buyRecords.push(record);
            } else if (record.type === 'sell') {
                const avgCost = portfolio[stockCode].avgCost;
                portfolio[stockCode].shares -= record.shares;
                portfolio[stockCode].totalCost -= avgCost * record.shares;
                portfolio[stockCode].sellRecords.push(record);
                
                if (portfolio[stockCode].shares <= 0) {
                    portfolio[stockCode].shares = 0;
                    portfolio[stockCode].totalCost = 0;
                    portfolio[stockCode].avgCost = 0;
                }
            } else if (record.type === 'dividend') {
                portfolio[stockCode].dividendRecords.push(record);
            }
        });
        
        // 計算當前價值和損益
        Object.values(portfolio).forEach(stock => {
            const currentPrice = this.getStockCurrentPrice(stock.stockCode) || stock.avgCost || 0;
            stock.currentValue = currentPrice * stock.shares;
            stock.currentPrice = currentPrice;
            stock.unrealizedPnL = stock.currentValue - stock.totalCost;
            stock.unrealizedPnLPercent = stock.totalCost > 0 ? (stock.unrealizedPnL / stock.totalCost) * 100 : 0;
            
            // 計算已實現損益
            stock.realizedPnL = stock.sellRecords.reduce((total, sell) => {
                return total + (sell.realizedPnL || 0);
            }, 0);
            
            // 計算總損益
            stock.totalPnL = stock.unrealizedPnL + stock.realizedPnL;
            
            // 計算股利收入
            stock.dividendIncome = stock.dividendRecords.reduce((total, div) => {
                return total + (div.amount || 0);
            }, 0);
            
            // 計算年化收益率
            if (stock.buyRecords.length > 0) {
                const firstBuy = new Date(stock.buyRecords[0].date);
                const daysHeld = (Date.now() - firstBuy) / (1000 * 60 * 60 * 24);
                stock.annualizedReturn = daysHeld > 0 ? 
                    Math.pow(1 + (stock.totalPnL / stock.totalCost), 365 / daysHeld) - 1 : 0;
            }
        });
        
        return Object.values(portfolio).filter(stock => stock.shares > 0);
    }

    // 獲取股票當前價格
    getStockCurrentPrice(stockCode) {
        const stockPrices = JSON.parse(localStorage.getItem('stockCurrentPrices') || '{}');
        const priceData = stockPrices[stockCode];
        
        if (!priceData) return null;
        
        // 檢查價格是否過期（超過1天）
        const lastUpdate = new Date(priceData.timestamp);
        const now = new Date();
        const hoursDiff = (now - lastUpdate) / (1000 * 60 * 60);
        
        if (hoursDiff > 24) {
            return priceData.price || priceData.previousClose || null;
        }
        
        return priceData.price || priceData.previousClose || null;
    }

    // 生成投資組合分析報告
    generatePortfolioAnalysis() {
        const portfolio = this.portfolio;
        const totalValue = portfolio.reduce((sum, stock) => sum + stock.currentValue, 0);
        const totalCost = portfolio.reduce((sum, stock) => sum + stock.totalCost, 0);
        const totalPnL = portfolio.reduce((sum, stock) => sum + stock.totalPnL, 0);
        const totalDividend = portfolio.reduce((sum, stock) => sum + stock.dividendIncome, 0);

        const analysis = {
            summary: {
                totalStocks: portfolio.length,
                totalValue: totalValue,
                totalCost: totalCost,
                totalPnL: totalPnL,
                totalPnLPercent: totalCost > 0 ? (totalPnL / totalCost) * 100 : 0,
                totalDividend: totalDividend,
                dividendYield: totalValue > 0 ? (totalDividend / totalValue) * 100 : 0
            },
            performance: {
                bestPerformer: this.getBestPerformer(portfolio),
                worstPerformer: this.getWorstPerformer(portfolio),
                averageReturn: this.calculateAverageReturn(portfolio),
                portfolioVolatility: this.calculateVolatility(portfolio)
            },
            risk: {
                concentrationRisk: this.calculateConcentrationRisk(portfolio),
                sectorAllocation: this.calculateSectorAllocation(portfolio),
                riskScore: this.calculateRiskScore(portfolio)
            },
            targets: this.analyzeTargetProgress(),
            recommendations: this.generateRecommendations(portfolio)
        };

        return analysis;
    }

    // 獲取最佳表現股票
    getBestPerformer(portfolio) {
        if (portfolio.length === 0) return null;
        return portfolio.reduce((best, stock) => 
            stock.totalPnLPercent > (best?.totalPnLPercent || 0) ? stock : best
        );
    }

    // 獲取最差表現股票
    getWorstPerformer(portfolio) {
        if (portfolio.length === 0) return null;
        return portfolio.reduce((worst, stock) => 
            stock.totalPnLPercent < (worst?.totalPnLPercent || 0) ? stock : worst
        );
    }

    // 計算平均回報率
    calculateAverageReturn(portfolio) {
        if (portfolio.length === 0) return 0;
        const totalReturn = portfolio.reduce((sum, stock) => sum + stock.totalPnLPercent, 0);
        return totalReturn / portfolio.length;
    }

    // 計算投資組合波動性
    calculateVolatility(portfolio) {
        if (portfolio.length === 0) return 0;
        
        const returns = portfolio.map(stock => stock.totalPnLPercent);
        const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
        const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
        return Math.sqrt(variance);
    }

    // 計算集中度風險
    calculateConcentrationRisk(portfolio) {
        if (portfolio.length === 0) return 0;
        
        const totalValue = portfolio.reduce((sum, stock) => sum + stock.currentValue, 0);
        const maxHolding = Math.max(...portfolio.map(stock => stock.currentValue));
        return (maxHolding / totalValue) * 100;
    }

    // 計算產業配置
    calculateSectorAllocation(portfolio) {
        const sectors = {};
        const totalValue = portfolio.reduce((sum, stock) => sum + stock.currentValue, 0);
        
        portfolio.forEach(stock => {
            const sector = this.getSectorForStock(stock.stockCode);
            if (!sectors[sector]) {
                sectors[sector] = 0;
            }
            sectors[sector] += stock.currentValue;
        });
        
        // 轉換為百分比
        Object.keys(sectors).forEach(sector => {
            sectors[sector] = (sectors[sector] / totalValue) * 100;
        });
        
        return sectors;
    }

    // 獲取股票產業分類
    getSectorForStock(stockCode) {
        // 簡單的產業分類邏輯（可以擴展）
        if (stockCode.startsWith('00')) return '金融';
        if (stockCode.startsWith('23')) return '半導體';
        if (stockCode.startsWith('24')) return '光電';
        if (stockCode.startsWith('30')) return '傳產';
        if (stockCode.startsWith('51')) return '電子';
        if (stockCode.startsWith('99')) return 'ETF';
        return '其他';
    }

    // 計算風險分數
    calculateRiskScore(portfolio) {
        let riskScore = 0;
        
        // 集中度風險 (30%)
        riskScore += this.calculateConcentrationRisk(portfolio) * 0.3;
        
        // 波動性風險 (40%)
        riskScore += this.calculateVolatility(portfolio) * 0.4;
        
        // 產業集中度風險 (30%)
        const sectorAllocation = this.calculateSectorAllocation(portfolio);
        const maxSectorWeight = Math.max(...Object.values(sectorAllocation));
        riskScore += maxSectorWeight * 0.3;
        
        return Math.min(riskScore, 100);
    }

    // 分析目標進度
    analyzeTargetProgress() {
        const targets = this.targets;
        const progress = [];
        
        targets.forEach(target => {
            const current = this.getCurrentValueForTarget(target);
            const progressPercent = target.targetValue > 0 ? (current / target.targetValue) * 100 : 0;
            
            progress.push({
                ...target,
                currentValue: current,
                progressPercent: progressPercent,
                status: progressPercent >= 100 ? 'completed' : 
                       progressPercent >= 75 ? 'on_track' : 
                       progressPercent >= 50 ? 'behind' : 'critical'
            });
        });
        
        return progress;
    }

    // 獲取目標當前價值
    getCurrentValueForTarget(target) {
        if (target.type === 'portfolio_value') {
            return this.portfolio.reduce((sum, stock) => sum + stock.currentValue, 0);
        } else if (target.type === 'stock_value' && target.stockCode) {
            const stock = this.portfolio.find(s => s.stockCode === target.stockCode);
            return stock ? stock.currentValue : 0;
        } else if (target.type === 'dividend_income') {
            return this.portfolio.reduce((sum, stock) => sum + stock.dividendIncome, 0);
        }
        return 0;
    }

    // 生成投資建議
    generateRecommendations(portfolio) {
        const recommendations = [];
        
        // 集中度風險建議
        const concentrationRisk = this.calculateConcentrationRisk(portfolio);
        if (concentrationRisk > 40) {
            recommendations.push({
                type: 'risk',
                priority: 'high',
                title: '降低持股集中度',
                description: `您的最大持股佔比 ${concentrationRisk.toFixed(1)}%，建議分散投資以降低風險`,
                action: '考慮減持部分持股或增加其他標的'
            });
        }
        
        // 表現不佳建議
        const worstPerformer = this.getWorstPerformer(portfolio);
        if (worstPerformer && worstPerformer.totalPnLPercent < -20) {
            recommendations.push({
                type: 'performance',
                priority: 'medium',
                title: '檢視虧損持股',
                description: `${worstPerformer.stockName} 虧損 ${worstPerformer.totalPnLPercent.toFixed(1)}%`,
                action: '評估是否需要止損或長期持有'
            });
        }
        
        // 股利收益建議
        const totalDividend = portfolio.reduce((sum, stock) => sum + stock.dividendIncome, 0);
        const totalValue = portfolio.reduce((sum, stock) => sum + stock.currentValue, 0);
        const dividendYield = totalValue > 0 ? (totalDividend / totalValue) * 100 : 0;
        
        if (dividendYield < 2) {
            recommendations.push({
                type: 'income',
                priority: 'low',
                title: '考慮增加股利收益',
                description: `目前股利收益率 ${dividendYield.toFixed(2)}%`,
                action: '可考慮增加高股利股票或ETF'
            });
        }
        
        return recommendations;
    }

    // 追蹤投資目標
    addInvestmentTarget(target) {
        this.targets.push({
            ...target,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            status: 'active'
        });
        this.saveTargets();
    }

    // 保存投資目標
    saveTargets() {
        localStorage.setItem('investmentTargets', JSON.stringify(this.targets));
    }

    // 更新觀察清單
    updateWatchlist(stockCode, action = 'add') {
        if (action === 'add' && !this.watchlist.includes(stockCode)) {
            this.watchlist.push(stockCode);
        } else if (action === 'remove') {
            this.watchlist = this.watchlist.filter(code => code !== stockCode);
        }
        localStorage.setItem('investmentWatchlist', JSON.stringify(this.watchlist));
    }

    // 獲取詳細的投資歷史
    getInvestmentHistory(stockCode = null) {
        let records = this.records;
        
        if (stockCode) {
            records = records.filter(r => r.stockCode === stockCode);
        }
        
        return records.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // 計算投資統計
    getInvestmentStatistics() {
        const portfolio = this.portfolio;
        const records = this.records;
        
        const stats = {
            totalInvestments: records.length,
            totalBuys: records.filter(r => r.type === 'buy').length,
            totalSells: records.filter(r => r.type === 'sell').length,
            totalDividends: records.filter(r => r.type === 'dividend').length,
            firstInvestmentDate: records.length > 0 ? records[0].date : null,
            totalInvestedAmount: portfolio.reduce((sum, stock) => sum + stock.totalCost, 0),
            currentPortfolioValue: portfolio.reduce((sum, stock) => sum + stock.currentValue, 0),
            totalDividendIncome: portfolio.reduce((sum, stock) => sum + stock.dividendIncome, 0)
        };
        
        // 計算投資年資
        if (stats.firstInvestmentDate) {
            const firstDate = new Date(stats.firstInvestmentDate);
            const now = new Date();
            stats.investmentYears = (now - firstDate) / (1000 * 60 * 60 * 24 * 365);
        }
        
        return stats;
    }
}

// 創建全域實例
const investmentTracker = new EnhancedInvestmentTracker();

// 導出函數
window.getEnhancedPortfolioAnalysis = () => investmentTracker.generatePortfolioAnalysis();
window.getInvestmentStatistics = () => investmentTracker.getInvestmentStatistics();
window.addInvestmentTarget = (target) => investmentTracker.addInvestmentTarget(target);
window.updateInvestmentWatchlist = (stockCode, action) => investmentTracker.updateWatchlist(stockCode, action);
window.getInvestmentHistory = (stockCode) => investmentTracker.getInvestmentHistory(stockCode);
window.getInvestmentTargets = () => investmentTracker.analyzeTargetProgress();

console.log('📈 增強投資追蹤系統已載入');
console.log('💡 使用 getEnhancedPortfolioAnalysis() 獲取詳細分析');
console.log('💡 使用 getInvestmentStatistics() 獲取投資統計');
console.log('💡 使用 addInvestmentTarget() 設定投資目標');
