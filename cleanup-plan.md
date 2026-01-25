# 檔案清理計劃

## 🗂️ 核心檔案（保留）
這些是應用程式運行必需的檔案：

### 主要應用檔案
- `index.html` - 主應用程式
- `script.js` - 主要 JavaScript 邏輯
- `styles.css` - 完整樣式檔案
- `styles-core.css` - 核心樣式
- `themes.css` - 主題樣式

### 資料檔案
- `stocks.json` - 股票資料
- `favicon.svg` - 網站圖標

### 文檔檔案
- `README.md` - 主要說明文檔
- `README-THEMES.md` - 主題系統說明

## 🗑️ 可刪除的檔案分類

### 1. 測試檔案（約 80+ 個檔案）
所有以 `test-` 開頭的 HTML/JS/CSS 檔案：
- `test-*.html` (約 50 個)
- `test-*.js` (約 10 個)
- `debug-*.html` (約 15 個)
- `debug-*.js` (約 5 個)

### 2. 主題開發檔案（約 30+ 個檔案）
各種主題的 CSS 和測試檔案：
- `*-theme.css` (約 20 個)
- `test-*-theme.html` (約 15 個)

### 3. 修復和臨時檔案（約 40+ 個檔案）
各種修復腳本和臨時檔案：
- `fix-*.js` (約 15 個)
- `*-fix.js` (約 10 個)
- `temp_*.txt` (約 5 個)

### 4. 重複和備份檔案（約 10 個檔案）
- `styles.css.backup`
- `styles_backup.css`
- 其他備份檔案

### 5. 開發工具檔案（約 20+ 個檔案）
各種開發和診斷工具：
- `check-*.js`
- `diagnose-*.html`
- `*-check.html`

### 6. 實驗性檔案（約 15 個檔案）
各種實驗性和概念驗證檔案：
- `*-demo.html`
- `*-debug.html`
- `*-simple.html`

## 📊 統計
- **總檔案數量**: 約 300+ 個檔案
- **可刪除檔案**: 約 200+ 個檔案
- **保留檔案**: 約 20-30 個檔案
- **節省空間**: 預計可減少 70-80% 的檔案數量

## 🎯 清理後的目錄結構
```
money-money-01-02--main/
├── index.html                 # 主應用程式
├── script.js                  # 主要 JavaScript
├── styles.css                 # 完整樣式
├── styles-core.css            # 核心樣式
├── themes.css                 # 主題樣式
├── stocks.json                # 股票資料
├── favicon.svg                # 網站圖標
├── README.md                  # 主要文檔
├── README-THEMES.md           # 主題文檔
├── css/                       # CSS 模組
├── js/                        # JavaScript 模組
├── images/                    # 圖片資源
└── music/                     # 音效檔案
```

## ⚠️ 注意事項
1. **備份重要檔案**: 在刪除前請確保已備份重要資料
2. **測試應用程式**: 清理後請測試所有功能是否正常
3. **檢查依賴**: 確保沒有其他檔案依賴被刪除的檔案
4. **漸進式清理**: 建議分批刪除，每次刪除一類檔案後測試

## 🚀 清理步驟
1. 備份整個專案
2. 刪除測試檔案
3. 刪除重複主題檔案
4. 刪除修復腳本
5. 刪除備份檔案
6. 測試應用程式功能
7. 清理空目錄

這樣可以大幅簡化專案結構，提高維護效率。
