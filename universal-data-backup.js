// 自動化全資料備份還原系統
console.log('🔧 載入自動化全資料備份還原系統...');

class UniversalDataBackup {
    constructor() {
        this.backupKeyPrefix = 'universal_backup_';
        this.excludedKeys = [
            // 系統暫存鍵值
            'temp_',
            'cache_',
            'session_',
            // 已處理的專用鍵值
            'googleSheetUploadUrl',
            'googleCloudBackupKey'
        ];
    }

    // 自動收集所有 localStorage 資料
    collectAllData() {
        const allData = {};
        const keys = Object.keys(localStorage);
        
        console.log(`🔍 掃描 ${keys.length} 個 localStorage 鍵值...`);
        
        keys.forEach(key => {
            // 跳過排除的鍵值
            if (this.shouldExcludeKey(key)) {
                console.log(`⏭️ 跳過系統鍵值: ${key}`);
                return;
            }
            
            try {
                const value = localStorage.getItem(key);
                if (value !== null) {
                    // 嘗試解析 JSON，失敗則保持原始字串
                    try {
                        allData[key] = JSON.parse(value);
                    } catch (e) {
                        allData[key] = value;
                    }
                    console.log(`✅ 收集資料: ${key} (${typeof allData[key]})`);
                }
            } catch (e) {
                console.warn(`⚠️ 無法讀取鍵值 ${key}:`, e);
            }
        });
        
        return allData;
    }

    // 檢查是否應該排除鍵值
    shouldExcludeKey(key) {
        return this.excludedKeys.some(exclude => 
            key.startsWith(exclude) || key.includes(exclude)
        );
    }

    // 自動還原所有資料
    restoreAllData(data) {
        if (!data || typeof data !== 'object') {
            console.error('❌ 無效的還原資料');
            return false;
        }

        let restoredCount = 0;
        const keys = Object.keys(data);
        
        console.log(`🔄 開始還原 ${keys.length} 個鍵值...`);
        
        keys.forEach(key => {
            if (this.shouldExcludeKey(key)) {
                console.log(`⏭️ 跳過系統鍵值: ${key}`);
                return;
            }
            
            try {
                const value = data[key];
                let stringValue;
                
                // 根據原始類型決定儲存格式
                if (typeof value === 'object') {
                    stringValue = JSON.stringify(value);
                } else {
                    stringValue = String(value);
                }
                
                localStorage.setItem(key, stringValue);
                restoredCount++;
                console.log(`✅ 還原資料: ${key}`);
            } catch (e) {
                console.warn(`⚠️ 無法還原鍵值 ${key}:`, e);
            }
        });
        
        console.log(`🎉 成功還原 ${restoredCount}/${keys.length} 個鍵值`);
        return restoredCount > 0;
    }

    // 產生資料摘要
    generateDataSummary(data) {
        const summary = {
            totalKeys: Object.keys(data).length,
            categories: {},
            largestKey: '',
            largestSize: 0
        };

        Object.keys(data).forEach(key => {
            const value = data[key];
            const size = JSON.stringify(value).length;
            
            // 分類統計
            let category = 'other';
            if (key.includes('Record') || key.includes('record')) category = 'records';
            else if (key.includes('Category') || key.includes('category')) category = 'categories';
            else if (key.includes('Theme') || key.includes('theme')) category = 'themes';
            else if (key.includes('Account') || key.includes('account')) category = 'accounts';
            else if (key.includes('Investment') || key.includes('investment')) category = 'investments';
            else if (key.includes('Budget') || key.includes('budget')) category = 'budgets';
            else if (key.includes('Member') || key.includes('member')) category = 'members';
            else if (key.includes('Setting') || key.includes('setting')) category = 'settings';
            
            summary.categories[category] = (summary.categories[category] || 0) + 1;
            
            // 找出最大的鍵值
            if (size > summary.largestSize) {
                summary.largestSize = size;
                summary.largestKey = key;
            }
        });

        return summary;
    }

    // 增強的完整備份函數
    universalBackupToGoogleSheet() {
        const url = localStorage.getItem('googleSheetUploadUrl');
        if (!url) {
            alert('尚未設定 Web App URL');
            this.setGoogleSheetUploadUrl();
            return;
        }

        const backupKey = localStorage.getItem('googleCloudBackupKey');
        if (!backupKey) {
            alert('尚未設定雲端備份碼');
            this.setGoogleCloudBackupKey();
            return;
        }

        console.log('🚀 開始通用全資料備份...');
        
        // 收集所有資料
        const allData = this.collectAllData();
        const summary = this.generateDataSummary(allData);
        
        // 建立增強的備份物件
        const backupData = {
            version: 'universal-2.0',
            timestamp: new Date().toISOString(),
            summary: summary,
            data: allData,
            metadata: {
                appName: '記帳本',
                backupType: 'universal',
                totalKeys: summary.totalKeys,
                categories: summary.categories
            }
        };

        const payload = {
            action: 'save_snapshot',
            backupKey: backupKey,
            snapshot: JSON.stringify(backupData)
        };

        console.log('📦 備份資料摘要:', summary);

        fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(() => {
            const message = `
✅ 通用全資料備份完成！

📊 備份摘要：
• 總鍵值數量：${summary.totalKeys}
• 資料類別：${Object.keys(summary.categories).length} 種
• 最大資料：${summary.largestKey} (${summary.largestSize} 字元)

📁 資料類別分布：
${Object.entries(summary.categories).map(([cat, count]) => `• ${cat}: ${count}`).join('\n')}

💡 所有 localStorage 資料都已完整備份，包含未來新增的任何功能！
`;
            alert(message);
        }).catch((e) => {
            alert('通用備份失敗：' + (e && e.message ? e.message : e));
        });
    }

    // 增強的完整還原函數
    universalRestoreFromGoogleSheet() {
        const url = localStorage.getItem('googleSheetUploadUrl');
        if (!url) {
            alert('尚未設定 Web App URL');
            this.setGoogleSheetUploadUrl();
            return;
        }

        const backupKey = localStorage.getItem('googleCloudBackupKey');
        if (!backupKey) {
            alert('尚未設定雲端備份碼');
            this.setGoogleCloudBackupKey();
            return;
        }

        if (!confirm('確定要執行通用全資料還原嗎？\n\n這將還原所有備份的資料，包含所有功能的資料！')) {
            return;
        }

        console.log('🔄 開始通用全資料還原...');

        // JSONP 方式取得資料
        const cbName = `__universalRestoreCb_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
        const script = document.createElement('script');
        const cleanup = () => {
            try { delete window[cbName]; } catch (_) { window[cbName] = undefined; }
            if (script && script.parentNode) script.parentNode.removeChild(script);
        };

        window[cbName] = async (res) => {
            try {
                if (!res || !res.ok) {
                    const err = (res && res.error) ? String(res.error) : '未知錯誤';
                    alert('通用還原失敗：' + err);
                    cleanup();
                    return;
                }

                const snapshotStr = res.snapshot;
                if (!snapshotStr) {
                    alert('通用還原失敗：找不到備份內容');
                    cleanup();
                    return;
                }

                const backupData = JSON.parse(snapshotStr);
                
                // 檢查是否為通用備份格式
                if (backupData.version && backupData.version.startsWith('universal')) {
                    console.log('✅ 檢測到通用備份格式');
                    const success = this.restoreAllData(backupData.data);
                    
                    if (success) {
                        const message = `
🎉 通用全資料還原完成！

📊 還原摘要：
• 備份版本：${backupData.version}
• 備份時間：${backupData.timestamp}
• 還原鍵值：${Object.keys(backupData.data).length} 個
• 資料類別：${Object.keys(backupData.metadata.categories).length} 種

💡 所有功能的資料都已完整還原！建議重新載入頁面以確保生效。
`;
                        alert(message);
                    }
                } else {
                    // 向後兼容：處理舊版備份格式
                    console.log('⚠️ 檢測到舊版備份格式，使用向後兼容還原');
                    const success = this.restoreAllData(backupData);
                    
                    if (success) {
                        alert('🎉 舊版資料還原完成！建議重新載入頁面。');
                    }
                }
            } catch (e) {
                alert('通用還原失敗：' + (e && e.message ? e.message : e));
            } finally {
                cleanup();
            }
        };

        const qs = new URLSearchParams({
            action: 'load_snapshot',
            backupKey,
            callback: cbName
        });
        script.src = url + (url.includes('?') ? '&' : '?') + qs.toString();
        script.onerror = () => {
            alert('通用還原失敗：無法連線到雲端備份服務');
            cleanup();
        };
        document.body.appendChild(script);
    }

    // 設定函數（向後兼容）
    setGoogleSheetUploadUrl() {
        const current = localStorage.getItem('googleSheetUploadUrl');
        const url = prompt('請輸入 Google Apps Script Web App URL（/exec）', current);
        if (url == null) return;
        const next = String(url).trim();
        if (!next) {
            localStorage.removeItem('googleSheetUploadUrl');
            alert('已清除 Web App URL');
            return;
        }
        localStorage.setItem('googleSheetUploadUrl', next);
        alert('已儲存 Web App URL');
    }

    setGoogleCloudBackupKey() {
        const current = localStorage.getItem('googleCloudBackupKey');
        const next = prompt('請輸入雲端備份碼', current);
        if (next == null) return;
        const v = String(next).trim();
        if (!v) {
            localStorage.removeItem('googleCloudBackupKey');
            alert('已清除雲端備份碼');
            return;
        }
        localStorage.setItem('googleCloudBackupKey', v);
        alert('已儲存雲端備份碼');
    }

    // 預覽備份內容
    previewBackupData() {
        const allData = this.collectAllData();
        const summary = this.generateDataSummary(allData);
        
        let preview = `📋 備份資料預覽\n\n`;
        preview += `總鍵值數量：${summary.totalKeys}\n\n`;
        preview += `資料類別分布：\n`;
        
        Object.entries(summary.categories).forEach(([category, count]) => {
            preview += `• ${category}: ${count}\n`;
        });
        
        preview += `\n詳細鍵值列表：\n`;
        Object.keys(allData).forEach(key => {
            const value = allData[key];
            const type = typeof value;
            const size = JSON.stringify(value).length;
            preview += `• ${key} (${type}, ${size}字元)\n`;
        });
        
        console.log('📋 備份預覽:', allData);
        alert(preview);
        
        return allData;
    }
}

// 創建全域實例
const universalBackup = new UniversalDataBackup();

// 導出函數
window.universalBackupToGoogleSheet = () => universalBackup.universalBackupToGoogleSheet();
window.universalRestoreFromGoogleSheet = () => universalBackup.universalRestoreFromGoogleSheet();
window.previewBackupData = () => universalBackup.previewBackupData();
window.collectAllData = () => universalBackup.collectAllData();

console.log('🔧 自動化全資料備份還原系統已載入');
console.log('💡 使用 universalBackupToGoogleSheet() 執行通用備份');
console.log('💡 使用 universalRestoreFromGoogleSheet() 執行通用還原');
console.log('💡 使用 previewBackupData() 預覽備份內容');
