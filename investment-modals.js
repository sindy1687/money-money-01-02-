// 投資追蹤模態框功能
// 為增強投資追蹤系統添加用戶界面

// 顯示投資分析模態框
function showInvestmentAnalysisModal() {
    const analysis = getEnhancedPortfolioAnalysis();
    const stats = getInvestmentStatistics();
    
    if (!analysis) {
        alert('尚無投資數據可分析');
        return;
    }
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 16px; padding: 24px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;">
            <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px;">📈 投資分析報告</h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                <div style="padding: 16px; background: #f9fafb; border-radius: 8px;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">投資組合價值</div>
                    <div style="font-size: 20px; font-weight: 600; color: #1f2937;">NT$ ${analysis.summary.totalValue.toLocaleString()}</div>
                </div>
                <div style="padding: 16px; background: #f9fafb; border-radius: 8px;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">總損益</div>
                    <div style="font-size: 20px; font-weight: 600; color: ${analysis.summary.totalPnL >= 0 ? '#10b981' : '#ef4444'};">
                        NT$ ${analysis.summary.totalPnL.toLocaleString()}
                    </div>
                </div>
                <div style="padding: 16px; background: #f9fafb; border-radius: 8px;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">損益百分比</div>
                    <div style="font-size: 20px; font-weight: 600; color: ${analysis.summary.totalPnLPercent >= 0 ? '#10b981' : '#ef4444'};">
                        ${analysis.summary.totalPnLPercent.toFixed(2)}%
                    </div>
                </div>
                <div style="padding: 16px; background: #f9fafb; border-radius: 8px;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">股利收入</div>
                    <div style="font-size: 20px; font-weight: 600; color: #1f2937;">NT$ ${analysis.summary.totalDividend.toLocaleString()}</div>
                </div>
            </div>
            
            ${analysis.recommendations && analysis.recommendations.length > 0 ? `
                <div style="margin-bottom: 20px;">
                    <h3 style="margin: 0 0 12px 0; color: #1f2937; font-size: 16px;">💡 投資建議</h3>
                    ${analysis.recommendations.map(rec => `
                        <div style="padding: 12px; border-left: 4px solid ${
                            rec.priority === 'high' ? '#ef4444' :
                            rec.priority === 'medium' ? '#f59e0b' : '#10b981'
                        }; background: #f9fafb; border-radius: 4px; margin-bottom: 8px;">
                            <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">${rec.title}</div>
                            <div style="color: #6b7280; font-size: 14px; margin-bottom: 4px;">${rec.description}</div>
                            <div style="color: #374151; font-size: 13px; font-style: italic;">建議：${rec.action}</div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            <div style="display: flex; gap: 12px; justify-content: flex-end;">
                <button onclick="this.closest('div[style*=fixed]').remove()" style="padding: 8px 16px; border: 1px solid #d1d5db; border-radius: 6px; background: white; color: #374151; cursor: pointer;">關閉</button>
                <button onclick="exportInvestmentReport()" style="padding: 8px 16px; border: none; border-radius: 6px; background: #667eea; color: white; cursor: pointer;">匯出報告</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// 顯示投資歷史模態框
function showInvestmentHistoryModal() {
    const history = getInvestmentHistory();
    const buys = history.filter(r => r.type === 'buy');
    const sells = history.filter(r => r.type === 'sell');
    const dividends = history.filter(r => r.type === 'dividend');
    
    if (history.length === 0) {
        alert('尚無投資記錄');
        return;
    }
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    const viewState = {
        buy: 50,
        sell: 50,
        dividend: 50
    };

    const searchState = {
        query: ''
    };

    const normalizeText = (value) => String(value ?? '').trim().toLowerCase();

    const sortByDateDesc = (records) => {
        return [...(records || [])].sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    const filterRecords = (records) => {
        const q = normalizeText(searchState.query);
        if (!q) return records;
        return (records || []).filter(r => {
            const code = normalizeText(r.stockCode);
            return code.includes(q);
        });
    };

    const toNumber = (value) => {
        if (value === null || value === undefined) return NaN;
        if (typeof value === 'number') return value;
        const cleaned = String(value).replace(/,/g, '').trim();
        if (!cleaned) return NaN;
        return Number(cleaned);
    };

    const renderSection = (title, sectionKey, records, isDividend = false) => {
        const sectionId = `investment-history-${sectionKey}`;

        if (!records || records.length === 0) {
            return `
                <div id="${sectionId}" style="margin: 0 0 16px 0; scroll-margin-top: 70px;">
                    <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 16px;">${title}</h3>
                    <div style="padding: 12px; background: #f9fafb; border-radius: 8px; color: #6b7280; font-size: 14px;">尚無記錄</div>
                </div>
            `;
        }

        const limit = viewState[sectionKey] || 50;
        const shown = records.slice(0, limit);
        const hasMore = records.length > limit;

        return `
            <div id="${sectionId}" style="margin: 0 0 16px 0; scroll-margin-top: 70px;">
                <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 16px;">${title}</h3>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f9fafb;">
                                <th style="padding: 8px; text-align: left; font-size: 12px; color: #6b7280;">日期</th>
                                <th style="padding: 8px; text-align: left; font-size: 12px; color: #6b7280;">股票</th>
                                <th style="padding: 8px; text-align: right; font-size: 12px; color: #6b7280;">價格</th>
                                <th style="padding: 8px; text-align: right; font-size: 12px; color: #6b7280;">數量</th>
                                <th style="padding: 8px; text-align: right; font-size: 12px; color: #6b7280;">金額</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${shown.map(record => {
                                const priceNum = toNumber(record.price);
                                const sharesNum = toNumber(record.shares);
                                const amountNum = isDividend
                                    ? (toNumber(record.amount))
                                    : (priceNum * sharesNum);

                                const amount = Number.isFinite(amountNum)
                                    ? amountNum
                                    : (isDividend ? (priceNum * sharesNum) : 0);

                                const dividendPerShare = (Number.isFinite(amountNum) && Number.isFinite(sharesNum) && sharesNum > 0)
                                    ? (amountNum / sharesNum)
                                    : NaN;

                                const priceText = isDividend
                                    ? (Number.isFinite(dividendPerShare)
                                        ? `${dividendPerShare.toFixed(2)}/股`
                                        : (Number.isFinite(priceNum) ? `${priceNum.toFixed(2)}/股` : '-'))
                                    : (Number.isFinite(priceNum) ? priceNum.toFixed(2) : '-');
                                const sharesText = Number.isFinite(sharesNum) ? sharesNum.toLocaleString() : '-';

                                return `
                                    <tr style="border-bottom: 1px solid #f3f4f6;">
                                        <td style="padding: 8px; font-size: 14px;">${record.date}</td>
                                        <td style="padding: 8px; font-size: 14px;">${record.stockCode || '-'}</td>
                                        <td style="padding: 8px; text-align: right; font-size: 14px;">NT$ ${priceText}</td>
                                        <td style="padding: 8px; text-align: right; font-size: 14px;">${sharesText}</td>
                                        <td style="padding: 8px; text-align: right; font-size: 14px;">NT$ ${Number(amount || 0).toLocaleString()}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 10px;">
                    <div style="color: #6b7280; font-size: 14px;">顯示 ${Math.min(limit, records.length)} / ${records.length} 筆</div>
                    ${hasMore ? `
                        <button data-action="load-more" data-section="${sectionKey}" style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px; background: white; color: #374151; cursor: pointer; font-size: 14px;">顯示更多</button>
                    ` : ''}
                </div>
            </div>
        `;
    };

    const renderModal = () => {
        const displayBuys = filterRecords(sortByDateDesc(buys));
        const displaySells = filterRecords(sortByDateDesc(sells));
        const displayDividends = filterRecords(sortByDateDesc(dividends));

        modal.innerHTML = `
            <div style="background: white; border-radius: 16px; padding: 24px; max-width: 800px; width: 90%; max-height: 80vh; overflow-y: auto;">
                <div style="position: sticky; top: 0; background: white; padding: 0 0 12px 0; z-index: 1;">
                    <h2 style="margin: 0 0 12px 0; color: #1f2937; font-size: 20px;">📋 投資歷史記錄</h2>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <button data-action="jump" data-target="investment-history-buy" style="padding: 8px 12px; border: none; border-radius: 999px; background: #10b981; color: white; cursor: pointer; font-size: 14px;">🟢 買入</button>
                        <button data-action="jump" data-target="investment-history-sell" style="padding: 8px 12px; border: none; border-radius: 999px; background: #ef4444; color: white; cursor: pointer; font-size: 14px;">🔴 賣出</button>
                        <button data-action="jump" data-target="investment-history-dividend" style="padding: 8px 12px; border: none; border-radius: 999px; background: #3b82f6; color: white; cursor: pointer; font-size: 14px;">🔵 股利</button>
                    </div>
                    <div style="margin-top: 10px;">
                        <input id="investmentHistorySearch" type="text" value="${searchState.query}" placeholder="搜尋股票代號，例如 2330" style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 10px; font-size: 14px; outline: none;" />
                    </div>
                </div>
                
                ${renderSection('🟢 買入', 'buy', displayBuys)}
                ${renderSection('🔴 賣出', 'sell', displaySells)}
                ${renderSection('🔵 股利', 'dividend', displayDividends, true)}
                
                <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px;">
                    <button onclick="this.closest('div[style*=fixed]').remove()" style="padding: 8px 16px; border: 1px solid #d1d5db; border-radius: 6px; background: white; color: #374151; cursor: pointer;">關閉</button>
                </div>
            </div>
        `;

        const content = modal.firstElementChild;
        if (!content) return;

        content.querySelectorAll('button[data-action="jump"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                const el = content.querySelector(`#${targetId}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        content.querySelectorAll('button[data-action="load-more"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const sectionKey = btn.getAttribute('data-section');
                if (!sectionKey) return;
                viewState[sectionKey] = (viewState[sectionKey] || 50) + 50;
                renderModal();
                const el = content.querySelector(`#investment-history-${sectionKey}`);
                if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
            });
        });

        const searchInput = content.querySelector('#investmentHistorySearch');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                searchState.query = searchInput.value;
                viewState.buy = 50;
                viewState.sell = 50;
                viewState.dividend = 50;
                renderModal();
            });
        }
    };

    renderModal();
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// 匯出投資報告
function exportInvestmentReport() {
    const analysis = getEnhancedPortfolioAnalysis();
    const stats = getInvestmentStatistics();
    
    const report = {
        generatedAt: new Date().toISOString(),
        summary: analysis.summary,
        statistics: stats,
        portfolio: investmentTracker.portfolio,
        recommendations: analysis.recommendations,
        targets: getInvestmentTargets()
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `investment-analysis-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// 導出函數供全域使用
window.showInvestmentAnalysisModal = showInvestmentAnalysisModal;
window.showInvestmentHistoryModal = showInvestmentHistoryModal;
window.exportInvestmentReport = exportInvestmentReport;
