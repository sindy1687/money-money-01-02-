// 修復設置頁面 - 添加每月固定扣款選項
function fixSettingsPage() {
    // 重新定義設置頁面初始化函數
    function initSettingsPageFixed() {
        const settingsList = document.getElementById('settingsList');
        if (!settingsList) return;

        const settingsSections = [
            {
                title: '🎨 個人化設定',
                items: [
                    {
                        icon: '🎨',
                        title: '主題',
                        description: '霓虹波動 / 日系 / 極光等主題',
                        action: 'theme',
                        accent: 'linear-gradient(135deg, #ff9a9e, #fecfef)',
                        iconGradient: 'linear-gradient(135deg, #ff758c, #ff7eb3)'
                    },
                    {
                        icon: '🔤',
                        title: '字體',
                        description: '調整字級與閱讀體驗',
                        action: 'fontSize',
                        accent: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
                        iconGradient: 'linear-gradient(135deg, #96fbc4, #f9f586)'
                    },
                ]
            },
            {
                title: '☁️ 雲端同步',
                items: [
                    { icon: '🌟', title: '通用備份（自動）', description: '備份所有功能資料', action: 'universalBackupFull', accent: 'linear-gradient(135deg, #667eea, #764ba2)', iconGradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
                    { icon: '🔄', title: '通用還原（自動）', description: '還原所有功能資料', action: 'universalRestoreFull', accent: 'linear-gradient(135deg, #f093fb, #f5576c)', iconGradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
                    { icon: '👁️', title: '預覽備份', description: '查看所有備份資料', action: 'previewBackup', accent: 'linear-gradient(135deg, #4facfe, #00f2fe)', iconGradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
                    { icon: '☁️', title: '雲端備份（完整）', description: '一鍵備份所有資料', action: 'cloudBackupFull', accent: 'linear-gradient(135deg, #43e97b, #38f9d7)', iconGradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
                    { icon: '☁️', title: '雲端還原（完整）', description: '從雲端還原備份', action: 'cloudRestoreFull', accent: 'linear-gradient(135deg, #fa709a, #fee140)', iconGradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
                    { icon: '🔗', title: 'Sheet 網址', description: '設定 Google Sheet Web App', action: 'setGoogleSheetUploadUrl', accent: 'linear-gradient(135deg, #5ee7df, #b490ca)', iconGradient: 'linear-gradient(135deg, #5ee7df, #b490ca)' },
                    { icon: '🔑', title: '雲端備份碼', description: '設定雲端還原安全碼', action: 'setGoogleCloudBackupKey', accent: 'linear-gradient(135deg, #4facfe, #00f2fe)', iconGradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
                    { icon: '🧾', title: '上傳明細', description: '同步所有記錄明細', action: 'uploadAllRecordsDetailsToGoogleSheet', accent: 'linear-gradient(135deg, #30cfd0, #330867)', iconGradient: 'linear-gradient(135deg, #30cfd0, #330867)' },
                    { icon: '🧮', title: '按帳戶備份', description: '依帳戶上傳資料', action: 'uploadRecordsByAccountToGoogleSheet', accent: 'linear-gradient(135deg, #f6d365, #fda085)', iconGradient: 'linear-gradient(135deg, #f6d365, #fda085)' },
                    { icon: '📊', title: '上傳加總', description: '同步收支分類加總', action: 'uploadIncomeExpenseCategorySummaryToGoogleSheet', accent: 'linear-gradient(135deg, #89f7fe, #66a6ff)', iconGradient: 'linear-gradient(135deg, #89f7fe, #66a6ff)' }
                ]
            },
            {
                title: '💾 本機備份',
                items: [
                    { icon: '💾', title: '備份', description: '匯出本機資料檔', action: 'backup', accent: 'linear-gradient(135deg, #fddb92, #d1fdff)', iconGradient: 'linear-gradient(135deg, #fddb92, #d1fdff)' },
                    { icon: '📥', title: '還原', description: '從本機檔案還原', action: 'restore', accent: 'linear-gradient(135deg, #fcb69f, #ffecd2)', iconGradient: 'linear-gradient(135deg, #fcb69f, #ffecd2)' }
                ]
            },
            {
                title: '📊 分析工具',
                items: [
                    { icon: '📈', title: '年報', description: '生成年度分析報告', action: 'annualReport', accent: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)', iconGradient: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)' },
                    { icon: '📑', title: '分期', description: '管理分期與長期支出', action: 'installmentRules', accent: 'linear-gradient(135deg, #fbc2eb, #a6c1ee)', iconGradient: 'linear-gradient(135deg, #fbc2eb, #a6c1ee)' },
                    { icon: '🔄', title: '每月固定扣款', description: '管理房租、保險等固定支出', action: 'monthlyDeductions', accent: 'linear-gradient(135deg, #ff9a9e, #fecfef)', iconGradient: 'linear-gradient(135deg, #ff758c, #ff7eb3)' }
                ]
            },
            {
                title: '📚 說明與支援',
                items: [
                    { icon: '👨‍💻', title: '關於', description: '創作者與版本資訊', action: 'creator', accent: 'linear-gradient(135deg, #d299c2, #fef9d7)', iconGradient: 'linear-gradient(135deg, #d299c2, #fef9d7)' }
                ]
            }
        ];

        const sectionHTML = settingsSections.map(section => {
            const itemsHtml = section.items.map(item => {
                const accentStyle = item.accent ? `style="background:${item.accent};"` : '';
                const iconStyle = item.iconGradient ? `style="background:${item.iconGradient};"` : '';
                const iconContent = item.image
                    ? `<img src="${item.image}" alt="${item.title}">`
                    : `<span>${item.icon || ''}</span>`;
                
                return `
                    <div class="settings-item" data-action="${item.action}">
                        <div class="settings-item-accent" ${accentStyle}></div>
                        <div class="settings-item-icon" ${iconStyle}>
                            ${iconContent}
                        </div>
                        <div class="settings-item-text-group">
                            <span class="settings-item-text">${item.title}</span>
                            ${item.description ? `<span class="settings-item-subtext">${item.description}</span>` : ''}
                        </div>
                        <span class="settings-item-arrow">›</span>
                    </div>
                `;
            }).join('');

            return `
                <div class="settings-section">
                    ${section.title ? `<div class="settings-section-title">${section.title}</div>` : ''}
                    <div class="settings-section-items">
                        ${itemsHtml}
                    </div>
                </div>`;
        }).join('');
        
        settingsList.innerHTML = sectionHTML;

        // 綁定點擊事件
        document.querySelectorAll('.settings-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                
                // 處理每月固定扣款
                if (action === 'monthlyDeductions') {
                    if (typeof showMonthlyDeductionsPage === 'function') {
                        showMonthlyDeductionsPage();
                    } else {
                        alert('每月固定扣款功能載入中，請稍後再試...');
                    }
                    return;
                }
                
                // 其他原有的處理邏輯...
                if (action === 'universalBackupFull') {
                    universalBackupToGoogleSheet();
                } else if (action === 'universalRestoreFull') {
                    universalRestoreFromGoogleSheet();
                } else if (action === 'previewBackup') {
                    previewBackupData();
                } else if (action === 'backup') {
                    backupData();
                } else if (action === 'restore') {
                    restoreData();
                } else if (action === 'creator') {
                    showCreatorInfo();
                } else if (action === 'theme') {
                    showThemeSelector();
                } else if (action === 'fontSize') {
                    showFontSizeSelector();
                } else if (action === 'annualReport') {
                    showAnnualReport();
                } else if (action === 'installmentRules') {
                    showInstallmentManagementPage();
                }
            });
        });
    }

    // 替換原有的初始化函數
    window.initSettingsPage = initSettingsPageFixed;
    
    // 立即執行修復
    initSettingsPageFixed();
    
    console.log('✅ 設置頁面已修復，每月固定扣款選項已添加');
}

// 執行修復
fixSettingsPage();
