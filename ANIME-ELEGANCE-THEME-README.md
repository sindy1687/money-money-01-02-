# 🌸 動漫優雅主題使用說明

## 主題概述

動漫優雅主題是基於您提供的動漫風格圖片設計的優雅主題，具有以下特色：

- **柔和色彩**：以淺藍色、白色、淡褐色為主調
- **漸層設計**：使用優美的漸層效果取代透明卡片
- **美化字體**：採用 Inter、Poppins、Space Grotesk 等現代字體
- **響應式設計**：完美適配各種螢幕尺寸
- **動漫風格**：融合動漫元素與現代UI設計

## 主要特色

### 🎨 視覺設計
- **背景圖片**：使用提供的動漫風格背景圖片
- **卡片設計**：漸層背景，柔和陰影，圓潤邊角
- **按鈕樣式**：漸層按鈕，懸停效果，動畫過渡
- **色彩搭配**：確保所有文字和圖標都有良好的對比度

### 🦋 UI元素
- **記帳卡片**：柔和的藍白色漸層
- **投資卡片**：特殊的投資背景圖片
- **買入/定期定額按鈕**：綠色漸層，突出顯示
- **小森對話框**：響應式設計，適配螢幕大小
- **智慧分析/提醒**：專用的卡片樣式

### 📱 響應式設計
- **移動設備**：自動調整佈局和字體大小
- **平板設備**：優化的間距和佈局
- **桌面設備**：完整的視覺效果

## 安裝與使用

### 方法1：通過主題選擇器
1. 在應用中打開設置頁面
2. 點擊主題選擇器
3. 選擇「動漫優雅」主題
4. 主題會自動應用

### 方法2：手動應用
1. 在主HTML文件中引入主題CSS：
```html
<link rel="stylesheet" href="anime-elegance-theme.css">
```

2. 在JavaScript中應用主題：
```javascript
// 設置主題
document.documentElement.setAttribute('data-theme', 'anime-elegance');
localStorage.setItem('selectedTheme', 'anime-elegance');

// 應用背景圖片
document.body.style.backgroundImage = 'url(https://i.pinimg.com/736x/62/ae/43/62ae43241893a8a0bb1bc79055d78cfe.jpg)';
document.body.style.backgroundSize = 'cover';
document.body.style.backgroundPosition = 'center';
document.body.style.backgroundAttachment = 'fixed';
```

### 方法3：使用自動應用腳本
```html
<script src="apply-anime-elegance-theme.js"></script>
```

## 文件結構

```
anime-elegance-theme.css          # 主題樣式文件
apply-anime-elegance-theme.js    # 自動應用腳本
test-anime-elegance-theme.html   # 測試頁面
ANIME-ELEGANCE-THEME-README.md   # 使用說明
```

## 自定義配置

### 色彩變數
主題使用CSS自定義屬性，可以通過修改以下變數來自定義：

```css
:root[data-theme="anime-elegance"] {
    --color-primary: #7da8c7;           /* 主要色彩 */
    --color-secondary: #f4e4d4;         /* 次要色彩 */
    --bg-primary: linear-gradient(...);  /* 背景漸層 */
    --card-gradient-1: linear-gradient(...); /* 卡片漸層1 */
    --card-gradient-2: linear-gradient(...); /* 卡片漸層2 */
    --btn-primary-gradient: linear-gradient(...); /* 按鈕漸層 */
}
```

### 字體配置
```css
:root[data-theme="anime-elegance"] {
    --font-primary: 'Inter', 'Poppins', sans-serif;
    --font-secondary: 'Space Grotesk', 'Clash Display', sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
}
```

### 背景圖片
可以通過修改以下變數來更換背景圖片：
```css
:root[data-theme="anime-elegance"] {
    --bg-image-url: url('your-image-url');
    --investment-bg-url: url('your-investment-image-url');
}
```

## 組件樣式

### 卡片類型
- `.card` - 通用卡片
- `.record-card` - 記錄卡片
- `.budget-card` - 預算卡片
- `.investment-card` - 投資卡片
- `.wallet-card` - 錢包卡片
- `.planning-card` - 規劃卡片
- `.holding-card` - 持有卡片
- `.sell-card` - 賣出卡片
- `.dividend-card` - 股息卡片

### 按鈕類型
- `.btn` - 主要按鈕
- `.btn-secondary` - 次要按鈕
- `.btn-success` - 成功按鈕
- `.btn-danger` - 危險按鈕
- `.btn-warning` - 警告按鈕
- `.btn-info` - 信息按鈕
- `.buy-btn` - 買入按鈕
- `.recurring-btn` - 定期定額按鈕
- `.back-btn` - 返回按鈕

### 特殊組件
- `.xiaosen-dialog` - 小森對話框
- `.smart-analysis` - 智慧分析
- `.smart-reminders` - 智慧提醒
- `.modal` - 彈窗
- `.fab` - 浮動操作按鈕

## 測試

打開 `test-anime-elegance-theme.html` 文件來測試主題效果。測試頁面包含：

- 各種卡片樣式展示
- 按鈕樣式展示
- 小森對話框示例
- 智慧分析和提醒卡片
- 表單元素樣式
- 響應式測試
- 主題切換功能

## 兼容性

- **現代瀏覽器**：Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **移動設備**：iOS Safari 12+, Chrome Mobile 60+
- **響應式設計**：支持 320px - 2560px 螢幕寬度

## 注意事項

1. **字體加載**：確保網絡連接正常，以便加載Google字體
2. **圖片加載**：背景圖片需要從外部URL加載，請確保網絡可達
3. **性能優化**：建議在生產環境中壓縮CSS文件
4. **緩存策略**：建議設置適當的緩存策略以提高加載速度

## 故障排除

### 主題未生效
1. 檢查CSS文件是否正確引入
2. 確認HTML元素設置了正確的 `data-theme` 屬性
3. 檢查瀏覽器控制台是否有錯誤信息

### 背景圖片未顯示
1. 檢查網絡連接
2. 確認圖片URL是否可訪問
3. 檢查CORS策略是否允許圖片加載

### 字體顯示異常
1. 檢查Google字體是否成功加載
2. 確認CSS中字體名稱是否正確
3. 檢查字體回退機制是否正常

## 更新日誌

### v1.0.0 (2024-01-20)
- 初始版本發布
- 實現基礎主題樣式
- 添加響應式設計
- 完成所有UI組件樣式
- 添加測試頁面和文檔

## 支持

如果您在使用過程中遇到問題，請：

1. 檢查瀏覽器控制台錯誤信息
2. 確認所有文件都已正確上傳
3. 測試網絡連接是否正常
4. 查看本文檔的故障排除部分

---

**享受您的動漫優雅主題！** 🌸✨
