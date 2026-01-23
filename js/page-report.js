// 報表與年度分析（由 script.js 拆出）

// 顯示年度報告
function showAnnualReport() {
    const currentYear = new Date().getFullYear();
    
    // 獲取記帳記錄
    const accountingRecords = JSON.parse(localStorage.getItem('accountingRecords') || '[]');
    
    // 獲取投資記錄
    const investmentRecords = JSON.parse(localStorage.getItem('investmentRecords') || '[]');
    
    // 過濾當年的記錄
    const yearRecords = accountingRecords.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate.getFullYear() === currentYear;
    });
    
    const yearInvestmentRecords = investmentRecords.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate.getFullYear() === currentYear;
    });
    
    // 計算年支出排行
    const expenseRecords = yearRecords.filter(r => r.type === 'expense' || !r.type);
    const categoryExpenses = {};
    expenseRecords.forEach(record => {
        const category = record.category || '未分類';
        if (!categoryExpenses[category]) {
            categoryExpenses[category] = 0;
        }
        categoryExpenses[category] += record.amount || 0;
    });
    
    const expenseRanking = Object.entries(categoryExpenses)
        .map(([category, amount]) => ({ category, amount }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 10);
    
    // 計算年投資總投入
    const buyRecords = yearInvestmentRecords.filter(r => r.type === 'buy');
    const totalInvestment = buyRecords.reduce((sum, record) => {
        const price = record.price || 0;
        const shares = record.shares || 0;
        const fee = record.fee || 0;
        return sum + (price * shares + fee);
    }, 0);
    
    // 計算年股息總額
    const dividendRecords = yearInvestmentRecords.filter(r => r.type === 'dividend');
    const totalDividend = dividendRecords.reduce((sum, record) => {
        return sum + (record.amount || 0);
    }, 0);
    
    // 找出最燒錢分類
    const topExpenseCategory = expenseRanking.length > 0 ? expenseRanking[0] : null;
    
    // 計算總支出
    const totalExpense = expenseRecords.reduce((sum, record) => sum + (record.amount || 0), 0);
    
    // 創建模態框
    const modal = document.createElement('div');
    modal.className = 'annual-report-modal';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 10006; display: flex; align-items: center; justify-content: center; padding: 20px; overflow-y: auto;';
    
    let expenseRankingHtml = '';
    if (expenseRanking.length === 0) {
        expenseRankingHtml = '<div class="annual-report-empty" style="text-align: center; padding: 20px; color: #999;">尚無支出記錄</div>';
    } else {
        expenseRanking.forEach((item, index) => {
            const percentage = ((item.amount / totalExpense) * 100).toFixed(1);
            expenseRankingHtml += `
                <div class="annual-report-rank-row" style="display: flex; align-items: center; padding: 12px; border-bottom: 1px solid #f0f0f0;">
                    <div class="annual-report-rank-index" style="width: 30px; text-align: center; font-weight: 600; color: #666;">${index + 1}</div>
                    <div class="annual-report-rank-category" style="flex: 1; font-size: 15px; color: #333;">${item.category}</div>
                    <div class="annual-report-rank-amount" style="font-size: 15px; font-weight: 600; color: #f44336;">NT$${item.amount.toLocaleString('zh-TW')}</div>
                    <div class="annual-report-rank-percent" style="width: 60px; text-align: right; font-size: 13px; color: #999; margin-left: 12px;">${percentage}%</div>
                </div>
            `;
        });
    }
    
    modal.innerHTML = `
        <div class="annual-report-content" style="background: white; border-radius: 20px; padding: 24px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
            <div class="annual-report-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; position: sticky; top: 0; background: white; z-index: 10; padding-bottom: 12px; border-bottom: 2px solid #f0f0f0;">
                <h2 class="annual-report-title" style="margin: 0; font-size: 24px; font-weight: 600; color: #333;">📊 ${currentYear} 年度報告</h2>
                <button class="annual-report-close-btn" style="background: none; border: none; font-size: 24px; color: #999; cursor: pointer; padding: 0; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; transition: all 0.2s;">✕</button>
            </div>
            
            <div class="annual-report-body" style="display: flex; flex-direction: column; gap: 24px;">
                <!-- 總支出 -->
                <div class="annual-report-total" style="background: linear-gradient(135deg, #ffeef5 0%, #fff5f9 100%); padding: 20px; border-radius: 16px; border: 2px solid #ffb6d9;">
                    <div class="annual-report-total-label" style="font-size: 14px; color: #666; margin-bottom: 8px;">年度總支出</div>
                    <div class="annual-report-total-value" style="font-size: 32px; font-weight: 700; color: #ff69b4;">NT$${totalExpense.toLocaleString('zh-TW')}</div>
                </div>
                
                <!-- 年支出排行 -->
                <div class="annual-report-ranking" style="background: #f8f8f8; padding: 20px; border-radius: 16px;">
                    <h3 class="annual-report-section-title" style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #333;">📈 年支出排行（Top 10）</h3>
                    <div class="annual-report-ranking-list" style="background: white; border-radius: 12px; overflow: hidden;">
                        ${expenseRankingHtml}
                    </div>
                </div>
                
                <!-- 投資相關 -->
                <div class="annual-report-investment-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div class="annual-report-card annual-report-investment" style="background: linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%); padding: 20px; border-radius: 16px; border: 2px solid #c8e6c9;">
                        <div class="annual-report-card-label" style="font-size: 14px; color: #666; margin-bottom: 8px;">年投資總投入</div>
                        <div class="annual-report-card-value" style="font-size: 24px; font-weight: 700; color: #4caf50;">NT$${totalInvestment.toLocaleString('zh-TW')}</div>
                    </div>
                    
                    <div class="annual-report-card annual-report-dividend" style="background: linear-gradient(135deg, #fff3e0 0%, #fff8e1 100%); padding: 20px; border-radius: 16px; border: 2px solid #ffe0b2;">
                        <div class="annual-report-card-label" style="font-size: 14px; color: #666; margin-bottom: 8px;">年股息總額</div>
                        <div class="annual-report-card-value" style="font-size: 24px; font-weight: 700; color: #ff9800;">NT$${totalDividend.toLocaleString('zh-TW')}</div>
                    </div>
                </div>
                
                <!-- 最燒錢分類 -->
                ${topExpenseCategory ? `
                    <div class="annual-report-top-category" style="background: linear-gradient(135deg, #ffebee 0%, #fce4ec 100%); padding: 20px; border-radius: 16px; border: 2px solid #ffcdd2; text-align: center;">
                        <div class="annual-report-top-label" style="font-size: 16px; color: #666; margin-bottom: 12px;">😅 最燒錢分類</div>
                        <div class="annual-report-top-name" style="font-size: 28px; font-weight: 700; color: #f44336; margin-bottom: 8px;">${topExpenseCategory.category}</div>
                        <div class="annual-report-top-amount" style="font-size: 20px; color: #666;">NT$${topExpenseCategory.amount.toLocaleString('zh-TW')}</div>
                        <div class="annual-report-top-percent" style="font-size: 14px; color: #999; margin-top: 8px;">佔總支出 ${((topExpenseCategory.amount / totalExpense) * 100).toFixed(1)}%</div>
                    </div>
                ` : ''}
                
                <!-- 年度建議 -->
                <div class="annual-report-suggestions" style="background: linear-gradient(135deg, #e3f2fd 0%, #f3f9ff 100%); padding: 20px; border-radius: 16px; border: 2px solid #bbdefb;">
                    <h3 class="annual-report-section-title" style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #1976d2;">💡 年度建議</h3>
                    <div class="annual-report-suggestions-list" style="display: flex; flex-direction: column; gap: 12px;">
                        ${generateAnnualSuggestions(totalExpense, expenseRanking, totalInvestment, totalDividend, topExpenseCategory)}
                    </div>
                </div>
            </div>
            
            <div class="annual-report-footer" style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #f0f0f0; text-align: center;">
                <button id="exportAnnualReportBtn" style="padding: 12px 24px; background: #ff69b4; color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.2s;">📄 匯出報告</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 綁定關閉按鈕
    const closeBtn = modal.querySelector('.annual-report-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        });
    }
    
    // 點擊背景關閉
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }
    });
    
    // 匯出報告
    const exportBtn = modal.querySelector('#exportAnnualReportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportAnnualReport(currentYear, {
                totalExpense,
                expenseRanking,
                totalInvestment,
                totalDividend,
                topExpenseCategory
            });
        });
    }
}

// 匯出年度報告
function exportAnnualReport(year, data) {
    let reportText = `📊 ${year} 年度報告\n`;
    reportText += `生成時間：${new Date().toLocaleString('zh-TW')}\n\n`;
    reportText += `═══════════════════════════════════\n\n`;
    
    reportText += `💰 年度總支出：NT$${data.totalExpense.toLocaleString('zh-TW')}\n\n`;
    
    reportText += `📈 年支出排行（Top 10）：\n`;
    data.expenseRanking.forEach((item, index) => {
        const percentage = ((item.amount / data.totalExpense) * 100).toFixed(1);
        reportText += `${index + 1}. ${item.category}：NT$${item.amount.toLocaleString('zh-TW')} (${percentage}%)\n`;
    });
    reportText += `\n`;
    
    reportText += `📊 年投資總投入：NT$${data.totalInvestment.toLocaleString('zh-TW')}\n`;
    reportText += `💵 年股息總額：NT$${data.totalDividend.toLocaleString('zh-TW')}\n\n`;
    
    if (data.topExpenseCategory) {
        const percentage = ((data.topExpenseCategory.amount / data.totalExpense) * 100).toFixed(1);
        reportText += `😅 最燒錢分類：${data.topExpenseCategory.category}\n`;
        reportText += `   金額：NT$${data.topExpenseCategory.amount.toLocaleString('zh-TW')}\n`;
        reportText += `   佔總支出：${percentage}%\n`;
    }
    
    reportText += `\n═══════════════════════════════════\n`;
    reportText += `由記帳本 App 自動生成`;
    
    // 下載文字檔
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${year}年度報告.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('年度報告已匯出！');
}

// 生成年度建議
function generateAnnualSuggestions(totalExpense, expenseRanking, totalInvestment, totalDividend, topExpenseCategory) {
    let suggestions = [];
    
    // 支出控制建議
    if (totalExpense > 500000) {
        suggestions.push({
            icon: '💰',
            title: '支出偏高提醒',
            content: `您的年度總支出 NT$${totalExpense.toLocaleString()} 相對較高，建議檢視非必要支出，制定月度預算計畫。`
        });
    }
    
    // 最燒錢分類建議
    if (topExpenseCategory && topExpenseCategory.amount / totalExpense > 0.3) {
        suggestions.push({
            icon: '🎯',
            title: '控制主要支出',
            content: `${topExpenseCategory.category} 佔總支出 ${((topExpenseCategory.amount / totalExpense) * 100).toFixed(1)}%，建議設定此分類的月度上限。`
        });
    }
    
    // 投資建議
    if (totalInvestment > 0) {
        const dividendYield = totalDividend / totalInvestment * 100;
        if (dividendYield < 2) {
            suggestions.push({
                icon: '📈',
                title: '投資組合優化',
                content: `您的股息收益率為 ${dividendYield.toFixed(2)}%，考慮增加高股息股票或ETF配置以提高被動收入。`
            });
        } else {
            suggestions.push({
                icon: '🌟',
                title: '投資表現良好',
                content: `您的股息收益率達 ${dividendYield.toFixed(2)}%，繼續保持當前的投資策略，可考慮定期再投資。`
            });
        }
    } else {
        suggestions.push({
            icon: '🚀',
            title: '開始投資理財',
            content: '建議開始定期定額投資，利用時間複利效果，為未來財務自由做準備。'
        });
    }
    
    // 儲蓄建議
    const monthlyAverage = totalExpense / 12;
    if (monthlyAverage < 20000) {
        suggestions.push({
            icon: '🏦',
            title: '增加儲蓄',
            content: '您的月均支出較低，建議將多餘資金用於定期儲蓄或投資，建立緊急預備金。'
        });
    }
    
    // 分類多樣化建議
    const uniqueCategories = expenseRanking.length;
    if (uniqueCategories < 5) {
        suggestions.push({
            icon: '🎨',
            title: '豐富記帳分類',
            content: `您目前只有 ${uniqueCategories} 個支出分類，建議細化分類以更好地掌握資金流向。`
        });
    }
    
    // 生成HTML
    return suggestions.map(suggestion => `
        <div class="annual-report-suggestion-item" style="background: white; padding: 16px; border-radius: 12px; border-left: 4px solid #1976d2; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div class="suggestion-header" style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span class="suggestion-icon" style="font-size: 20px;">${suggestion.icon}</span>
                <span class="suggestion-title" style="font-weight: 600; color: #1976d2; font-size: 16px;">${suggestion.title}</span>
            </div>
            <div class="suggestion-content" style="color: #666; font-size: 14px; line-height: 1.5;">${suggestion.content}</div>
        </div>
    `).join('');
}
