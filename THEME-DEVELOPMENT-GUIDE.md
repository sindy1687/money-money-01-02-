# 主題開發指南

## 📁 新的主題檔案結構

為了避免 `js/theme.js` 檔案過於龐大，我們建立了新的主題管理系統：

### 檔案組織
```
js/
├── theme.js              # 主題系統核心（保持現有主題）
└── themes-new.js         # 新主題定義模組 ⭐
```

## 🚀 如何添加新主題

### 方法一：直接編輯 `themes-new.js`

1. **開啟檔案**：`js/themes-new.js`
2. **在 `newThemes` 陣列中添加新主題**：

```javascript
const newThemes = [
    {
        id: 'yourThemeId',
        name: '主題名稱',
        icon: '🎨',
        buttonIcon: '✨',
        preview: 'url("images/theme/your-preview.jpg") center/cover',
        color: '#主色',
        category: '分類',
        backgroundImage: 'images/theme/your-bg.jpg',
        investmentCardImage: 'images/theme/your-card.jpg',
        accountingCardImage: 'images/theme/your-card.jpg',
        // ... 其他卡片圖片
    },
    // 現有的宇宙夢幻主題
    {
        id: 'cosmicDream',
        name: '宇宙夢幻',
        // ... 其他屬性
    }
];
```

### 方法二：使用便捷函數

在瀏覽器控制台中：

```javascript
// 添加新主題
addNewTheme({
    id: 'newTheme',
    name: '新主題',
    icon: '🌟',
    // ... 其他屬性
});

// 移除主題
removeTheme('themeId');

// 獲取所有新主題
const allNewThemes = getNewThemes();
```

## 🎨 主題屬性說明

### 必要屬性
- `id`: 唯一識別符（英文，無空格）
- `name`: 顯示名稱（中文）
- `icon`: 主題選擇器圖示
- `buttonIcon`: 按鈕圖示
- `preview`: 預覽樣式
- `color`: 主色調
- `category`: 主題分類

### 圖片屬性
- `backgroundImage`: 背景圖片路徑
- `investmentCardImage`: 投資卡片背景
- `accountingCardImage`: 記帳卡片背景
- `walletBudgetCardImage`: 錢包預算卡片背景
- `monthlyPlanningCardImage`: 每月規劃卡片背景
- `investmentSettingsCardImage`: 投資設定卡片背景
- `holdingCardImage`: 持有中卡片背景
- `buyingCardImage`: 買入卡片背景
- `sellingCardImage`: 賣出卡片背景
- `dividendCardImage`: 股息卡片背景
- `smartAnalysisCardImage`: 智慧分析卡片背景
- `smartReminderCardImage`: 智慧提醒卡片背景
- `regularInvestmentCardImage`: 定期定額卡片背景

## 📁 圖片管理

### 本地圖片路徑
```
images/
└── theme/
    ├── cosmic-dream-bg.jpg     # 宇宙夢幻背景
    ├── your-theme-bg.jpg       # 你的主題背景
    └── your-theme-card.jpg     # 你的主題卡片
```

### 圖片建議
- **尺寸**: 建議 1920x1080 或更高
- **格式**: JPG 或 PNG
- **命名**: 使用有意義的名稱，避免特殊字符

## 🎯 主題分類

### 現有分類
- `basic`: 經典色彩
- `cosmic`: 宇宙星空
- `dark`: 深色主題
- `anime`: 動漫風格
- `wealth`: 財富金錢
- `cute`: 可愛風格
- `fantasy`: 奇幻風格
- `dynamic`: 動態背景
- `celebration`: 節日慶典

### 添加新分類
在 `themes-new.js` 中的 `newThemeCategories` 添加：

```javascript
const newThemeCategories = {
    yourCategory: {
        name: '你的分類名稱',
        icon: '🎨',
        description: '分類描述'
    }
};
```

## 🎨 CSS 樣式表

### 創建主題專用 CSS
1. **命名規則**: `{theme-id}-theme.css`
2. **範例**: `cosmic-dream-theme.css`
3. **引用**: 在 `index.html` 中添加引用

### CSS 結構範例
```css
/* 基本主題變數 */
[data-theme="yourThemeId"] {
    --primary-color: #主色;
    --secondary-color: #次要色;
    --main-font-color: #主要文字色;
    --card-background: rgba(0, 0, 0, 0.7);
}

/* 背景設定 */
[data-theme="yourThemeId"] body {
    background-image: url('images/theme/your-bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

/* 卡片樣式 */
[data-theme="yourThemeId"] .card {
    background: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    backdrop-filter: blur(10px);
}

/* 按鈕樣式 */
[data-theme="yourThemeId"] .btn-primary {
    background: var(--button-gradient);
    border: 1px solid var(--accent-color);
    color: var(--button-text-color);
}
```

## 🔧 測試主題

### 創建測試頁面
複製現有的測試頁面並修改：
```bash
cp test-cosmic-dream-theme.html test-your-theme.html
```

### 測試清單
- [ ] 背景圖片正確載入
- [ ] 所有卡片樣式正常
- [ ] 按鈕狀態（正常/懸停/點擊/停用）
- [ ] 字體顏色和可讀性
- [ ] 響應式設計（手機/平板/桌面）
- [ ] 小森對話框樣式
- [ ] 智慧功能卡片

## 📝 最佳實踐

### 1. 圖片優化
- 使用適當的圖片尺寸
- 壓縮圖片以提升載入速度
- 提供備用漸層背景

### 2. 顏色選擇
- 確保文字對比度充足
- 避免高飽和度顏色
- 考慮色盲用戶

### 3. 響應式設計
- 測試不同螢幕尺寸
- 確保觸控友好
- 適配行動裝置

### 4. 效能考量
- 圖片延遲載入
- CSS 動畫性能優化
- 避免過度使用陰影效果

## 🐛 常見問題

### CORS 錯誤
**問題**: 圖片無法載入
**解決**: 使用本地圖片路徑，避免外部連結

### 主題不生效
**問題**: 新主題沒有出現在選擇器
**解決**: 檢查 `themes-new.js` 是否正確載入

### 樣式衝突
**問題**: CSS 樣式被覆蓋
**解決**: 使用更具體的選擇器或提高優先級

## 🔄 版本控制

### 主題版本管理
建議在主題物件中添加版本資訊：

```javascript
{
    id: 'yourTheme',
    name: '主題名稱',
    version: '1.0.0',
    author: '作者名稱',
    createdAt: '2024-01-24',
    // ... 其他屬性
}
```

## 📞 技術支援

如果遇到問題，請檢查：
1. 瀏覽器控制台錯誤訊息
2. 網路請求狀態
3. CSS 樣式是否正確載入
4. JavaScript 是否正常執行

---

**🎉 現在您可以輕鬆添加和管理新主題了！**
