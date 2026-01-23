# Google Sheet 完整備份與還原設定指南

## 📋 功能概述

這個記帳本應用程式支援完整的 Google Sheet 雲端備份與還原功能，包含所有資料的上傳和下載。

## 🔄 完整資料清單

### 記帳相關資料
- `accountingRecords` - 所有記帳記錄
- `categoryBudgets` - 分類預算設定
- `categoryEnabledState` - 分類啟用狀態
- `dailyBudgetTracking` - 每日預算追蹤
- `customCategories` - 自訂分類
- `categoryCustomIcons` - 分類自訂圖示

### 投資相關資料
- `investmentRecords` - 投資記錄
- `dcaPlans` - 定期定額計劃
- `stockCurrentPrices` - 股票目前價格

### 其他資料
- `installmentRules` - 分期規則
- `accounts` - 帳戶資訊
- `imageEmojis` - 表情符號和圖標
- `members` - 成員資料
- `theme` - 主題設定
- `fontSize` - 字體大小設定
- `customTheme` - 自訂主題

## ⚙️ 設定步驟

### 1. 設定 Google Sheet Web App URL

1. 前往 [Google Apps Script](https://script.google.com)
2. 建立新專案
3. 貼上以下程式碼：

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    
    if (data.action === 'save_snapshot') {
      // 儲存完整備份
      const backupSheet = sheet.getSheetByName('Backups') || sheet.insertSheet('Backups');
      const timestamp = new Date().toISOString();
      
      // 找到下一個空行
      const lastRow = backupSheet.getLastRow();
      const nextRow = lastRow + 1;
      
      // 寫入備份資料
      backupSheet.getRange(nextRow, 1).setValue(timestamp);
      backupSheet.getRange(nextRow, 2).setValue(data.backupKey);
      backupSheet.getRange(nextRow, 3).setValue(data.snapshot);
      
      return ContentService.createTextOutput(JSON.stringify({ok: true}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (data.action === 'load_snapshot') {
      // 載入備份
      const backupSheet = sheet.getSheetByName('Backups');
      if (!backupSheet) {
        return ContentService.createTextOutput(JSON.stringify({ok: false, error: 'No backups found'}))
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      const dataRange = backupSheet.getDataRange();
      const values = dataRange.getValues();
      
      // 尋找匹配的備份金鑰
      for (let i = 1; i < values.length; i++) {
        if (values[i][1] === data.backupKey) {
          const snapshot = values[i][2];
          return ContentService.createTextOutput(JSON.stringify({
            ok: true,
            snapshot: snapshot
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
      
      return ContentService.createTextOutput(JSON.stringify({ok: false, error: 'Backup not found'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ok: false, error: 'Unknown action'}))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ok: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const action = e.parameter.action;
  const callback = e.parameter.callback;
  const backupKey = e.parameter.backupKey;
  
  let result;
  
  if (action === 'load_snapshot') {
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet();
      const backupSheet = sheet.getSheetByName('Backups');
      
      if (!backupSheet) {
        result = {ok: false, error: 'No backups found'};
      } else {
        const dataRange = backupSheet.getDataRange();
        const values = dataRange.getValues();
        
        for (let i = 1; i < values.length; i++) {
          if (values[i][1] === backupKey) {
            const snapshot = values[i][2];
            result = {ok: true, snapshot: snapshot};
            break;
          }
        }
        
        if (!result) {
          result = {ok: false, error: 'Backup not found'};
        }
      }
    } catch (error) {
      result = {ok: false, error: error.toString()};
    }
  } else {
    result = {ok: false, error: 'Unknown action'};
  }
  
  return ContentService.createTextOutput(callback + '(' + JSON.stringify(result) + ')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
```

4. 儲存專案
5. 點擊「部署」→「新增部署」
6. 選擇「網頁應用程式」
7. 設定：
   - 執行為：我
   - 存取權限：任何人
8. 點擊「部署」
9. 複製 Web App URL（以 `/exec` 結尾）
10. 在應用程式中設定 URL

### 2. 設定雲端備份碼

1. 在應用程式設定頁面點擊「雲端備份碼」
2. 輸入一個強密碼（建議使用長字串，如：MyBackup2024!@#）
3. 儲存備份碼

## 🚀 使用方法

### 完整備份到 Google Sheet

1. 開啟應用程式
2. 前往「設定」頁面
3. 點擊「雲端備份（完整）」
4. 確認備份
5. 等待完成提示

### 從 Google Sheet 完整還原

1. 確保已設定相同的 Web App URL 和備份碼
2. 前往「設定」頁面
3. 點擊「雲端還原（完整）」
4. 確認還原（這會覆蓋所有現有資料）
5. 等待完成提示

### 其他上傳選項

- **上傳明細**：將所有記帳記錄以表格形式上傳到 Google Sheet
- **按帳戶備份**：依不同帳戶分別上傳資料
- **上傳加總**：上傳收支分類統計資料

## 📁 Google Sheet 結構

### Backups 工作表
| 欄位 A | 欄位 B | 欄位 C |
|--------|--------|--------|
| 時間戳記 | 備份金鑰 | 完整備份資料 (JSON) |

### 其他工作表
- 根據不同上傳選項會建立對應的工作表
- 包含格式化的表格資料

## 🔧 故障排除

### 常見問題

1. **備份失敗**
   - 檢查 Web App URL 是否正確
   - 確認 Google Apps Script 已正確部署
   - 檢查網路連線

2. **還原失敗**
   - 確認備份金鑰完全一致
   - 檢查 Web App URL 是否與備份時相同
   - 確認 Google Sheet 中存在備份資料

3. **權限問題**
   - 重新部署 Google Apps Script
   - 確認存取權限設為「任何人」

### 檢查設定狀態

在瀏覽器控制台中執行：
```javascript
// 檢查目前設定
console.log('Google Sheet URL:', localStorage.getItem('googleSheetUploadUrl'));
console.log('Backup Key:', localStorage.getItem('googleCloudBackupKey'));

// 檢查備份資料
const backupData = JSON.parse(localStorage.getItem('accountingRecords') || '[]');
console.log('記帳記錄數量:', backupData.length);
```

## 📱 跨裝置同步

1. 在新裝置上安裝相同應用程式
2. 設定相同的 Web App URL 和備份碼
3. 使用「雲端還原（完整）」功能
4. 完成後所有資料將同步到新裝置

## 🔄 自動備份建議

建議定期（如每月）執行完整備份：
- 每月20號應用程式會提醒備份
- 重要變更後手動備份
- 換裝置前務必備份

## 📞 技術支援

如遇到問題，請檢查：
1. Google Apps Script 部署狀態
2. 網路連線狀況
3. 瀏覽器控制台錯誤訊息
4. localStorage 資料完整性
