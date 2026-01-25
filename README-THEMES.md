# 主題樣式分離指南

## 📁 檔案結構

```
money-money-01-02--main/
├── styles-core.css          # 核心樣式（基礎樣式、工具類、動畫等）
├── themes.css               # 主題樣式（所有主題的顏色和背景定義）
├── styles.css               # 原始完整樣式（保留作為備份）
├── theme-demo.html          # 主題演示頁面
└── README-THEMES.md         # 本文件
```

## 🎨 主題系統架構

### 1. 核心樣式 (styles-core.css)
- **用途**: 包含所有非主題相關的基礎樣式
- **內容**:
  - CSS 變數定義（間距、字體、邊框半徑等）
  - 重置樣式
  - 基礎元素樣式
  - 通用工具類
  - 響應式設計
  - 動畫定義
  - 滾動條樣式

### 2. 主題樣式 (themes.css)
- **用途**: 包含所有主題的顏色、背景和視覺定義
- **內容**:
  - Money 主題
  - Totoro 主題
  - No Face 主題
  - Space Gold 主題
  - Festive 主題
  - Fruit 主題
  - Emerald Prince 主題

## 🚀 使用方法

### 在 HTML 中引用

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <!-- 1. 首先載入核心樣式 -->
    <link rel="stylesheet" href="styles-core.css">
    
    <!-- 2. 然後載入主題樣式 -->
    <link rel="stylesheet" href="themes.css">
    
    <!-- 3. 可選：載入原始完整樣式 -->
    <!-- <link rel="stylesheet" href="styles.css"> -->
</head>
<body data-theme="money">
    <!-- 你的內容 -->
</body>
</html>
```

### 切換主題

```javascript
// 設置主題
function setTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('selectedTheme', themeName);
}

// 載入保存的主題
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', loadSavedTheme);
```

## 🎯 可用主題

| 主題名稱 | 顯示名稱 | 特點 |
|---------|---------|------|
| `money` | Money | 深色專業主題，金色強調 |
| `totoro` | 龍貓 | 溫暖自然風格，龍貼背景 |
| `noface` | 無臉男 | 神秘深色主題，金色點綴 |
| `spacegold` | 太空金 | 科技感主題，深藍金色 |
| `festive` | 節慶 | 歡樂節日主題，多彩漸變 |
| `fruit` | 水果 | 清新水果主題，明亮色彩 |
| `emeraldPrince` | 翡翠王子 | 優雅翡翠主題，綠色系 |

## 🛠️ 自定義主題

### 創建新主題

1. 在 `themes.css` 中添加新的主題定義：

```css
:root[data-theme="your-theme"] {
    /* 主要顏色 */
    --color-primary: #your-color;
    --color-primary-light: #your-light-color;
    --color-primary-dark: #your-dark-color;
    
    /* 背景顏色 */
    --bg-primary: #your-bg-color;
    --bg-card: #your-card-color;
    
    /* 文字顏色 */
    --text-primary: #your-text-color;
    --text-secondary: #your-secondary-text-color;
    
    /* 邊框和陰影 */
    --border-primary: #your-border-color;
    --shadow-primary: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 主題特定樣式 */
:root[data-theme="your-theme"] .card {
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
}
```

2. 在主題切換器中添加新主題按鈕

```html
<button class="theme-btn" onclick="setTheme('your-theme')">Your Theme</button>
```

## 📱 響應式設計

核心樣式包含完整的響應式設計：

```css
/* 移動端 */
@media (max-width: 768px) {
    .container {
        padding: 0 var(--spacing-sm);
    }
}

/* 桌面端 */
@media (min-width: 769px) {
    .hidden-desktop {
        display: none;
    }
}
```

## 🎨 動畫效果

核心樣式提供預設動畫：

```css
/* 淡入動畫 */
.animate-fade-in {
    animation: fadeIn 0.3s ease-out;
}

/* 脈衝動畫 */
.animate-pulse {
    animation: pulse 2s infinite;
}

/* 旋轉動畫 */
.animate-spin {
    animation: spin 1s linear infinite;
}
```

## 🔧 最佳實踐

### 1. 載入順序
```html
<!-- 正確的載入順序 -->
<link rel="stylesheet" href="styles-core.css">  <!-- 1. 核心樣式 -->
<link rel="stylesheet" href="themes.css">       <!-- 2. 主題樣式 -->
```

### 2. CSS 變數使用
```css
.my-component {
    /* 使用主題變數 */
    background: var(--bg-card);
    color: var(--text-primary);
    border: 1px solid var(--border-primary);
    
    /* 使用核心變數 */
    padding: var(--spacing-md);
    border-radius: var(--border-radius-lg);
    transition: all var(--transition-normal);
}
```

### 3. 主題切換動畫
```css
body {
    transition: all 0.3s ease;
}
```

## 🚨 注意事項

1. **載入順序**: 必須先載入 `styles-core.css`，再載入 `themes.css`
2. **變數命名**: 主題變數以 `--color-`、`--bg-`、`--text-` 開頭
3. **回退值**: 為了兼容性，可以提供回退值：
   ```css
   background: var(--bg-card, #ffffff);
   ```
4. **性能**: 避免過多的大型背景圖片，影響載入性能

## 🔄 從原始版本遷移

如果你有現有的 HTML 文件使用原始的 `styles.css`：

1. 更新 HTML 頭部的 CSS 引用：
   ```html
   <!-- 舊版本 -->
   <link rel="stylesheet" href="styles.css">
   
   <!-- 新版本 -->
   <link rel="stylesheet" href="styles-core.css">
   <link rel="stylesheet" href="themes.css">
   ```

2. 確保 body 標籤有正確的 data-theme 屬性：
   ```html
   <body data-theme="money">
   ```

3. 測試所有主題切換功能

## 🎉 完成！

現在你可以：
- ✅ 使用模組化的 CSS 結構
- ✅ 輕鬆切換主題
- ✅ 快速添加新主題
- ✅ 維護更好的代碼組織
- ✅ 提升開發效率

享受你的新主題系統！🎨
