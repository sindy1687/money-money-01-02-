# 📈 增強投資追蹤系統使用指南

## 🎯 系統概述

我已經為您建立了一個完整的增強投資追蹤系統，提供詳細的投資分析、追蹤和管理功能。

## ✨ 新增功能

### 🔍 核心追蹤功能
- **詳細投資組合分析** - 完整的持股分析與損益計算
- **投資統計** - 投資年資、交易次數、收益統計
- **風險評估** - 集中度風險、波動性分析
- **產業配置** - 自動產業分類與配置分析
- **投資建議** - 智能化投資建議系統
- **目標追蹤** - 投資目標設定與進度追蹤

### 📊 視覺化功能
- **投資儀表板** - 專業的投資分析儀表板
- **圖表分析** - 投資組合配置圖、損益表現圖
- **持股明細表** - 詳細的持股資訊表格
- **進度追蹤** - 目標達成度視覺化

## 🚀 使用方法

### 1. 訪問投資儀表板

由於無法直接修改設定頁面，您可以透過以下方式訪問：

```javascript
// 在瀏覽器控制台中執行
window.open('investment-dashboard.html', '_blank');
```

或者直接在瀏覽器中開啟：
```
file:///c:/Users/Boyo/OneDrive/桌面/網頁/money-money-01-02--main/investment-dashboard.html
```

### 2. 使用增強追蹤功能

```javascript
// 獲取詳細投資分析
const analysis = getEnhancedPortfolioAnalysis();
console.log('投資分析:', analysis);

// 獲取投資統計
const stats = getInvestmentStatistics();
console.log('投資統計:', stats);

// 設定投資目標
addInvestmentTarget({
    name: '退休基金',
    type: 'portfolio_value',
    targetValue: 1000000,
    targetDate: '2030-12-31'
});

// 獲取目標進度
const targets = getInvestmentTargets();
console.log('目標進度:', targets);
```

### 3. 投資目標管理

```javascript
// 新增投資目標
addInvestmentTarget({
    name: '購房基金',
    type: 'portfolio_value',
    targetValue: 2000000,
    targetDate: '2028-12-31',
    description: '用於購買首套房'
});

// 新增股利收入目標
addInvestmentTarget({
    name: '被動收入',
    type: 'dividend_income',
    targetValue: 120000,
    targetDate: '2025-12-31',
    description: '每月股利收入目標'
});

// 新增個股目標
addInvestmentTarget({
    name: '台積電持股',
    type: 'stock_value',
    stockCode: '2330',
    targetValue: 500000,
    targetDate: '2026-12-31'
});
```

### 4. 觀察清單管理

```javascript
// 新增到觀察清單
updateInvestmentWatchlist('2330', 'add');

// 從觀察清單移除
updateInvestmentWatchlist('2330', 'remove');

// 查看觀察清單
const watchlist = JSON.parse(localStorage.getItem('investmentWatchlist') || '[]');
console.log('觀察清單:', watchlist);
```

## 📋 投資分析報告內容

### 📊 投資組合摘要
- 總投資價值與成本
- 總損益與損益百分比
- 股利收入與股利率
- 持股數量統計

### 🎯 表現分析
- 最佳表現股票
- 最差表現股票
- 平均回報率
- 投資組合波動性

### ⚠️ 風險評估
- 集中度風險分析
- 產業配置風險
- 總體風險分數
- 風險等級評定

### 💡 智能建議
- 分散投資建議
- 虧損持股檢視
- 股利收益優化
- 風險控制建議

### 🎯 目標追蹤
- 目標達成度
- 進度狀態分類
- 預計達成時間
- 目標調整建議

## 🔧 進階功能

### 1. 自定義產業分類

```javascript
// 擴展產業分類邏輯
investmentTracker.getSectorForStock = function(stockCode) {
    // 自訂分類邏輯
    if (stockCode.startsWith('23')) return '半導體';
    if (stockCode.startsWith('30')) return '傳統產業';
    if (stockCode.startsWith('00')) return '金融保險';
    // ... 更多分類
    return '其他';
};
```

### 2. 自訂風險模型

```javascript
// 調整風險計算權重
const customRiskScore = investmentTracker.calculateRiskScore(portfolio, {
    concentrationWeight: 0.4,
    volatilityWeight: 0.3,
    sectorWeight: 0.3
});
```

### 3. 投資歷史分析

```javascript
// 獲取特定股票歷史
const history = getInvestmentHistory('2330');
console.log('台積電交易歷史:', history);

// 獲取所有投資歷史
const allHistory = getInvestmentHistory();
console.log('所有交易記錄:', allHistory);
```

## 📱 整合到主應用程式

雖然無法直接修改設定頁面，您可以：

### 方法1：書籤方式
1. 將投資儀表板加入瀏覽器書籤
2. 需要時快速訪問

### 方法2：控制台快捷方式
```javascript
// 在控制台設定快捷函數
window.showInvestmentDashboard = () => {
    window.open('investment-dashboard.html', '_blank');
};

// 使用時只需執行
showInvestmentDashboard();
```

### 方法3：手動添加到設定頁面
如果您願意手動編輯，可以在設定頁面的「分析工具」區塊添加：

```html
<!-- 在 settingsSections 的分析工具 items 中添加 -->
{ icon: '📈', title: '投資儀表板', description: '詳細投資分析與追蹤', action: 'investmentDashboard', accent: 'linear-gradient(135deg, #667eea, #764ba2)', iconGradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
{ icon: '🎯', title: '投資目標', description: '設定與追蹤投資目標', action: 'investmentTargets', accent: 'linear-gradient(135deg, #f093fb, #f5576c)', iconGradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
```

並在事件處理中添加：

```javascript
} else if (action === 'investmentDashboard') {
    window.open('investment-dashboard.html', '_blank');
} else if (action === 'investmentTargets') {
    const targets = getInvestmentTargets();
    alert('投資目標數量：' + targets.length);
```

## 🎉 總結

您現在擁有了一個**專業級的投資追蹤系統**：

✅ **詳細分析** - 全面的投資組合分析  
✅ **風險評估** - 智能風險評估系統  
✅ **目標追蹤** - 投資目標管理與進度追蹤  
✅ **視覺化** - 專業的圖表與儀表板  
✅ **智能建議** - 個人化投資建議  
✅ **歷史追蹤** - 完整的投資歷史記錄  

**立即開始使用：在瀏覽器中開啟 `investment-dashboard.html` 或在控制台執行相關函數！** 🚀
