// ========== 自動繳費管理系統 ==========

// 取得記帳分類選項
function getAccountingCategories(type = 'expense') {
    // 檢查是否有分類模組
    if (typeof allCategories !== 'undefined') {
        // 過濾出指定類型的分類
        return allCategories.filter(cat => cat.type === type);
    }
    
    // 如果沒有分類模組，返回預設分類
    if (type === 'expense') {
        return [
            { name: '飲食', icon: '🍔' },
            { name: '外食 / 飲料', icon: '🧃' },
            { name: '日用品', icon: '🧻' },
            { name: '交通', icon: '🚇' },
            { name: '住房物業', icon: '🏢' },
            { name: '水電瓦斯', icon: '💡' },
            { name: '網路 / 電信', icon: '📶' },
            { name: '清潔用品', icon: '🧹' },
            { name: '娛樂', icon: '🎮' },
            { name: '醫療', icon: '🏥' },
            { name: '教育', icon: '🎓' },
            { name: '購物', icon: '🛍️' },
            { name: '服飾', icon: '👕' },
            { name: '化妝品', icon: '💄' },
            { name: '保養品', icon: '🧴' },
            { name: '運動', icon: '⚽' },
            { name: '健身', icon: '🏋️' },
            { name: '電影', icon: '🎬' },
            { name: '音樂', icon: '🎵' },
            { name: '書籍', icon: '📚' },
            { name: '咖啡', icon: '☕' },
            { name: '零食', icon: '🍫' },
            { name: '加油', icon: '⛽' },
            { name: '停車', icon: '🅿️' },
            { name: '保險', icon: '🛡️' },
            { name: '卡費', icon: '💳' },
            { name: '稅金', icon: '💰' },
            { name: '投資理財', icon: '📈' },
            { name: '手續費', icon: '🧮' },
            { name: '禮物', icon: '🎁' },
            { name: '旅行', icon: '🏖️' },
            { name: '寵物', icon: '🐾' },
            { name: '美髮', icon: '💇' },
            { name: '美甲', icon: '💅' },
            { name: '借出', icon: '💸' },
            { name: '其他支出', icon: '📦' },
            { name: '手機費', icon: '📱' },
            { name: '電費', icon: '⚡' },
            { name: '瓦斯費', icon: '🔥' },
            { name: '管理費', icon: '🏘️' },
            { name: '維修費', icon: '🔧' }
        ];
    }
    
    return [];
}

// 顯示自動繳費管理頁面
function showAutoPaymentManagementPage() {
    // 檢查是否已存在管理頁面
    let existingPage = document.getElementById('autoPaymentManagementPage');
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
    
    // 創建自動繳費管理頁面
    const paymentPage = document.createElement('div');
    paymentPage.className = 'auto-payment-management-page';
    paymentPage.id = 'autoPaymentManagementPage';
    paymentPage.innerHTML = `
        <div class="auto-payment-header">
            <button class="auto-payment-back-btn" id="autoPaymentBackBtn">← 返回</button>
            <h2 class="auto-payment-title">自動繳費管理</h2>
            <button class="auto-payment-add-btn" id="autoPaymentAddBtn">➕ 新增</button>
        </div>
        
        <div class="auto-payment-summary" id="autoPaymentSummary">
            <!-- 統計摘要將由 JavaScript 動態生成 -->
        </div>
        
        <div class="auto-payment-list-container" id="autoPaymentListContainer">
            <!-- 自動繳費計劃列表將由 JavaScript 動態生成 -->
        </div>
    `;
    
    // 插入到目標父元素中
    if (pageSettings) {
        targetParent.insertBefore(paymentPage, pageSettings.nextSibling);
    } else {
        // 如果沒有 pageSettings，直接添加到 body
        document.body.appendChild(paymentPage);
    }
    
    // 隱藏底部導航（如果存在）
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) bottomNav.style.display = 'none';
    
    // 初始化事件監聽
    initAutoPaymentEvents();
    
    // 載入繳費計劃列表
    loadAutoPaymentPlans();
}

// 初始化自動繳費事件監聽
function initAutoPaymentEvents() {
    // 返回按鈕
    const backBtn = document.getElementById('autoPaymentBackBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            closeAutoPaymentManagementPage();
        });
    }
    
    // 新增按鈕
    const addBtn = document.getElementById('autoPaymentAddBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            showAutoPaymentSetupPage();
        });
    }
}

// 關閉自動繳費管理頁面
function closeAutoPaymentManagementPage() {
    const paymentPage = document.getElementById('autoPaymentManagementPage');
    const pageSettings = document.getElementById('pageSettings');
    const bottomNav = document.querySelector('.bottom-nav');
    
    if (paymentPage) paymentPage.remove();
    if (pageSettings) pageSettings.style.display = 'block';
    if (bottomNav) bottomNav.style.display = 'flex';
}

// 載入自動繳費計劃列表
function loadAutoPaymentPlans() {
    const container = document.getElementById('autoPaymentListContainer');
    const summaryContainer = document.getElementById('autoPaymentSummary');
    if (!container) return;
    
    const plans = JSON.parse(localStorage.getItem('autoPaymentPlans') || '[]');
    
    // 生成統計摘要
    if (summaryContainer) {
        const enabledPlans = plans.filter(p => p.enabled);
        const totalMonthlyAmount = enabledPlans
            .filter(p => p.frequency === 'monthly')
            .reduce((sum, p) => sum + p.amount, 0);
        const totalYearlyAmount = enabledPlans
            .reduce((sum, p) => {
                if (p.frequency === 'monthly') return sum + (p.amount * 12);
                if (p.frequency === 'yearly') return sum + p.amount;
                if (p.frequency === 'quarterly') return sum + (p.amount * 4);
                return sum;
            }, 0);
        
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
                        <div class="summary-label">年總額</div>
                        <div class="summary-value">NT$${totalYearlyAmount.toLocaleString('zh-TW')}</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    if (plans.length === 0) {
        container.innerHTML = `
            <div class="auto-payment-empty">
                <div class="empty-icon">💳</div>
                <div class="empty-text">尚未設定自動繳費計劃</div>
                <div class="empty-subtext">點擊「新增」建立第一個繳費計劃</div>
            </div>
        `;
        return;
    }
    
    const plansHTML = plans.map(plan => {
        const account = getAccountById(plan.account);
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
            <div class="auto-payment-item ${statusClass}" data-plan-id="${plan.id}">
                <div class="payment-item-main">
                    <div class="payment-item-info">
                        <div class="payment-item-name">${plan.name}</div>
                        <div class="payment-item-provider">${plan.provider || '未知提供商'}</div>
                        <div class="payment-item-account">付款帳戶：${account?.name || '未知帳戶'}</div>
                        <div class="payment-item-amount">NT$${plan.amount.toLocaleString('zh-TW')}</div>
                        <div class="payment-item-schedule">${scheduleText}</div>
                    </div>
                    <div class="payment-item-status">
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>
                </div>
                <div class="payment-item-actions">
                    <button class="payment-action-btn edit-btn" data-plan-id="${plan.id}">✏️</button>
                    <button class="payment-action-btn toggle-btn" data-plan-id="${plan.id}">
                        ${plan.enabled ? '⏸️' : '▶️'}
                    </button>
                    <button class="payment-action-btn delete-btn" data-plan-id="${plan.id}">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = plansHTML;
    
    // 綁定操作按鈕事件
    bindPaymentItemEvents();
}

// 綁定繳費項目事件
function bindPaymentItemEvents() {
    // 編輯按鈕
    document.querySelectorAll('.payment-action-btn.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const planId = e.target.dataset.planId;
            showAutoPaymentSetupPage(planId);
        });
    });
    
    // 切換啟用狀態按鈕
    document.querySelectorAll('.payment-action-btn.toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const planId = e.target.dataset.planId;
            togglePaymentPlan(planId);
        });
    });
    
    // 刪除按鈕
    document.querySelectorAll('.payment-action-btn.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const planId = e.target.dataset.planId;
            deletePaymentPlan(planId);
        });
    });
}

// 顯示自動繳費設定頁面
function showAutoPaymentSetupPage(planId = null) {
    const plans = JSON.parse(localStorage.getItem('autoPaymentPlans') || '[]');
    const plan = planId ? plans.find(p => p.id === planId) : null;
    
    // 確保能取得帳戶資料
    let accounts = [];
    try {
        accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
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
            }
        ];
    }

    // 正規化帳戶資料：確保每個帳戶都有可用 id（避免 <option value=""> / value 空白）
    accounts = (Array.isArray(accounts) ? accounts : [])
        .filter(a => a && (a.name || a.id || a.accountId))
        .map((a, idx) => {
            const raw = (a.id ?? a.accountId ?? '').toString().trim();
            const normalizedId = raw || `account_${Date.now()}_${idx}`;
            return {
                ...a,
                id: normalizedId
            };
        });
    
    const isEdit = !!plan;
    
    // 取得繳費分類選項
    const paymentCategories = getAccountingCategories('expense');
    
    // 預設選擇帳戶邏輯
    let defaultAccount = '';
    
    if (plan) {
        defaultAccount = plan.account || '';
    } else {
        // 新增時的預設選擇
        defaultAccount = accounts[0]?.id || '';
    }

    // 若預設值不在帳戶清單中，回退到第一個帳戶
    if (accounts.length > 0 && (!defaultAccount || !accounts.some(a => a.id === defaultAccount))) {
        defaultAccount = accounts[0].id;
    }
    
    // 創建設定頁面
    const setupPage = document.createElement('div');
    setupPage.className = 'auto-payment-setup-page';
    setupPage.id = 'autoPaymentSetupPage';
    setupPage.innerHTML = `
        <div class="auto-payment-setup-header">
            <button class="auto-payment-setup-back-btn" id="autoPaymentSetupBackBtn">← 返回</button>
            <h2 class="auto-payment-setup-title">${isEdit ? '編輯繳費計劃' : '新增繳費計劃'}</h2>
        </div>
        
        <div class="auto-payment-setup-form">
            <div class="form-field">
                <label class="form-label">繳費項目名稱</label>
                <input type="text" class="form-input" id="paymentNameInput" 
                       placeholder="例如：電費、水費、保費" 
                       value="${plan?.name || ''}">
            </div>
            
            <div class="form-field">
                <label class="form-label">服務提供商</label>
                <input type="text" class="form-input" id="paymentProviderInput" 
                       placeholder="例如：台電、台水、保險公司" 
                       value="${plan?.provider || ''}">
            </div>
            
            <div class="form-field">
                <label class="form-label">繳費分類</label>
                <select class="form-select" id="paymentCategorySelect">
                    ${paymentCategories.map(cat => `
                        <option value="${cat.name}" ${plan?.category === cat.name ? 'selected' : ''}>
                            ${cat.icon} ${cat.name}
                        </option>
                    `).join('')}
                </select>
            </div>
            
            <div class="form-field">
                <label class="form-label">付款帳戶</label>
                <select class="form-select" id="paymentAccountSelect">
                    ${accounts.map(account => `
                        <option value="${account.id}" ${plan?.account === account.id ? 'selected' : ''}>
                            ${account.name} (${account.currency}) - $${account.initialBalance?.toLocaleString('zh-TW') || 0}
                        </option>
                    `).join('')}
                </select>
            </div>
            
            <div class="form-field">
                <label class="form-label">繳費金額</label>
                <input type="number" class="form-input" id="paymentAmountInput" 
                       placeholder="請輸入繳費金額" 
                       value="${plan?.amount || ''}" 
                       min="1" step="1">
            </div>
            
            <div class="form-field">
                <label class="form-label">繳費頻率</label>
                <select class="form-select" id="paymentFrequencySelect">
                    <option value="monthly" ${plan?.frequency === 'monthly' || !plan?.frequency ? 'selected' : ''}>每月</option>
                    <option value="quarterly" ${plan?.frequency === 'quarterly' ? 'selected' : ''}>每季</option>
                    <option value="yearly" ${plan?.frequency === 'yearly' ? 'selected' : ''}>每年</option>
                </select>
            </div>
            
            <div class="form-field" id="paymentDayField">
                <label class="form-label">繳費日期</label>
                <select class="form-select" id="paymentDaySelect">
                    ${Array.from({length: 31}, (_, i) => i + 1).map(day => `
                        <option value="${day}" ${plan?.day === day ? 'selected' : ''}>
                            每月 ${day} 號
                        </option>
                    `).join('')}
                </select>
            </div>
            
            <div class="form-field" id="paymentMonthField" style="display: none;">
                <label class="form-label">繳費月份</label>
                <select class="form-select" id="paymentMonthSelect">
                    <option value="1" ${plan?.month === 1 ? 'selected' : ''}>1月</option>
                    <option value="4" ${plan?.month === 4 ? 'selected' : ''}>4月</option>
                    <option value="7" ${plan?.month === 7 ? 'selected' : ''}>7月</option>
                    <option value="10" ${plan?.month === 10 ? 'selected' : ''}>10月</option>
                </select>
            </div>
            
            <div class="form-field">
                <label class="form-checkbox-label">
                    <input type="checkbox" class="form-checkbox" id="paymentEnabledInput" 
                           ${plan?.enabled !== false ? 'checked' : ''}>
                    <span class="form-checkbox-text">啟用此繳費計劃</span>
                </label>
            </div>
            
            <div class="form-field">
                <label class="form-label">備註（選填）</label>
                <textarea class="form-textarea" id="paymentNoteInput" 
                          placeholder="新增備註說明">${plan?.note || ''}</textarea>
            </div>
            
            <div class="auto-payment-setup-actions">
                <button class="form-submit-btn" id="paymentSaveBtn">儲存</button>
                ${isEdit ? '<button class="form-delete-btn" id="paymentDeleteBtn">刪除</button>' : ''}
            </div>
        </div>
    `;
    
    // 插入到管理頁面
    const managementPage = document.getElementById('autoPaymentManagementPage');
    managementPage.style.display = 'none';
    managementPage.parentNode.insertBefore(setupPage, managementPage.nextSibling);

    // 強制設定預設選擇（避免 value 仍是空字串）
    const accountSelect = setupPage.querySelector('#paymentAccountSelect');
    if (accountSelect) {
        accountSelect.value = defaultAccount || accountSelect.value;
        if (!accountSelect.value && accountSelect.options?.length) {
            accountSelect.selectedIndex = 0;
        }
    }
    
    // 初始化事件監聽
    initAutoPaymentSetupEvents(planId);
}

// 初始化自動繳費設定事件
function initAutoPaymentSetupEvents(planId) {
    // 返回按鈕
    const backBtn = document.getElementById('autoPaymentSetupBackBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            closeAutoPaymentSetupPage();
        });
    }
    
    // 頻率選擇變更事件
    const frequencySelect = document.getElementById('paymentFrequencySelect');
    if (frequencySelect) {
        frequencySelect.addEventListener('change', (e) => {
            updatePaymentFrequencyFields(e.target.value);
        });
        // 初始化顯示正確的欄位
        updatePaymentFrequencyFields(frequencySelect.value);
    }
    
    // 儲存按鈕
    const saveBtn = document.getElementById('paymentSaveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveAutoPaymentPlan(planId);
        });
    }
    
    // 刪除按鈕（僅編輯模式）
    const deleteBtn = document.getElementById('paymentDeleteBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (confirm('確定要刪除這個繳費計劃嗎？')) {
                deletePaymentPlan(planId);
                closeAutoPaymentSetupPage();
            }
        });
    }
}

// 根據頻率更新顯示欄位
function updatePaymentFrequencyFields(frequency) {
    const dayField = document.getElementById('paymentDayField');
    const monthField = document.getElementById('paymentMonthField');
    
    // 隱藏所有欄位
    if (dayField) dayField.style.display = 'none';
    if (monthField) monthField.style.display = 'none';
    
    // 根據頻率顯示對應欄位
    switch (frequency) {
        case 'monthly':
            if (dayField) dayField.style.display = 'block';
            break;
        case 'quarterly':
        case 'yearly':
            if (monthField) monthField.style.display = 'block';
            if (dayField) dayField.style.display = 'block';
            break;
    }
}

// 關閉自動繳費設定頁面
function closeAutoPaymentSetupPage() {
    const setupPage = document.getElementById('autoPaymentSetupPage');
    const managementPage = document.getElementById('autoPaymentManagementPage');
    
    if (setupPage) setupPage.remove();
    if (managementPage) managementPage.style.display = 'block';
}

// 儲存自動繳費計劃
function saveAutoPaymentPlan(planId = null) {
    const name = document.getElementById('paymentNameInput')?.value.trim();
    const provider = document.getElementById('paymentProviderInput')?.value.trim();
    const category = document.getElementById('paymentCategorySelect')?.value || '其他費用';
    const account = document.getElementById('paymentAccountSelect')?.value;
    const amount = parseFloat(document.getElementById('paymentAmountInput')?.value) || 0;
    const frequency = document.getElementById('paymentFrequencySelect')?.value || 'monthly';
    const day = parseInt(document.getElementById('paymentDaySelect')?.value) || 1;
    const month = parseInt(document.getElementById('paymentMonthSelect')?.value);
    const enabled = document.getElementById('paymentEnabledInput')?.checked !== false;
    const note = document.getElementById('paymentNoteInput')?.value.trim();
    
    // 調試信息
    console.log('繳費計劃數據：', {
        name,
        provider,
        category,
        account,
        amount,
        frequency,
        day,
        month,
        enabled,
        note
    });
    
    // 驗證
    if (!name) {
        alert('請輸入繳費項目名稱');
        return;
    }
    if (!provider) {
        alert('請輸入服務提供商');
        return;
    }
    if (!account) {
        alert('請選擇付款帳戶');
        console.error('帳戶選擇問題：', { account });
        return;
    }
    if (amount <= 0) {
        alert('請輸入有效的繳費金額');
        return;
    }
    
    // 根據頻率驗證對應欄位
    switch (frequency) {
        case 'monthly':
            if (day < 1 || day > 31) {
                alert('請選擇有效的繳費日期');
                return;
            }
            break;
        case 'quarterly':
        case 'yearly':
            if (day < 1 || day > 31) {
                alert('請選擇有效的繳費日期');
                return;
            }
            if (![1, 4, 7, 10].includes(month)) {
                alert('請選擇有效的繳費月份');
                return;
            }
            break;
    }
    
    // 載入現有計劃
    const plans = JSON.parse(localStorage.getItem('autoPaymentPlans') || '[]');
    
    if (planId) {
        // 編輯現有計劃
        const planIndex = plans.findIndex(p => p.id === planId);
        if (planIndex !== -1) {
            plans[planIndex] = {
                ...plans[planIndex],
                name,
                provider,
                category,
                account,
                amount,
                frequency,
                day,
                month,
                enabled,
                note,
                updatedAt: new Date().toISOString()
            };
        }
    } else {
        // 新增計劃
        const newPlan = {
            id: 'payment_' + Date.now(),
            name,
            provider,
            category,
            account,
            amount,
            frequency,
            day,
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
    localStorage.setItem('autoPaymentPlans', JSON.stringify(plans));
    
    // 關閉設定頁面並重新載入列表
    closeAutoPaymentSetupPage();
    loadAutoPaymentPlans();
    
    // 顯示成功訊息
    alert(planId ? '繳費計劃已更新' : '繳費計劃已建立');
}

// 切換繳費計劃啟用狀態
function togglePaymentPlan(planId) {
    const plans = JSON.parse(localStorage.getItem('autoPaymentPlans') || '[]');
    const planIndex = plans.findIndex(p => p.id === planId);
    
    if (planIndex !== -1) {
        plans[planIndex].enabled = !plans[planIndex].enabled;
        plans[planIndex].updatedAt = new Date().toISOString();
        localStorage.setItem('autoPaymentPlans', JSON.stringify(plans));
        loadAutoPaymentPlans();
    }
}

// 刪除繳費計劃
function deletePaymentPlan(planId) {
    if (!confirm('確定要刪除這個繳費計劃嗎？此操作無法復原。')) {
        return;
    }
    
    const plans = JSON.parse(localStorage.getItem('autoPaymentPlans') || '[]');
    const filteredPlans = plans.filter(p => p.id !== planId);
    localStorage.setItem('autoPaymentPlans', JSON.stringify(filteredPlans));
    
    loadAutoPaymentPlans();
}

// 取得帳戶資訊 (共用函數)
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

// 初始化自動繳費功能
function initAutoPayment() {
    // 延遲添加，確保設置頁面已經載入
    setTimeout(() => {
        addAutoPaymentSettingsItem();
    }, 500);
    
    // 檢查並執行自動繳費計劃
    checkAndExecuteAutoPaymentPlans();
}

// 在設置頁面添加自動扣款選項
function addAutoPaymentSettingsItem() {
    const settingsList = document.getElementById('settingsList');
    if (!settingsList) {
        console.log('設置列表未找到，稍後重試...');
        setTimeout(() => addAutoPaymentSettingsItem(), 1000);
        return;
    }
    
    // 檢查是否已經添加過
    if (document.getElementById('autoPaymentSettingsItem')) {
        console.log('自動扣款選項已存在');
        return;
    }
    
    console.log('正在添加自動扣款選項到設置頁面...');
    
    // 創建自動扣款設置項目
    const autoPaymentItem = document.createElement('div');
    autoPaymentItem.className = 'settings-item';
    autoPaymentItem.id = 'autoPaymentSettingsItem';
    autoPaymentItem.innerHTML = `
        <div class="settings-item-content">
            <div class="settings-item-icon">💳</div>
            <div class="settings-item-info">
                <h3 class="settings-item-title">自動扣款管理</h3>
                <p class="settings-item-desc">設定和管理自動繳費計劃</p>
            </div>
            <div class="settings-item-arrow">→</div>
        </div>
    `;
    
    // 添加點擊事件
    autoPaymentItem.addEventListener('click', () => {
        console.log('點擊自動扣款管理');
        showAutoPaymentManagementPage();
    });
    
    // 插入到設置列表的開頭
    settingsList.insertBefore(autoPaymentItem, settingsList.firstChild);
    console.log('自動扣款選項已成功添加到設置頁面');
}

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    initAutoPayment();
});

// 如果 DOMContentLoaded 已經觸發，直接初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAutoPayment);
} else {
    initAutoPayment();
}

// 檢查並執行自動繳費計劃
function checkAndExecuteAutoPaymentPlans() {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const currentMonthKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
    
    const plans = JSON.parse(localStorage.getItem('autoPaymentPlans') || '[]');
    const enabledPlans = plans.filter(p => p.enabled);
    
    const promptedKey = 'autoPaymentMonthlyPrompted';
    const promptedMap = JSON.parse(localStorage.getItem(promptedKey) || '{}');
    if (!promptedMap[currentMonthKey]) promptedMap[currentMonthKey] = {};
    
    enabledPlans.forEach(plan => {
        let shouldExecute = false;
        let executeKey = '';
        
        // 根據頻率檢查是否應該執行
        switch (plan.frequency) {
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
            
            // 提示用戶執行繳費
            const account = getAccountById(plan.account);
            
            let scheduleText = '';
            switch (plan.frequency) {
                case 'quarterly':
                    scheduleText = `每${plan.month}月 ${plan.day}號`;
                    break;
                case 'yearly':
                    scheduleText = `每年${plan.month}月 ${plan.day}號`;
                    break;
                default:
                    scheduleText = `每月 ${plan.day} 號`;
            }
            
            if (confirm(`自動繳費提醒：\n${plan.name} - ${plan.provider || '未知提供商'}\n付款帳戶：${account?.name || '未知帳戶'}\n${scheduleText}繳費 NT$${plan.amount.toLocaleString('zh-TW')}\n\n是否現在執行繳費？`)) {
                executeAutoPayment(plan);
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

// 更新預算使用情況
function updateBudgetUsage(category, amount) {
    // 檢查是否有預算系統
    try {
        const categoryBudgets = JSON.parse(localStorage.getItem('categoryBudgets') || '{}');
        const categoryEnabledState = JSON.parse(localStorage.getItem('categoryEnabledState') || '{}');
        
        // 檢查該分類是否啟用預算
        if (categoryEnabledState[category] && categoryBudgets[category]) {
            // 計算本月該分類的支出
            const today = new Date();
            const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
            
            const accountingRecords = JSON.parse(localStorage.getItem('accountingRecords') || '[]');
            const monthExpenses = accountingRecords.filter(record => {
                if (record.type !== 'expense' || record.category !== category) return false;
                const recordMonth = record.date.substring(0, 7); // YYYY-MM
                return recordMonth === currentMonth;
            });
            
            const totalExpense = monthExpenses.reduce((sum, record) => sum + record.amount, 0);
            const budget = categoryBudgets[category];
            const remaining = budget - totalExpense;
            const percentage = (totalExpense / budget) * 100;
            
            // 可以在這裡觸發預算警告
            if (percentage >= 100) {
                console.warn(`預算警告：${category} 已超出預算！`);
                // 可以發送通知或更新UI
            } else if (percentage >= 80) {
                console.warn(`預算提醒：${category} 已使用 ${percentage.toFixed(1)}%`);
            }
            
            return {
                budget,
                used: totalExpense,
                remaining,
                percentage
            };
        }
    } catch (e) {
        console.warn('更新預算使用情況失敗:', e);
    }
    
    return null;
}

// 執行自動繳費
function executeAutoPayment(plan) {
    const today = new Date().toISOString().split('T')[0];
    const account = getAccountById(plan.account);
    
    // 檢查帳戶餘額是否足夠
    const accountBalance = calculateAccountBalance(plan.account);
    if (accountBalance < plan.amount) {
        alert(`繳費失敗：\n${account?.name || '未知帳戶'}餘額不足\n目前餘額：NT$${accountBalance.toLocaleString('zh-TW')}\n繳費金額：NT$${plan.amount.toLocaleString('zh-TW')}`);
        return;
    }
    
    // 創建繳費記錄 - 完全整合到記帳系統
    const paymentRecord = {
        type: 'expense',
        category: plan.category || '自動繳費',
        subcategory: plan.provider || '其他提供商',
        amount: plan.amount,
        account: plan.account,
        note: `${plan.name} - ${plan.provider || '未知提供商'} - ${plan.category || '自動繳費'}`,
        date: today,
        timestamp: new Date().toISOString(),
        autoPayment: true,
        autoPaymentPlanId: plan.id,
        // 記帳系統需要的額外欄位
        description: `${plan.name} - ${plan.note || ''}`,
        paymentMethod: '自動繳費',
        provider: plan.provider
    };
    
    // 保存到記帳記錄
    const accountingRecords = JSON.parse(localStorage.getItem('accountingRecords') || '[]');
    accountingRecords.push(paymentRecord);
    localStorage.setItem('accountingRecords', JSON.stringify(accountingRecords));
    
    // 更新繳費計劃執行記錄
    const plans = JSON.parse(localStorage.getItem('autoPaymentPlans') || '[]');
    const planIndex = plans.findIndex(p => p.id === plan.id);
    if (planIndex !== -1) {
        plans[planIndex].lastExecuted = new Date().toISOString();
        plans[planIndex].executedCount = (plans[planIndex].executedCount || 0) + 1;
        localStorage.setItem('autoPaymentPlans', JSON.stringify(plans));
    }
    
    // 計算繳費後的餘額
    const newBalance = calculateAccountBalance(plan.account);
    
    // 更新預算使用情況
    const budgetInfo = updateBudgetUsage(plan.category, plan.amount);
    
    // 觸發記帳系統更新
    if (typeof updateDailyExpense === 'function') {
        updateDailyExpense();
    }
    
    if (typeof initLedger === 'function') {
        initLedger();
    }
    
    // 更新帳戶餘額顯示
    updateAccountBalanceDisplay();
    
    // 建立成功訊息
    let successMessage = `繳費已完成：\n${plan.name} - ${plan.provider || '未知提供商'}\n付款帳戶：${account?.name || '未知帳戶'}\n金額：NT$${plan.amount.toLocaleString('zh-TW')}\n\n帳戶餘額更新：\n${account?.name || '未知帳戶'}：NT$${newBalance.toLocaleString('zh-TW')}`;
    
    // 添加預算信息
    if (budgetInfo) {
        successMessage += `\n\n預算使用情況：\n${plan.category}：NT$${budgetInfo.used.toLocaleString('zh-TW')} / NT$${budgetInfo.budget.toLocaleString('zh-TW')} (${budgetInfo.percentage.toFixed(1)}%)`;
        if (budgetInfo.remaining < 0) {
            successMessage += `\n⚠️ 已超出預算 NT$${Math.abs(budgetInfo.remaining).toLocaleString('zh-TW')}`;
        } else {
            successMessage += `\n剩餘預算：NT$${budgetInfo.remaining.toLocaleString('zh-TW')}`;
        }
    }
    
    successMessage += `\n\n✅ 已自動記錄到記帳本`;
    
    // 顯示成功訊息
    alert(successMessage);
    
    // 顯示成功動畫
    if (typeof showSuccessAnimation === 'function') {
        showSuccessAnimation();
    }
    
    // 發送自定義事件，通知其他組件
    window.dispatchEvent(new CustomEvent('autoPaymentExecuted', {
        detail: {
            plan: plan,
            record: paymentRecord,
            account: account,
            balance: newBalance,
            budgetInfo: budgetInfo
        }
    }));
}

// 在頁面載入時檢查自動繳費計劃
document.addEventListener('DOMContentLoaded', () => {
    // 延遲檢查，確保其他初始化完成
    setTimeout(() => {
        checkAndExecuteAutoPaymentPlans();
    }, 3000);
});

// 擴展設置頁面事件處理
document.addEventListener('DOMContentLoaded', () => {
    // 監聽設置頁面的點擊事件
    const observer = new MutationObserver(() => {
        const settingsItems = document.querySelectorAll('.settings-item');
        settingsItems.forEach(item => {
            const action = item.dataset.action;
            if (action === 'autoPayment' && !item.hasAttribute('data-auto-payment-handled')) {
                item.setAttribute('data-auto-payment-handled', 'true');
                item.addEventListener('click', () => {
                    showAutoPaymentManagementPage();
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
        if (action === 'autoPayment' && !item.hasAttribute('data-auto-payment-handled')) {
            item.setAttribute('data-auto-payment-handled', 'true');
            item.addEventListener('click', () => {
                showAutoPaymentManagementPage();
            });
        }
    });
});
