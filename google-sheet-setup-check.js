// Google Sheet 完整設定檢查工具
console.log('🔧 載入 Google Sheet 設定檢查工具...');

function checkGoogleSheetCompleteSetup() {
    console.log('📋 檢查 Google Sheet 完整設定...');
    
    const setup = {
        // 基本設定
        webAppUrl: localStorage.getItem('googleSheetUploadUrl'),
        backupKey: localStorage.getItem('googleCloudBackupKey'),
        
        // 資料檢查
        dataCheck: {
            accountingRecords: JSON.parse(localStorage.getItem('accountingRecords') || '[]'),
            customCategories: JSON.parse(localStorage.getItem('customCategories') || '[]'),
            investmentRecords: JSON.parse(localStorage.getItem('investmentRecords') || '[]'),
            accounts: JSON.parse(localStorage.getItem('accounts') || '[]'),
            categoryBudgets: JSON.parse(localStorage.getItem('categoryBudgets') || '{}'),
            imageEmojis: JSON.parse(localStorage.getItem('imageEmojis') || '[]'),
            members: JSON.parse(localStorage.getItem('members') || '[]'),
            dcaPlans: JSON.parse(localStorage.getItem('dcaPlans') || '[]'),
            installmentRules: JSON.parse(localStorage.getItem('installmentRules') || '[]'),
            theme: localStorage.getItem('theme'),
            fontSize: localStorage.getItem('fontSize')
        }
    };
    
    // 產生報告
    let report = '📊 Google Sheet 完整設定報告\n\n';
    
    // 基本設定狀態
    report += '⚙️ 基本設定：\n';
    report += `Web App URL: ${setup.webAppUrl ? '✅ 已設定' : '❌ 未設定'}\n`;
    report += `備份金鑰: ${setup.backupKey ? '✅ 已設定' : '❌ 未設定'}\n\n`;
    
    // 資料統計
    report += '📈 資料統計：\n';
    report += `記帳記錄: ${setup.dataCheck.accountingRecords.length} 筆\n`;
    report += `自訂分類: ${setup.dataCheck.customCategories.length} 個\n`;
    report += `投資記錄: ${setup.dataCheck.investmentRecords.length} 筆\n`;
    report += `帳戶資料: ${setup.dataCheck.accounts.length} 個\n`;
    report += `分期規則: ${setup.dataCheck.installmentRules.length} 個\n`;
    report += `DCA計劃: ${setup.dataCheck.dcaPlans.length} 個\n`;
    report += `成員資料: ${setup.dataCheck.members.length} 個\n`;
    report += `表情圖標: ${setup.dataCheck.imageEmojis.length} 個\n`;
    report += `主題設定: ${setup.dataCheck.theme || '預設'}\n`;
    report += `字體大小: ${setup.dataCheck.fontSize || '中等'}\n\n`;
    
    // 功能可用性
    report += '🚀 功能可用性：\n';
    const canBackup = setup.webAppUrl && setup.backupKey;
    const hasData = setup.dataCheck.accountingRecords.length > 0 || 
                   setup.dataCheck.customCategories.length > 0 ||
                   setup.dataCheck.investmentRecords.length > 0;
    
    report += `完整備份: ${canBackup ? '✅ 可用' : '❌ 不可用'}\n`;
    report += `完整還原: ${canBackup ? '✅ 可用' : '❌ 不可用'}\n`;
    report += `上傳明細: ${setup.webAppUrl ? '✅ 可用' : '❌ 不可用'}\n`;
    report += `按帳戶備份: ${setup.webAppUrl ? '✅ 可用' : '❌ 不可用'}\n`;
    report += `上傳加總: ${setup.webAppUrl ? '✅ 可用' : '❌ 不可用'}\n\n`;
    
    // 建議操作
    report += '💡 建議操作：\n';
    if (!setup.webAppUrl) {
        report += '1. 設定 Google Sheet Web App URL\n';
    }
    if (!setup.backupKey) {
        report += '2. 設定雲端備份碼\n';
    }
    if (setup.webAppUrl && setup.backupKey && hasData) {
        report += '3. 執行完整備份到 Google Sheet\n';
    }
    if (!hasData) {
        report += '3. 開始使用記帳功能，建立資料後再備份\n';
    }
    
    // 顯示報告
    console.log(report);
    alert(report);
    
    return setup;
}

// 執行完整備份測試
function testCompleteBackup() {
    console.log('🧪 測試完整備份功能...');
    
    const url = localStorage.getItem('googleSheetUploadUrl');
    const key = localStorage.getItem('googleCloudBackupKey');
    
    if (!url || !key) {
        alert('❌ 請先完成 Google Sheet 基本設定');
        return;
    }
    
    // 收集備份資料
    const testData = {
        test: true,
        timestamp: new Date().toISOString(),
        dataSummary: {
            accountingRecords: JSON.parse(localStorage.getItem('accountingRecords') || '[]').length,
            customCategories: JSON.parse(localStorage.getItem('customCategories') || '[]').length,
            investmentRecords: JSON.parse(localStorage.getItem('investmentRecords') || '[]').length
        }
    };
    
    const payload = {
        action: 'save_snapshot',
        backupKey: key + '_test',
        snapshot: JSON.stringify(testData)
    };
    
    console.log('發送測試備份...', payload);
    
    fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(() => {
        alert('✅ 測試備份已發送到 Google Sheet\n\n請檢查 Google Sheet 中的 Backups 工作表');
    }).catch((e) => {
        alert('❌ 測試備份失敗：' + (e && e.message ? e.message : e));
    });
}

// 顯示詳細設定說明
function showGoogleSheetSetupHelp() {
    const helpText = `
🔧 Google Sheet 完整設定說明

📋 必要設定：
1. Google Sheet Web App URL
2. 雲端備份金鑰

📁 備份內容：
• 所有記帳記錄
• 自訂分類和圖示
• 投資記錄和 DCA 計劃
• 帳戶和分期資料
• 成員和表情圖標
• 主題和字體設定

🚀 可用功能：
• 完整備份/還原
• 上傳記錄明細
• 按帳戶分別備份
• 收支分類統計

💾 使用步驟：
1. 設定 Web App URL
2. 設定備份金鑰
3. 執行完整備份
4. 必要時執行還原

📖 詳細教學請參考：
Google_Sheet_Setup_Guide.md
`;
    
    alert(helpText);
}

// 導出函數
window.checkGoogleSheetCompleteSetup = checkGoogleSheetCompleteSetup;
window.testCompleteBackup = testCompleteBackup;
window.showGoogleSheetSetupHelp = showGoogleSheetSetupHelp;

console.log('🔧 Google Sheet 設定檢查工具已載入');
console.log('💡 使用 checkGoogleSheetCompleteSetup() 檢查設定狀態');
console.log('💡 使用 testCompleteBackup() 測試備份功能');
console.log('💡 使用 showGoogleSheetSetupHelp() 顯示說明');
