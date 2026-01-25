// ========== 設定頁面自動轉帳和自動繳費功能補丁 ==========

// 在現有的設定頁面中添加自動轉帳和自動繳費選項
function patchSettingsPageWithAutoTransfer() {
    // 等待設定頁面初始化完成
    const checkAndPatch = () => {
        const settingsList = document.getElementById('settingsList');
        if (!settingsList) {
            setTimeout(checkAndPatch, 100);
            return;
        }
        
        // 檢查是否已經添加過
        if (settingsList.querySelector('[data-action="autoTransfer"]')) {
            return;
        }
        
        // 創建自動化管理區塊
        const autoSection = document.createElement('div');
        autoSection.className = 'settings-section';
        autoSection.innerHTML = `
            <div class="settings-section-title">🔄 自動化管理</div>
            <div class="settings-section-items">
                <div class="settings-item" data-action="autoTransfer">
                    <div class="settings-item-accent" style="background:linear-gradient(135deg, #667eea, #764ba2);"></div>
                    <div class="settings-item-icon" style="background:linear-gradient(135deg, #667eea, #764ba2);">
                        <span>💸</span>
                    </div>
                    <div class="settings-item-text-group">
                        <span class="settings-item-text">自動轉帳</span>
                        <span class="settings-item-subtext">設定帳戶間自動轉帳計劃</span>
                    </div>
                    <span class="settings-item-arrow">›</span>
                </div>
                <div class="settings-item" data-action="autoPayment">
                    <div class="settings-item-accent" style="background:linear-gradient(135deg, #f59e0b, #d97706);"></div>
                    <div class="settings-item-icon" style="background:linear-gradient(135deg, #f59e0b, #d97706);">
                        <span>💳</span>
                    </div>
                    <div class="settings-item-text-group">
                        <span class="settings-item-text">自動繳費</span>
                        <span class="settings-item-subtext">管理各種帳單自動繳費</span>
                    </div>
                    <span class="settings-item-arrow">›</span>
                </div>
            </div>
        `;
        
        // 找到分析工具區塊並在其前面插入
        const analysisSection = Array.from(settingsList.children).find(section => 
            section.querySelector('.settings-section-title')?.textContent?.includes('分析工具')
        );
        
        if (analysisSection) {
            settingsList.insertBefore(autoSection, analysisSection);
        } else {
            // 如果找不到分析工具，就添加到最後
            settingsList.appendChild(autoSection);
        }
        
        // 綁定點擊事件
        autoSection.querySelectorAll('.settings-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                if (action === 'autoTransfer' && typeof showAutoTransferManagementPage === 'function') {
                    showAutoTransferManagementPage();
                } else if (action === 'autoPayment' && typeof showAutoPaymentManagementPage === 'function') {
                    showAutoPaymentManagementPage();
                }
            });
        });
    };
    
    checkAndPatch();
}

// 在頁面載入時應用補丁
document.addEventListener('DOMContentLoaded', () => {
    // 延遲一點時間確保原始設定頁面已經初始化
    setTimeout(patchSettingsPageWithAutoTransfer, 500);
});

// 監聽設定頁面的顯示
const observer = new MutationObserver(() => {
    const settingsPage = document.getElementById('pageSettings');
    if (settingsPage && settingsPage.style.display !== 'none') {
        setTimeout(patchSettingsPageWithAutoTransfer, 100);
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style']
});
