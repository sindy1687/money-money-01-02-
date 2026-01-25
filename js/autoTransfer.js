// ========== 自動轉帳管理系統 ==========

// 顯示自動轉帳管理頁面
function showAutoTransferManagementPage() {
    // 檢查是否已存在管理頁面
    let existingPage = document.getElementById('autoTransferManagementPage');
    if (existingPage) {
        existingPage.remove();
    }
    
    // 嘗試找到 pageSettings，如果找不到則使用 body
    let pageSettings = document.getElementById('pageSettings');
    let targetParent = pageSettings ? pageSettings.parentNode : document.body;
    
    // 如果找到 pageSettings，隱藏它
    if (pageSettings) {
        pageSettings.style.display = 'none';
    }
    
    // 創建自動轉帳管理頁面
    const transferPage = document.createElement('div');
    transferPage.className = 'auto-transfer-management-page';
    transferPage.id = 'autoTransferManagementPage';
    transferPage.innerHTML = `
        <div class="auto-transfer-header">
            <button class="auto-transfer-back-btn" id="autoTransferBackBtn">← 返回</button>
            <h2 class="auto-transfer-title">自動轉帳管理</h2>
            <button class="auto-transfer-add-btn" id="autoTransferAddBtn">➕ 新增</button>
        </div>
        
        <div class="auto-transfer-summary" id="autoTransferSummary">
            <!-- 統計摘要將由 JavaScript 動態生成 -->
        </div>
        
        <div class="auto-transfer-list-container" id="autoTransferListContainer">
            <!-- 自動轉帳計劃列表將由 JavaScript 動態生成 -->
        </div>
    `;
    
    // 插入到目標父元素中
    if (pageSettings) {
        targetParent.insertBefore(transferPage, pageSettings.nextSibling);
    } else {
        // 如果沒有 pageSettings，直接添加到 body
        document.body.appendChild(transferPage);
    }
    
    // 隱藏底部導航（如果存在）
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) bottomNav.style.display = 'none';
    
    // 初始化事件監聽
    initAutoTransferEvents();
    
    // 載入轉帳計劃列表
    loadAutoTransferPlans();
}

// 初始化自動轉帳事件監聽
function initAutoTransferEvents() {
    // 返回按鈕
    const backBtn = document.getElementById('autoTransferBackBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            closeAutoTransferManagementPage();
        });
    }
    
    // 新增按鈕
    const addBtn = document.getElementById('autoTransferAddBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            showAutoTransferSetupPage();
        });
    }
}

// 關閉自動轉帳管理頁面
function closeAutoTransferManagementPage() {
    const transferPage = document.getElementById('autoTransferManagementPage');
    const pageSettings = document.getElementById('pageSettings');
    const bottomNav = document.querySelector('.bottom-nav');
    
    if (transferPage) transferPage.remove();
    if (pageSettings) pageSettings.style.display = 'block';
    if (bottomNav) bottomNav.style.display = 'flex';
}

// 載入自動轉帳計劃列表
function loadAutoTransferPlans() {
    const container = document.getElementById('autoTransferListContainer');
    const summaryContainer = document.getElementById('autoTransferSummary');
    if (!container) return;
    
    const plans = JSON.parse(localStorage.getItem('autoTransferPlans') || '[]');
    
    // 生成統計摘要
    if (summaryContainer) {
        const enabledPlans = plans.filter(p => p.enabled);
        const totalMonthlyAmount = enabledPlans
            .filter(p => p.frequency === 'monthly')
            .reduce((sum, p) => sum + p.amount, 0);
        const totalWeeklyAmount = enabledPlans
            .filter(p => p.frequency === 'weekly')
            .reduce((sum, p) => sum + p.amount, 0);
        const totalQuarterlyAmount = enabledPlans
            .filter(p => p.frequency === 'quarterly')
            .reduce((sum, p) => sum + p.amount, 0);
        const totalYearlyAmount = enabledPlans
            .filter(p => p.frequency === 'yearly')
            .reduce((sum, p) => sum + p.amount, 0);
        
        summaryContainer.innerHTML = `
            <div class="summary-cards">
                <div class="summary-card">
                    <div class="summary-icon">📋</div>
                    <div class="summary-info">
                        <div class="summary-label">總計劃數</div>
                        <div class="summary-value">${plans.length}</div>
                    </div>
                </div>
                <div class="summary-card">
                    <div class="summary-icon">✅</div>
                    <div class="summary-info">
                        <div class="summary-label">啟用中</div>
                        <div class="summary-value">${enabledPlans.length}</div>
                    </div>
                </div>
                <div class="summary-card">
                    <div class="summary-icon">💰</div>
                    <div class="summary-info">
                        <div class="summary-label">月總額</div>
                        <div class="summary-value">NT$${totalMonthlyAmount.toLocaleString('zh-TW')}</div>
                    </div>
                </div>
                <div class="summary-card">
                    <div class="summary-icon">📅</div>
                    <div class="summary-info">
                        <div class="summary-label">本週總額</div>
                        <div class="summary-value">NT$${totalWeeklyAmount.toLocaleString('zh-TW')}</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    if (plans.length === 0) {
        container.innerHTML = `
            <div class="auto-transfer-empty">
                <div class="empty-icon">💸</div>
                <div class="empty-text">尚未設定自動轉帳計劃</div>
                <div class="empty-subtext">點擊「新增」建立第一個轉帳計劃</div>
            </div>
        `;
        return;
    }
    
    const plansHTML = plans.map(plan => {
        // 使用改進的 getAccountById 函數
        const fromAccount = getAccountById(plan.fromAccount);
        const toAccount = getAccountById(plan.toAccount);
        const statusClass = plan.enabled ? 'enabled' : 'disabled';
        const statusText = plan.enabled ? '啟用中' : '已停用';
        
        // 根據頻率顯示不同的排程文字
        let scheduleText = '';
        switch (plan.frequency) {
            case 'weekly':
                const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
                scheduleText = weekdays[plan.weekday || 1];
                break;
            case 'quarterly':
                scheduleText = `每${plan.month}月 ${plan.day}號`;
                break;
            case 'yearly':
                scheduleText = `每年${plan.month}月 ${plan.day}號`;
                break;
            default: // monthly
                scheduleText = `每月 ${plan.day} 號`;
        }
        
        return `
            <div class="auto-transfer-item ${statusClass}" data-plan-id="${plan.id}">
                <div class="transfer-item-main">
                    <div class="transfer-item-info">
                        <div class="transfer-item-name">${plan.name}</div>
                        <div class="transfer-item-accounts">
                            ${fromAccount?.name || '未知帳戶'} → ${toAccount?.name || '未知帳戶'}
                        </div>
                        <div class="transfer-item-amount">NT$${plan.amount.toLocaleString('zh-TW')}</div>
                        <div class="transfer-item-schedule">${scheduleText}</div>
                    </div>
                    <div class="transfer-item-status">
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>
                </div>
                <div class="transfer-item-actions">
                    <button class="transfer-action-btn edit-btn" data-plan-id="${plan.id}">✏️</button>
                    <button class="transfer-action-btn toggle-btn" data-plan-id="${plan.id}">
                        ${plan.enabled ? '⏸️' : '▶️'}
                    </button>
                    <button class="transfer-action-btn delete-btn" data-plan-id="${plan.id}">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = plansHTML;
    
    // 綁定操作按鈕事件
    bindTransferItemEvents();
}

// 綁定轉帳項目事件
function bindTransferItemEvents() {
    // 編輯按鈕
    document.querySelectorAll('.transfer-action-btn.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const planId = e.target.dataset.planId;
            showAutoTransferSetupPage(planId);
        });
    });
    
    // 切換啟用狀態按鈕
    document.querySelectorAll('.transfer-action-btn.toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const planId = e.target.dataset.planId;
            toggleTransferPlan(planId);
        });
    });
    
    // 刪除按鈕
    document.querySelectorAll('.transfer-action-btn.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const planId = e.target.dataset.planId;
            deleteTransferPlan(planId);
        });
    });
}

// 取得記帳分類選項
function getAccountingCategories(type = 'transfer') {
    // 檢查是否有分類模組
    if (typeof allCategories !== 'undefined') {
        // 過濾出指定類型的分類
        return allCategories.filter(cat => cat.type === type);
    }
    
    // 如果沒有分類模組，返回預設分類
    if (type === 'transfer') {
        return [
            { name: '轉帳', icon: '🔄' },
            { name: '銀行轉帳', icon: '🏦' },
            { name: '跨行轉帳', icon: '💸' },
            { name: '帳戶間轉帳', icon: '💳' },
            { name: '現金轉帳', icon: '💵' },
            { name: '電子支付轉帳', icon: '📱' },
            { name: '信用卡轉帳', icon: '💳' },
            { name: '投資帳戶轉帳', icon: '📈' }
        ];
    } else if (type === 'expense') {
        return [
            { name: '水電瓦斯', icon: '💡' },
            { name: '網路 / 電信', icon: '📶' },
            { name: '保險', icon: '🛡️' },
            { name: '卡費', icon: '💳' },
            { name: '稅金', icon: '💰' },
            { name: '投資理財', icon: '📈' },
            { name: '手續費', icon: '🧮' },
            { name: '住房物業', icon: '🏢' },
            { name: '交通', icon: '🚇' },
            { name: '醫療', icon: '🏥' },
            { name: '教育', icon: '🎓' },
            { name: '娛樂', icon: '🎮' },
            { name: '其他支出', icon: '📦' }
        ];
    }
    
    return [];
}

// ⚠️ 自動轉帳功能已移除
// 此檔案已被停用，所有自動轉帳相關功能已從系統中移除
// 如需重新啟用，請恢復 index.html 中的 script 引用

console.log('自動轉帳功能已移除');

// 清理任何殘留的自動轉帳資料
function cleanupAutoTransferRemnants() {
    const keysToRemove = [
        'autoTransferPlans',
        'autoTransferMonthlyPrompted',
        'autoTransferWeeklyPrompted',
        'autoTransferQuarterlyPrompted',
        'autoTransferYearlyPrompted'
    ];
    
    keysToRemove.forEach(key => {
        localStorage.removeItem(key);
    });
    
    // 清除任何包含 autoTransfer 的資料
    Object.keys(localStorage).forEach(key => {
        if (key.includes('autoTransfer') || key.includes('transfer_')) {
            localStorage.removeItem(key);
        }
    });
}

// 自動清理殘留資料
cleanupAutoTransferRemnants();

// 顯示自動轉帳設定頁面
function showAutoTransferSetupPage(planId = null) {
    const plans = JSON.parse(localStorage.getItem('autoTransferPlans') || '[]');
    const plan = planId ? plans.find(p => p.id === planId) : null;
    
    // 確保能取得帳戶資料
    let accounts = [];
    try {
        accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
        console.log('原始帳戶資料：', accounts);
    } catch (e) {
        console.warn('無法取得帳戶資料');
    }
    
    // 如果沒有帳戶資料，建立預設測試帳戶
    if (accounts.length === 0) {
        accounts = [
            {
                id: 'default_account_1',
                name: '主要帳戶',
                currency: 'TWD',
                initialBalance: 50000
            },
            {
                id: 'default_account_2',
                name: '儲蓄帳戶',
                currency: 'TWD',
                initialBalance: 10000
            }
        ];
    }

    // 正規化帳戶資料：確保每個帳戶都有可用 id（避免 <option value=""> / value 空白）
    accounts = (Array.isArray(accounts) ? accounts : [])
        .filter(a => a && (a.name || a.id || a.accountId))
        .map((a, idx) => {
            const raw = (a.id ?? a.accountId ?? '').toString().trim();
            // 如果沒有 id，用帳戶名稱生成 id（避免 undefined）
            const normalizedId = raw || `account_${a.name?.replace(/\s+/g, '_') || idx}_${Date.now()}`;
            return {
                ...a,
                id: normalizedId
            };
        });
    
    const isEdit = !!plan;
    
    // 取得轉帳分類選項
    const transferCategories = getAccountingCategories('transfer');
    
    // 預設選擇帳戶邏輯
    let defaultFromAccount = '';
    let defaultToAccount = '';
    
    if (plan) {
        defaultFromAccount = plan.fromAccount || '';
        defaultToAccount = plan.toAccount || '';
    } else {
        // 新增時的預設選擇
        if (accounts.length >= 2) {
            defaultFromAccount = accounts[0].id;
            defaultToAccount = accounts[1].id;
        } else if (accounts.length === 1) {
            defaultFromAccount = accounts[0].id;
            defaultToAccount = accounts[0].id; // 只有一個帳戶時，預設為同一帳戶（用戶可以修改）
        }
    }

    // 若預設值不在帳戶清單中，回退到第一個帳戶
    if (accounts.length > 0) {
        if (!defaultFromAccount || !accounts.some(a => a.id === defaultFromAccount)) {
            defaultFromAccount = accounts[0].id;
        }
        if (!defaultToAccount || !accounts.some(a => a.id === defaultToAccount)) {
            defaultToAccount = accounts[Math.min(1, accounts.length - 1)].id;
        }
    }
    
    // 創建設定頁面
    const setupPage = document.createElement('div');
    setupPage.className = 'auto-transfer-setup-page';
    setupPage.id = 'autoTransferSetupPage';
    
    // 調試帳戶數據
    console.log('可用帳戶：', accounts);
    console.log('帳戶數量：', accounts.length);
    
    // 檢查帳戶數據是否為空
    if (!accounts || accounts.length === 0) {
        console.error('帳戶數據為空，使用預設帳戶');
        accounts = [
            {
                id: 'default_account_1',
                name: '主要帳戶',
                currency: 'TWD',
                initialBalance: 50000
            },
            {
                id: 'default_account_2',
                name: '儲蓄帳戶',
                currency: 'TWD',
                initialBalance: 10000
            }
        ];
        console.log('使用預設帳戶：', accounts);
    }
    
    // 生成帳戶選項HTML
    const fromAccountOptions = accounts.map(account => 
        `<option value="${account.id || ''}" ${defaultFromAccount === account.id ? 'selected' : ''}>
            ${account.name} (${account.currency}) - $${account.initialBalance?.toLocaleString('zh-TW') || 0}
        </option>`
    ).join('');
    
    const toAccountOptions = accounts.map(account => 
        `<option value="${account.id || ''}" ${defaultToAccount === account.id ? 'selected' : ''}>
            ${account.name} (${account.currency}) - $${account.initialBalance?.toLocaleString('zh-TW') || 0}
        </option>`
    ).join('');
    
    console.log('轉出帳戶選項HTML：', fromAccountOptions);
    console.log('轉入帳戶選項HTML：', toAccountOptions);
    
    setupPage.innerHTML = `
        <div class="auto-transfer-setup-header">
            <button class="auto-transfer-setup-back-btn" id="autoTransferSetupBackBtn">← 返回</button>
            <h2 class="auto-transfer-setup-title">${isEdit ? '編輯轉帳計劃' : '新增轉帳計劃'}</h2>
        </div>
        
        <div class="auto-transfer-setup-form">
            <div class="form-field">
                <label class="form-label">計劃名稱</label>
                <input type="text" class="form-input" id="transferNameInput" 
                       placeholder="例如：每月薪資轉儲蓄" 
                       value="${plan?.name || ''}">
            </div>
            
            <div class="form-field">
                <label class="form-label">轉出帳戶</label>
                <select class="form-select" id="transferFromAccount">
                    ${fromAccountOptions}
                </select>
            </div>
            
            <div class="form-field">
                <label class="form-label">轉入帳戶</label>
                <select class="form-select" id="transferToAccount">
                    ${toAccountOptions}
                </select>
            </div>
            
            <div class="form-field">
                <label class="form-label">轉帳分類</label>
                <select class="form-select" id="transferCategorySelect">
                    ${transferCategories.map(cat => `
                        <option value="${cat.name}" ${plan?.category === cat.name ? 'selected' : ''}>
                            ${cat.icon} ${cat.name}
                        </option>
                    `).join('')}
                </select>
            </div>
            
            <div class="form-field">
                <label class="form-label">轉帳金額</label>
                <input type="number" class="form-input" id="transferAmountInput" 
                       placeholder="請輸入轉帳金額" 
                       value="${plan?.amount || ''}" 
                       min="1" step="1">
            </div>
            
            <div class="form-field">
                <label class="form-label">轉帳頻率</label>
                <select class="form-select" id="transferFrequencySelect">
                    <option value="monthly" ${plan?.frequency === 'monthly' || !plan?.frequency ? 'selected' : ''}>每月</option>
                    <option value="weekly" ${plan?.frequency === 'weekly' ? 'selected' : ''}>每週</option>
                    <option value="quarterly" ${plan?.frequency === 'quarterly' ? 'selected' : ''}>每季</option>
                    <option value="yearly" ${plan?.frequency === 'yearly' ? 'selected' : ''}>每年</option>
                </select>
            </div>
            
            <div class="form-field" id="transferDayField">
                <label class="form-label">轉帳日期</label>
                <select class="form-select" id="transferDaySelect">
                    ${Array.from({length: 31}, (_, i) => i + 1).map(day => `
                        <option value="${day}" ${plan?.day === day ? 'selected' : ''}>
                            每月 ${day} 號
                        </option>
                    `).join('')}
                </select>
            </div>
            
            <div class="form-field" id="transferWeekdayField" style="display: none;">
                <label class="form-label">轉帳星期</label>
                <select class="form-select" id="transferWeekdaySelect">
                    <option value="1" ${plan?.weekday === 1 ? 'selected' : ''}>星期一</option>
                    <option value="2" ${plan?.weekday === 2 ? 'selected' : ''}>星期二</option>
                    <option value="3" ${plan?.weekday === 3 ? 'selected' : ''}>星期三</option>
                    <option value="4" ${plan?.weekday === 4 ? 'selected' : ''}>星期四</option>
                    <option value="5" ${plan?.weekday === 5 ? 'selected' : ''}>星期五</option>
                    <option value="6" ${plan?.weekday === 6 ? 'selected' : ''}>星期六</option>
                    <option value="0" ${plan?.weekday === 0 ? 'selected' : ''}>星期日</option>
                </select>
            </div>
            
            <div class="form-field" id="transferMonthField" style="display: none;">
                <label class="form-label">轉帳月份</label>
                <select class="form-select" id="transferMonthSelect">
                    <option value="1" ${plan?.month === 1 ? 'selected' : ''}>1月</option>
                    <option value="4" ${plan?.month === 4 ? 'selected' : ''}>4月</option>
                    <option value="7" ${plan?.month === 7 ? 'selected' : ''}>7月</option>
                    <option value="10" ${plan?.month === 10 ? 'selected' : ''}>10月</option>
                </select>
            </div>
            
            <div class="form-field">
                <label class="form-checkbox-label">
                    <input type="checkbox" class="form-checkbox" id="transferEnabledInput" 
                           ${plan?.enabled !== false ? 'checked' : ''}>
                    <span class="form-checkbox-text">啟用此轉帳計劃</span>
                </label>
            </div>
            
            <div class="form-field">
                <label class="form-label">備註（選填）</label>
                <textarea class="form-textarea" id="transferNoteInput" 
                          placeholder="新增備註說明">${plan?.note || ''}</textarea>
            </div>
            
            <div class="auto-transfer-setup-actions">
                <button class="form-submit-btn" id="transferSaveBtn">儲存</button>
                ${isEdit ? '<button class="form-delete-btn" id="transferDeleteBtn">刪除</button>' : ''}
            </div>
        </div>
    `;
    
    // 插入到管理頁面
    const managementPage = document.getElementById('autoTransferManagementPage');
    managementPage.style.display = 'none';
    managementPage.parentNode.insertBefore(setupPage, managementPage.nextSibling);

    // 強制設定預設選擇（避免 value 仍是空字串）
    const fromSelect = setupPage.querySelector('#transferFromAccount');
    const toSelect = setupPage.querySelector('#transferToAccount');
    if (fromSelect) {
        fromSelect.value = defaultFromAccount || fromSelect.value;
        if (!fromSelect.value && fromSelect.options?.length) {
            fromSelect.selectedIndex = 0;
        }
    }
    if (toSelect) {
        toSelect.value = defaultToAccount || toSelect.value;
        if (!toSelect.value && toSelect.options?.length) {
            toSelect.selectedIndex = Math.min(1, toSelect.options.length - 1);
        }
    }
    
    // 初始化事件監聽
    initAutoTransferSetupEvents(planId);
}

// 初始化自動轉帳設定事件
function initAutoTransferSetupEvents(planId) {
    // 返回按鈕
    const backBtn = document.getElementById('autoTransferSetupBackBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            closeAutoTransferSetupPage();
        });
    }
    
    // 頻率選擇變更事件
    const frequencySelect = document.getElementById('transferFrequencySelect');
    if (frequencySelect) {
        frequencySelect.addEventListener('change', (e) => {
            updateFrequencyFields(e.target.value);
        });
        // 初始化顯示正確的欄位
        updateFrequencyFields(frequencySelect.value);
    }
    
    // 儲存按鈕
    const saveBtn = document.getElementById('transferSaveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveAutoTransferPlan(planId);
        });
    }
    
    // 刪除按鈕（僅編輯模式）
    const deleteBtn = document.getElementById('transferDeleteBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (confirm('確定要刪除這個轉帳計劃嗎？')) {
                deleteTransferPlan(planId);
                closeAutoTransferSetupPage();
            }
        });
    }
}

// 根據頻率更新顯示欄位
function updateFrequencyFields(frequency) {
    const dayField = document.getElementById('transferDayField');
    const weekdayField = document.getElementById('transferWeekdayField');
    const monthField = document.getElementById('transferMonthField');
    
    // 隱藏所有欄位
    if (dayField) dayField.style.display = 'none';
    if (weekdayField) weekdayField.style.display = 'none';
    if (monthField) monthField.style.display = 'none';
    
    // 根據頻率顯示對應欄位
    switch (frequency) {
        case 'monthly':
            if (dayField) dayField.style.display = 'block';
            break;
        case 'weekly':
            if (weekdayField) weekdayField.style.display = 'block';
            break;
        case 'quarterly':
        case 'yearly':
            if (monthField) monthField.style.display = 'block';
            if (dayField) dayField.style.display = 'block';
            break;
    }
}

// 關閉自動轉帳設定頁面
function closeAutoTransferSetupPage() {
    const setupPage = document.getElementById('autoTransferSetupPage');
    const managementPage = document.getElementById('autoTransferManagementPage');
    
    if (setupPage) setupPage.remove();
    if (managementPage) managementPage.style.display = 'block';
}

// 儲存自動轉帳計劃
function saveAutoTransferPlan(planId = null) {
    // 添加延遲確保DOM元素已經創建
    setTimeout(() => {
        // 調試：檢查DOM元素是否存在
        const fromSelect = document.getElementById('transferFromAccount');
        const toSelect = document.getElementById('transferToAccount');
        
        const name = document.getElementById('transferNameInput')?.value.trim();
        // 某些情況下 select.value 可能為空（例如 option value 遺失），使用 option 的 value attribute 作為後備
        const fromAccount = (fromSelect?.value ||
            fromSelect?.selectedOptions?.[0]?.getAttribute('value') ||
            fromSelect?.options?.[fromSelect?.selectedIndex]?.getAttribute?.('value') ||
            '').toString().trim();
        const toAccount = (toSelect?.value ||
            toSelect?.selectedOptions?.[0]?.getAttribute('value') ||
            toSelect?.options?.[toSelect?.selectedIndex]?.getAttribute?.('value') ||
            '').toString().trim();
        const category = document.getElementById('transferCategorySelect')?.value || '儲蓄轉帳';
        const amount = parseFloat(document.getElementById('transferAmountInput')?.value) || 0;
        const frequency = document.getElementById('transferFrequencySelect')?.value || 'monthly';
        const day = parseInt(document.getElementById('transferDaySelect')?.value) || 1;
        const weekday = parseInt(document.getElementById('transferWeekdaySelect')?.value);
        const month = parseInt(document.getElementById('transferMonthSelect')?.value);
        const enabled = document.getElementById('transferEnabledInput')?.checked !== false;
        const note = document.getElementById('transferNoteInput')?.value.trim();
        
        // 調試DOM元素
        console.log('轉帳計劃數據：', {
            name,
            fromAccount,
            toAccount,
            category,
            amount,
            frequency,
            day,
            weekday,
            month,
            enabled,
            note
        });
        
        // 驗證
        if (!name) {
            alert('請輸入計劃名稱');
            return;
        }
        if (!fromAccount || !toAccount) {
            alert('請選擇轉出和轉入帳戶');
            console.error('帳戶選擇問題：', { fromAccount, toAccount });
            console.error('詳細信息：', {
                fromSelectElement: fromSelect,
                toSelectElement: toSelect,
                fromSelectOptions: Array.from(fromSelect?.options || []).map((opt, index) => ({ 
                    index,
                    value: opt.value, 
                    text: opt.text,
                    selected: opt.selected,
                    hasAttribute: opt.hasAttribute('value'),
                    getAttribute: opt.getAttribute('value')
                })),
                toSelectOptions: Array.from(toSelect?.options || []).map((opt, index) => ({ 
                    index,
                    value: opt.value, 
                    text: opt.text,
                    selected: opt.selected,
                    hasAttribute: opt.hasAttribute('value'),
                    getAttribute: opt.getAttribute('value')
                })),
                fromSelectSelectedIndex: fromSelect?.selectedIndex,
                toSelectSelectedIndex: toSelect?.selectedIndex,
                fromSelectSelectedValue: fromSelect?.options[fromSelect?.selectedIndex]?.value,
                toSelectSelectedValue: toSelect?.options[toSelect?.selectedIndex]?.value,
                fromSelectInnerHTML: fromSelect?.innerHTML,
                toSelectInnerHTML: toSelect?.innerHTML
            });
            return;
        }
        if (fromAccount === toAccount) {
            // 軟化驗證：允許相同帳戶，但給出提醒
            if (!confirm('轉出和轉入帳戶相同，確定要繼續嗎？\n\n這通常用於測試或特殊情況。')) {
                return;
            }
        }
        if (amount <= 0) {
            alert('請輸入有效的轉帳金額');
            return;
        }
        
        // 根據頻率驗證對應欄位
        switch (frequency) {
            case 'monthly':
                if (day < 1 || day > 31) {
                    alert('請選擇有效的轉帳日期');
                    return;
                }
                break;
            case 'weekly':
                if (weekday < 0 || weekday > 6) {
                    alert('請選擇有效的轉帳星期');
                    return;
                }
                break;
            case 'quarterly':
            case 'yearly':
                if (day < 1 || day > 31) {
                    alert('請選擇有效的轉帳日期');
                    return;
                }
                if (![1, 4, 7, 10].includes(month)) {
                    alert('請選擇有效的轉帳月份');
                    return;
                }
                break;
        }
        
        // 載入現有計劃
        const plans = JSON.parse(localStorage.getItem('autoTransferPlans') || '[]');
        
        if (planId) {
            // 編輯現有計劃
            const planIndex = plans.findIndex(p => p.id === planId);
            if (planIndex !== -1) {
                plans[planIndex] = {
                    ...plans[planIndex],
                    name,
                    fromAccount,
                    toAccount,
                    category,
                    amount,
                    frequency,
                    day,
                    weekday,
                    month,
                    enabled,
                    note,
                    updatedAt: new Date().toISOString()
                };
            }
        } else {
            // 新增計劃
            const newPlan = {
                id: 'transfer_' + Date.now(),
                name,
                fromAccount,
                toAccount,
                category,
                amount,
                frequency,
                day,
                weekday,
                month,
                enabled,
                note,
                createdAt: new Date().toISOString(),
                lastExecuted: null,
                executedCount: 0
            };
            plans.push(newPlan);
        }
        
        // 儲存
        localStorage.setItem('autoTransferPlans', JSON.stringify(plans));
        
        // 關閉設定頁面並重新載入列表
        closeAutoTransferSetupPage();
        loadAutoTransferPlans();
        
        // 顯示成功訊息
        alert(planId ? '轉帳計劃已更新' : '轉帳計劃已建立');
    }, 100); // setTimeout 結束
}

// 切換轉帳計劃啟用狀態
function toggleTransferPlan(planId) {
    const plans = JSON.parse(localStorage.getItem('autoTransferPlans') || '[]');
    const planIndex = plans.findIndex(p => p.id === planId);
    
    if (planIndex !== -1) {
        plans[planIndex].enabled = !plans[planIndex].enabled;
        plans[planIndex].updatedAt = new Date().toISOString();
        localStorage.setItem('autoTransferPlans', JSON.stringify(plans));
        loadAutoTransferPlans();
    }
}

// 刪除轉帳計劃
function deleteTransferPlan(planId) {
    if (!confirm('確定要刪除這個轉帳計劃嗎？此操作無法復原。')) {
        return;
    }
    
    const plans = JSON.parse(localStorage.getItem('autoTransferPlans') || '[]');
    const filteredPlans = plans.filter(p => p.id !== planId);
    localStorage.setItem('autoTransferPlans', JSON.stringify(filteredPlans));
    
    loadAutoTransferPlans();
}

// 取得帳戶資訊
function getAccountById(accountId) {
    // 嘗試從多個來源取得帳戶資料
    let accounts = [];
    
    // 嘗試從 localStorage 取得
    try {
        accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    } catch (e) {
        console.warn('無法從 localStorage 取得帳戶資料');
    }
    
    // 如果 localStorage 沒有資料，嘗試全域變數
    if (accounts.length === 0 && typeof window.getAccounts === 'function') {
        accounts = window.getAccounts();
    }
    
    // 如果還是沒有資料，嘗試直接從 script.js 的函數
    if (accounts.length === 0) {
        try {
            // 檢查是否在測試頁面，如果是則使用測試帳戶
            if (window.location.pathname.includes('auto-transfer-test.html')) {
                return {
                    id: accountId,
                    name: accountId.includes('test_account_1') ? '主要帳戶' :
                          accountId.includes('test_account_2') ? '儲蓄帳戶' :
                          accountId.includes('test_account_3') ? '投資帳戶' : '未知帳戶',
                    currency: 'TWD',
                    initialBalance: 50000
                };
            }
        } catch (e) {
            console.warn('無法取得帳戶資料');
        }
    }
    
    return accounts.find(a => a.id === accountId) || {
        id: accountId,
        name: '未知帳戶',
        currency: 'TWD',
        initialBalance: 0
    };
}

// 檢查並執行自動轉帳計劃
function checkAndExecuteAutoTransferPlans() {
    const today = new Date();
    const currentDay = today.getDate();
    const currentWeekday = today.getDay(); // 0=Sunday, 1=Monday, ...
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const currentMonthKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
    
    const plans = JSON.parse(localStorage.getItem('autoTransferPlans') || '[]');
    const enabledPlans = plans.filter(p => p.enabled);
    
    const promptedKey = 'autoTransferMonthlyPrompted';
    const promptedMap = JSON.parse(localStorage.getItem(promptedKey) || '{}');
    if (!promptedMap[currentMonthKey]) promptedMap[currentMonthKey] = {};
    
    enabledPlans.forEach(plan => {
        let shouldExecute = false;
        let executeKey = '';
        
        // 根據頻率檢查是否應該執行
        switch (plan.frequency) {
            case 'weekly':
                // 每週檢查
                const weekKey = `${currentYear}-W${Math.ceil((today - new Date(currentYear, 0, 1)) / 604800000)}`;
                if (!promptedMap[weekKey]) promptedMap[weekKey] = {};
                executeKey = weekKey;
                
                if (currentWeekday === (plan.weekday || 1)) {
                    const lastExecuted = plan.lastExecuted ? new Date(plan.lastExecuted) : null;
                    const daysSinceLastExecution = lastExecuted ? Math.floor((today - lastExecuted) / (1000 * 60 * 60 * 24)) : 999;
                    shouldExecute = daysSinceLastExecution >= 7;
                }
                break;
                
            case 'quarterly':
                // 每季檢查 (1月, 4月, 7月, 10月)
                if ([1, 4, 7, 10].includes(currentMonth) && currentDay >= (plan.day || 1)) {
                    const quarterKey = `${currentYear}-Q${Math.ceil(currentMonth / 3)}`;
                    if (!promptedMap[quarterKey]) promptedMap[quarterKey] = {};
                    executeKey = quarterKey;
                    
                    const lastExecuted = plan.lastExecuted ? new Date(plan.lastExecuted) : null;
                    shouldExecute = !lastExecuted || 
                        lastExecuted.getFullYear() !== currentYear || 
                        Math.ceil(lastExecuted.getMonth() + 1) !== Math.ceil(currentMonth / 3);
                }
                break;
                
            case 'yearly':
                // 每年檢查
                if (currentMonth === (plan.month || 1) && currentDay >= (plan.day || 1)) {
                    const yearKey = `${currentYear}-Y`;
                    if (!promptedMap[yearKey]) promptedMap[yearKey] = {};
                    executeKey = yearKey;
                    
                    const lastExecuted = plan.lastExecuted ? new Date(plan.lastExecuted) : null;
                    shouldExecute = !lastExecuted || lastExecuted.getFullYear() !== currentYear;
                }
                break;
                
            default: // monthly
                executeKey = currentMonthKey;
                if (currentDay >= (plan.day || 1)) {
                    const lastExecuted = plan.lastExecuted ? new Date(plan.lastExecuted) : null;
                    shouldExecute = !lastExecuted || 
                        lastExecuted.getFullYear() !== currentYear || 
                        lastExecuted.getMonth() + 1 !== currentMonth;
                }
        }
        
        if (shouldExecute) {
            // 避免同一計劃同時段反覆跳提醒
            const planId = String(plan.id || '');
            if (planId && promptedMap[executeKey] && promptedMap[executeKey][planId]) {
                return;
            }
            if (planId) {
                promptedMap[executeKey][planId] = true;
                localStorage.setItem(promptedKey, JSON.stringify(promptedMap));
            }
            
            // 提示用戶執行轉帳
            const fromAccount = getAccountById(plan.fromAccount);
            const toAccount = getAccountById(plan.toAccount);
            
            let scheduleText = '';
            switch (plan.frequency) {
                case 'weekly':
                    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
                    scheduleText = weekdays[plan.weekday || 1];
                    break;
                case 'quarterly':
                    scheduleText = `每${plan.month}月 ${plan.day}號`;
                    break;
                case 'yearly':
                    scheduleText = `每年${plan.month}月 ${plan.day}號`;
                    break;
                default:
                    scheduleText = `每月 ${plan.day} 號`;
            }
            
            if (confirm(`自動轉帳提醒：\n${plan.name}\n${fromAccount?.name || '未知帳戶'} → ${toAccount?.name || '未知帳戶'}\n${scheduleText}轉帳 NT$${plan.amount.toLocaleString('zh-TW')}\n\n是否現在執行轉帳？`)) {
                executeAutoTransfer(plan);
            }
        }
    });
}

// 更新帳戶餘額顯示
function updateAccountBalanceDisplay() {
    // 更新帳戶選擇器中的餘額顯示
    if (typeof updateAccountDisplay === 'function') {
        updateAccountDisplay();
    }
    
    // 更新帳戶列表顯示
    if (typeof displayAccounts === 'function') {
        displayAccounts();
    }
    
    // 觸發帳戶餘額重新計算
    const accounts = getAccounts();
    accounts.forEach(account => {
        const balance = calculateAccountBalance(account.id);
        // 可以在這裡更新帳戶對象的當前餘額（如果需要）
    });
}

// 執行自動轉帳
function executeAutoTransfer(plan) {
    const today = new Date().toISOString().split('T')[0];
    const fromAccount = getAccountById(plan.fromAccount);
    const toAccount = getAccountById(plan.toAccount);
    
    // 檢查轉出帳戶餘額是否足夠
    const fromAccountBalance = calculateAccountBalance(plan.fromAccount);
    if (fromAccountBalance < plan.amount) {
        alert(`轉帳失敗：\n${fromAccount?.name || '未知帳戶'}餘額不足\n目前餘額：NT$${fromAccountBalance.toLocaleString('zh-TW')}\n轉帳金額：NT$${plan.amount.toLocaleString('zh-TW')}`);
        return;
    }
    
    // 創建轉帳記錄 - 完全整合到記帳系統
    const transferRecord = {
        type: 'transfer',
        category: plan.category || '自動轉帳',
        subcategory: plan.name,
        amount: plan.amount,
        fromAccount: plan.fromAccount,
        toAccount: plan.toAccount,
        note: `${plan.name} - ${plan.category || '自動轉帳'}`,
        date: today,
        timestamp: new Date().toISOString(),
        autoTransfer: true,
        autoTransferPlanId: plan.id,
        // 記帳系統需要的額外欄位
        account: plan.fromAccount, // 轉出帳戶作為主要帳戶
        description: `${plan.name} - ${plan.note || ''}`,
        paymentMethod: '自動轉帳'
    };
    
    // 保存到記帳記錄
    const accountingRecords = JSON.parse(localStorage.getItem('accountingRecords') || '[]');
    accountingRecords.push(transferRecord);
    localStorage.setItem('accountingRecords', JSON.stringify(accountingRecords));
    
    // 更新轉帳計劃執行記錄
    const plans = JSON.parse(localStorage.getItem('autoTransferPlans') || '[]');
    const planIndex = plans.findIndex(p => p.id === plan.id);
    if (planIndex !== -1) {
        plans[planIndex].lastExecuted = new Date().toISOString();
        plans[planIndex].executedCount = (plans[planIndex].executedCount || 0) + 1;
        localStorage.setItem('autoTransferPlans', JSON.stringify(plans));
    }
    
    // 計算轉帳後的餘額
    const newFromBalance = calculateAccountBalance(plan.fromAccount);
    const newToBalance = calculateAccountBalance(plan.toAccount);
    
    // 觸發記帳系統更新
    if (typeof updateDailyExpense === 'function') {
        updateDailyExpense();
    }
    
    if (typeof initLedger === 'function') {
        initLedger();
    }
    
    // 更新帳戶餘額顯示
    updateAccountBalanceDisplay();
    
    // 顯示成功訊息（包含餘額變化）
    alert(`轉帳已完成：\n${fromAccount?.name || '未知帳戶'} → ${toAccount?.name || '未知帳戶'}\n金額：NT$${plan.amount.toLocaleString('zh-TW')}\n\n帳戶餘額更新：\n${fromAccount?.name || '未知帳戶'}：NT$${newFromBalance.toLocaleString('zh-TW')}\n${toAccount?.name || '未知帳戶'}：NT$${newToBalance.toLocaleString('zh-TW')}\n\n✅ 已自動記錄到記帳本`);
    
    // 顯示成功動畫
    if (typeof showSuccessAnimation === 'function') {
        showSuccessAnimation();
    }
    
    // 發送自定義事件，通知其他組件
    window.dispatchEvent(new CustomEvent('autoTransferExecuted', {
        detail: {
            plan: plan,
            record: transferRecord,
            fromAccount: fromAccount,
            toAccount: toAccount,
            fromBalance: newFromBalance,
            toBalance: newToBalance
        }
    }));
}

// 在頁面載入時檢查自動轉帳計劃
document.addEventListener('DOMContentLoaded', () => {
    // 延遲檢查，確保其他初始化完成
    setTimeout(() => {
        checkAndExecuteAutoTransferPlans();
    }, 2000);
});

// 擴展設置頁面事件處理
document.addEventListener('DOMContentLoaded', () => {
    // 監聽設置頁面的點擊事件
    const observer = new MutationObserver(() => {
        const settingsItems = document.querySelectorAll('.settings-item');
        settingsItems.forEach(item => {
            const action = item.dataset.action;
            if (action === 'autoTransfer' && !item.hasAttribute('data-auto-transfer-handled')) {
                item.setAttribute('data-auto-transfer-handled', 'true');
                item.addEventListener('click', () => {
                    showAutoTransferManagementPage();
                });
            }
        });
    });
    
    // 開始觀察
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // 立即檢查一次
    const settingsItems = document.querySelectorAll('.settings-item');
    settingsItems.forEach(item => {
        const action = item.dataset.action;
        if (action === 'autoTransfer' && !item.hasAttribute('data-auto-transfer-handled')) {
            item.setAttribute('data-auto-transfer-handled', 'true');
            item.addEventListener('click', () => {
                showAutoTransferManagementPage();
            });
        }
    });
});
