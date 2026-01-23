// ========== 更新提示系統 ==========

class UpdateNotificationSystem {
    constructor() {
        this.modal = null;
        this.isInitialized = false;
        this.updateQueue = [];
        this.currentUpdate = null;
        
        // 初始化
        this.init();
    }

    init() {
        // 等待DOM載入完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.modal = document.getElementById('updateNotificationModal');
        if (!this.modal) {
            console.warn('Update notification modal not found');
            return;
        }

        this.bindEvents();
        this.checkForUpdates();
        this.isInitialized = true;
    }

    bindEvents() {
        // 關閉按鈕
        const closeBtn = document.getElementById('updateNotificationClose');
        const skipBtn = document.getElementById('updateSkipBtn');
        const exploreBtn = document.getElementById('updateExploreBtn');

        if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
        if (skipBtn) skipBtn.addEventListener('click', () => this.skipUpdate());
        if (exploreBtn) exploreBtn.addEventListener('click', () => this.exploreUpdate());

        // 點擊遮罩關閉
        const overlay = this.modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => this.closeModal());
        }

        // ESC鍵關閉
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display !== 'none') {
                this.closeModal();
            }
        });
    }

    // 檢查是否有更新
    checkForUpdates() {
        const lastVersion = localStorage.getItem('appLastVersion') || '1.0.0';
        const currentVersion = this.getCurrentVersion();
        
        // 檢查版本更新
        if (this.compareVersions(currentVersion, lastVersion) > 0) {
            this.addUpdate({
                type: 'version',
                title: '版本更新',
                subtitle: `新版本 ${currentVersion} 已發布！`,
                content: '應用程式已更新到最新版本，包含多項改進和新功能。',
                features: this.getVersionFeatures(currentVersion),
                version: currentVersion
            });
        }

        // 檢查新主題
        this.checkNewThemes();
        
        // 檢查新功能
        this.checkNewFeatures();

        // 如果有更新，顯示第一個
        if (this.updateQueue.length > 0) {
            setTimeout(() => this.showNextUpdate(), 1000);
        }
    }

    // 獲取當前版本
    getCurrentVersion() {
        return localStorage.getItem('appVersion') || '2.0.0';
    }

    // 比較版本號
    compareVersions(v1, v2) {
        const parts1 = v1.split('.').map(Number);
        const parts2 = v2.split('.').map(Number);
        
        for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
            const part1 = parts1[i] || 0;
            const part2 = parts2[i] || 0;
            
            if (part1 > part2) return 1;
            if (part1 < part2) return -1;
        }
        
        return 0;
    }

    // 獲取版本功能
    getVersionFeatures(version) {
        const features = {
            '2.0.0': [
                { icon: '🎨', title: '全新主題系統', desc: '支援多種精美主題，個人化您的記帳體驗' },
                { icon: '📊', title: '智慧分析', desc: 'AI驅動的支出分析和建議' },
                { icon: '🔔', title: '智慧提醒', desc: '個人化的記帳提醒和目標追蹤' }
            ],
            '2.1.0': [
                { icon: '🌟', title: '動畫優化', desc: '更流暢的介面動畫效果' },
                { icon: '🎯', title: '目標管理', desc: '設定和追蹤儲蓄目標' }
            ]
        };
        
        return features[version] || [
            { icon: '✨', title: '性能提升', desc: '應用程式運行更加流暢' },
            { icon: '🛡️', title: '安全性增強', desc: '加強資料保護和隱私安全' }
        ];
    }

    // 檢查新主題
    checkNewThemes() {
        const knownThemes = JSON.parse(localStorage.getItem('knownThemes') || '[]');
        const currentThemes = this.getCurrentThemes();
        
        const newThemes = currentThemes.filter(theme => !knownThemes.includes(theme.id));
        
        if (newThemes.length > 0) {
            this.addUpdate({
                type: 'theme',
                title: '新主題上線！',
                subtitle: `發現 ${newThemes.length} 個精美新主題`,
                content: '設計師為您準備了全新的主題風格，快來體驗吧！',
                features: newThemes.map(theme => ({
                    icon: theme.icon || '🎨',
                    title: theme.name,
                    desc: `點擊體驗${theme.name}的獨特風格`
                })),
                themes: newThemes
            });
            
            // 更新已知主題列表
            localStorage.setItem('knownThemes', JSON.stringify(currentThemes.map(t => t.id)));
        }
    }

    // 獲取當前主題列表
    getCurrentThemes() {
        if (window.AppThemes && Array.isArray(window.AppThemes)) {
            return window.AppThemes;
        }
        
        // 從 theme.js 獲取主題
        if (window.themes && Array.isArray(window.themes)) {
            return window.themes;
        }
        
        return [];
    }

    // 檢查新功能
    checkNewFeatures() {
        const knownFeatures = JSON.parse(localStorage.getItem('knownFeatures') || '[]');
        const currentFeatures = this.getCurrentFeatures();
        
        const newFeatures = currentFeatures.filter(feature => !knownFeatures.includes(feature.id));
        
        if (newFeatures.length > 0) {
            this.addUpdate({
                type: 'feature',
                title: '新功能推出！',
                subtitle: `${newFeatures.length} 個實用新功能等您探索`,
                content: '我們新增了多項實用功能，讓記帳更加便捷高效。',
                features: newFeatures.map(feature => ({
                    icon: feature.icon || '✨',
                    title: feature.name,
                    desc: feature.description
                })),
                featuresList: newFeatures
            });
            
            // 更新已知功能列表
            localStorage.setItem('knownFeatures', JSON.stringify(currentFeatures.map(f => f.id)));
        }
    }

    // 獲取當前功能列表
    getCurrentFeatures() {
        return [
            { id: 'investment-analysis', name: '投資分析', description: '專業的投資組合分析' },
            { id: 'budget-tracking', name: '預算追蹤', description: '實時預算監控和提醒' },
            { id: 'goal-management', name: '目標管理', description: '設定和追蹤財務目標' }
        ];
    }

    // 添加更新到隊列
    addUpdate(update) {
        this.updateQueue.push({
            ...update,
            id: Date.now() + Math.random(),
            timestamp: new Date().toISOString()
        });
    }

    // 顯示下一個更新
    showNextUpdate() {
        if (this.updateQueue.length === 0) return;
        
        this.currentUpdate = this.updateQueue.shift();
        this.renderUpdate();
        this.showModal();
    }

    // 渲染更新內容
    renderUpdate() {
        if (!this.currentUpdate) return;

        const subtitle = document.getElementById('updateSubtitle');
        const content = document.getElementById('updateContent');
        const features = document.getElementById('updateFeatures');

        // 設置副標題
        if (subtitle) subtitle.textContent = this.currentUpdate.subtitle;

        // 設置內容
        if (content) {
            content.innerHTML = `
                <h4>${this.currentUpdate.title}</h4>
                <p>${this.currentUpdate.content}</p>
            `;
        }

        // 設置功能列表
        if (features && this.currentUpdate.features) {
            features.innerHTML = this.currentUpdate.features.map(feature => `
                <div class="update-feature-item">
                    <div class="update-feature-icon">${feature.icon}</div>
                    <div class="update-feature-text">
                        <div class="update-feature-title">${feature.title}</div>
                        <div class="update-feature-desc">${feature.desc}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    // 顯示彈窗
    showModal() {
        if (this.modal) {
            this.modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    // 關閉彈窗
    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = '';
            
            // 標記當前更新為已查看
            if (this.currentUpdate) {
                this.markUpdateAsViewed(this.currentUpdate);
                this.currentUpdate = null;
            }
            
            // 顯示下一個更新
            setTimeout(() => this.showNextUpdate(), 500);
        }
    }

    // 跳過更新
    skipUpdate() {
        this.closeModal();
    }

    // 探索更新
    exploreUpdate() {
        if (!this.currentUpdate) return;

        // 根據更新類型執行相應操作
        switch (this.currentUpdate.type) {
            case 'theme':
                this.exploreThemes();
                break;
            case 'feature':
                this.exploreFeatures();
                break;
            case 'version':
                this.exploreVersion();
                break;
        }

        this.closeModal();
    }

    // 探索主題
    exploreThemes() {
        // 觸發主題選擇器
        const themeBtn = document.querySelector('[data-action="open-theme-selector"]');
        if (themeBtn) {
            themeBtn.click();
        } else {
            // 嘗試找到主題相關的按鈕
            const themeButtons = document.querySelectorAll('button[class*="theme"], [id*="theme"]');
            if (themeButtons.length > 0) {
                themeButtons[0].click();
            }
        }
    }

    // 探索功能
    exploreFeatures() {
        // 導航到功能頁面
        const mainPage = document.getElementById('pageMain');
        const inputPage = document.getElementById('pageInput');
        
        if (inputPage && inputPage.style.display !== 'none') {
            // 如果在輸入頁面，返回主頁
            const backBtn = document.getElementById('inputPageBackBtn');
            if (backBtn) backBtn.click();
        }
        
        // 顯示功能提示
        this.showFeatureHighlight();
    }

    // 探索版本
    exploreVersion() {
        // 顯示版本資訊
        console.log(`版本 ${this.currentUpdate.version} 新功能已啟用`);
    }

    // 顯示功能高亮
    showFeatureHighlight() {
        // 創建臨時提示
        const highlight = document.createElement('div');
        highlight.className = 'feature-highlight-temp';
        highlight.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #4f46e5, #7c3aed);
                color: white;
                padding: 12px 20px;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
                z-index: 10000;
                animation: slideDown 0.3s ease-out;
            ">
                ✨ 新功能已啟用，快來探索吧！
            </div>
        `;
        
        document.body.appendChild(highlight);
        
        // 3秒後自動移除
        setTimeout(() => {
            if (highlight.parentNode) {
                highlight.parentNode.removeChild(highlight);
            }
        }, 3000);
    }

    // 標記更新為已查看
    markUpdateAsViewed(update) {
        const viewedUpdates = JSON.parse(localStorage.getItem('viewedUpdates') || '[]');
        viewedUpdates.push(update.id);
        localStorage.setItem('viewedUpdates', JSON.stringify(viewedUpdates));
        
        // 如果是版本更新，更新版本記錄
        if (update.type === 'version' && update.version) {
            localStorage.setItem('appLastVersion', update.version);
        }
    }

    // 手動觸發更新檢查（用於測試）
    forceCheckUpdates() {
        this.updateQueue = [];
        this.checkForUpdates();
    }

    // 添加自定義更新
    addCustomUpdate(updateData) {
        this.addUpdate(updateData);
        if (this.modal.style.display === 'none') {
            this.showNextUpdate();
        }
    }
}

// 創建全域實例
window.updateNotificationSystem = new UpdateNotificationSystem();

// 添加到全域作用域以便其他腳本使用
window.showUpdateNotification = function(updateData) {
    if (window.updateNotificationSystem) {
        window.updateNotificationSystem.addCustomUpdate(updateData);
    }
};

// 測試函數（開發時使用）
window.testUpdateNotification = function() {
    window.showUpdateNotification({
        type: 'test',
        title: '測試更新',
        subtitle: '這是一個測試更新通知',
        content: '用於測試更新通知系統的功能。',
        features: [
            { icon: '🧪', title: '測試功能', desc: '測試更新通知的顯示效果' },
            { icon: '✅', title: '功能驗證', desc: '驗證所有功能正常工作' }
        ]
    });
};
