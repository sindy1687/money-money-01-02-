(function () {
    if (typeof window.getMonthlyDeductionCategoryOptionsHtml !== 'function') {
        window.getMonthlyDeductionCategoryOptionsHtml = function (selectedCategory) {
            var selected = (selectedCategory || '').toString();
            try {
                if (typeof window.loadCustomCategories === 'function') {
                    window.loadCustomCategories();
                }
                if (typeof window.getEnabledCategories === 'function') {
                    var cats = window.getEnabledCategories('expense') || [];
                    if (Array.isArray(cats) && cats.length > 0) {
                        return ['<option value="">請選擇分類</option>'].concat(
                            cats.map(function (c) {
                                var name = (c && c.name) ? String(c.name) : '';
                                var sel = name && name === selected ? ' selected' : '';
                                return '<option value="' + name + '"' + sel + '>' + name + '</option>';
                            })
                        ).join('');
                    }
                }
            } catch (_) {}

            var fallback = ['餐飲', '交通', '購物', '生活', '娛樂', '醫療', '教育', '其他'];
            return ['<option value="">請選擇分類</option>'].concat(
                fallback.map(function (name) {
                    var sel = name === selected ? ' selected' : '';
                    return '<option value="' + name + '"' + sel + '>' + name + '</option>';
                })
            ).join('');
        };
    }

    function ensureMonthlyDeductionsPageDom() {
        var page = document.getElementById('monthlyDeductionsPage');
        if (page) return page;

        page = document.createElement('div');
        page.id = 'monthlyDeductionsPage';
        page.style.cssText = 'position: fixed; inset: 0; z-index: 10000; display: none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); overflow-y: auto;';
        page.innerHTML = [
            '<div style="padding: 16px; max-width: 900px; margin: 0 auto;">',
            '  <div style="display:flex; align-items:center; justify-content:space-between; gap: 12px; margin-bottom: 16px;">',
            '    <button id="monthlyDeductionsBackBtn" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 10px 14px; border-radius: 10px; cursor: pointer; font-size: 14px;">← 返回</button>',
            '    <div style="color: white; font-size: 18px; font-weight: 700;">🔄 每月固定扣款</div>',
            '    <button id="monthlyDeductionsAddBtn" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 10px 14px; border-radius: 10px; cursor: pointer; font-size: 14px;">＋ 新增</button>',
            '  </div>',
            '  <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border-radius: 14px; padding: 14px; color: white; margin-bottom: 16px;">',
            '    <div style="display:flex; justify-content:space-between; align-items:flex-end; gap: 12px;">',
            '      <div style="opacity: 0.9; font-size: 13px;">本月固定扣款總額</div>',
            '      <div style="font-size: 24px; font-weight: 800; color: #ffeb3b;">NT$<span id="totalDeductions">0</span></div>',
            '    </div>',
            '    <div style="margin-top: 6px; opacity: 0.8; font-size: 12px;">共 <span id="deductionCount">0</span> 筆</div>',
            '  </div>',
            '  <div id="deductionsList"></div>',
            '</div>'
        ].join('\n');

        document.body.appendChild(page);

        var backBtn = page.querySelector('#monthlyDeductionsBackBtn');
        if (backBtn) {
            backBtn.addEventListener('click', function () {
                page.style.display = 'none';
                if (typeof window.showSettingsPage === 'function') {
                    window.showSettingsPage();
                } else {
                    var settingsEl = document.getElementById('pageSettings');
                    if (settingsEl) settingsEl.style.display = 'block';
                }
            });
        }

        var addBtn = page.querySelector('#monthlyDeductionsAddBtn');
        if (addBtn) {
            addBtn.addEventListener('click', function () {
                if (typeof window.showAddDeductionDialog === 'function') {
                    window.showAddDeductionDialog();
                } else {
                    alert('新增固定扣款功能尚未載入，請稍後再試...');
                }
            });
        }

        return page;
    }

    window.showMonthlyDeductionsPage = function () {
        var page = ensureMonthlyDeductionsPageDom();
        page.style.display = 'block';

        if (typeof window.loadDeductionsList === 'function') {
            window.loadDeductionsList();
        }
    };
})();
