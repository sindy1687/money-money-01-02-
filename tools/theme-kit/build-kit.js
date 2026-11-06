// 產生 css/theme-kit.css：主題設計工具組（圖案風格 + 所有元件的樣式）
// 用法：node build-kit.js <輸出檔>
const fs = require('fs');
const out = process.argv[2];

// 提高優先度，蓋過各主題舊的樣式（舊樣式最多到 :root[data-theme] + 兩三層 class）
const P = 'html[data-kit][data-kit][data-kit][data-kit][data-kit]';
const sel = (list, suffix = '') => list.map(c => `${P} ${c}${suffix}`).join(',\n');

const CARDS = ['.card', '.record-card', '.ledger-card', '.summary-card', '.budget-card', '.wallet-card', '.chart-card', '.investment-card', '.manage-investment-card', '.annual-report-card', '.diary-card', '.monthly-planning-card', '.investment-settings-card', '.wallet-budget-card', '.holding-card', '.buying-card', '.selling-card', '.dividend-card', '.regular-investment-card', '.investment-management-card', '.dca-card', '.installment-card', '.fixed-deposit-card', '.stock-item-card', '.budget-item', '.next-month-budget-card', '.daily-budget-summary-card', '.settings-item'];
const MINI = ['.summary-item', '.budget-summary-item', '.quick-note-btn'];
const PANELS = ['.modal-content', '.modal-content-standard', '.budget-category-modal-content', '.budget-setting-modal-content', '.category-modal-content', '.dca-execute-modal .modal-content', '.account-modal-content', '.emoji-modal-content', '.history-modal-content', '.crop-modal-content', '.dialog-container', '.xiaosen-dialog', '.komori-dialog', '.mori-dialog-box', '.theme-modal-content', '.theme-modal-container', '.dialog-content', '.popup-content', '.spending-analysis-panel', '.reminder-panel', '.smart-notification', '.quick-settings'];
const PRIMARY = ['.btn', '.form-submit-btn', '.submit-btn', '.form-query-btn', '.budget-setup-save-btn', '.app-modal-btn--primary', '.font-size-confirm-btn', '.price-query-modal__btn--ok', '.nmb-hero-btn', '.nmb-action:not(.nmb-action--secondary)', '.empty-state-btn', '.set-next-month-budget-btn', '.daily-budget-track-btn', '.upload-background-btn', '.savings-template-btn', '.view-history-btn', '.auto-transfer-add-btn', '.account-add-btn', '.modal-btn.confirm-btn', '.confirm-btn', '.theme-primary-btn', '.budget-add-btn-full', '.budget-edit-btn', '.monthly-planner-btn:not(.monthly-planner-btn--outline)', '.dca-add-btn', '.entry-detail-edit-btn', '.entry-edit-save', '.investment-form-submit-btn', '.buy-btn', '.dca-execute-btn', '.buy-action-btn-large', '.allocation-btn.primary', '.dca-action-btn-large'];
const DANGER = ['.delete-btn', '.form-delete-btn', '.transaction-delete-btn', '.history-transaction-delete-btn', '.record-action-delete', '.next-month-bill-btn--delete', '.monthly-planner-goal-delete', '.monthly-planner-item-delete', '.quick-action-delete-btn', '.delete'];
const CLOSERS = ['.modal-close', '.modal-close-btn', '.app-modal-close', '.price-query-modal__close', '.receipt-image-close-btn', '.search-close-btn', '.advisor-close-btn', '.history-close-btn', '.annual-report-close-btn', '.budget-category-close-btn', '.budget-setup-close-btn', '.creator-close-btn', '.daily-detail-close-btn', '.font-size-close-btn', '.member-select-close-btn', '.next-month-close-btn', '.background-selector-close-btn', '.image-remove-btn', '.thumbnail-remove', '.account-image-remove-btn', '.theme-image-remove-btn', '.delete-custom-background-btn', '.history-search-clear', '.stock-search-clear-btn', '.theme-close-btn'];
const BACKS = ['.back-btn', '.return-btn', '.input-back-btn', '.modal-back-btn', '.dca-back-btn', '.dca-setup-back-btn', '.investment-form-back-btn', '.dividend-back-btn', '.detail-back-btn', '.auto-transfer-back-btn', '.auto-transfer-setup-back-btn'];
const TABS = ['.tab-btn', '.ledger-type-tab', '.record-type-tab', '.chart-tab-btn', '.category-tab', '.record-tab', '.savings-type-tab', '.toggle-btn', '.type-btn', '.savings-type-option', '.category-modal-type-option', '.font-size-preset'];
const INPUTS = ['.form-input', '.form-select', '.form-textarea', '.note-input', '.advisor-chat-input', '.theme-search-input', '.date-input', 'input[type="text"]', 'input[type="number"]', 'input[type="date"]', 'select', 'textarea'];
const BASE_EXCLUDE = ['.nav-item', '.fab-btn', '.emoji-item', '.image-emoji-item', '.summary-toggle', '.summary-item', '.star-btn', '.check-btn', '.theme-item', '.key-btn'];

// 共同的預設（各圖案風格再覆寫）
const DEFAULTS = `
html[data-kit] {
    --kc-card-bg: linear-gradient(180deg, var(--k-paper) 0%, var(--k-paper-2) 100%);
    --kc-card-radius: 18px;
    --kc-card-border: 1px solid var(--k-line);
    --kc-card-outline: 0 solid transparent;
    --kc-card-outline-offset: 0px;
    --kc-card-shadow: 0 8px 22px color-mix(in srgb, var(--k-main-dark) 18%, transparent);
    --kc-deco-bg: none;
    --kc-deco-inset: auto 0 0 0;
    --kc-deco-h: 0px;
    --kc-panel-radius: 22px;

    --kc-btn-bg: linear-gradient(180deg, var(--k-btn-top) 0%, var(--k-btn-bottom) 100%);
    --kc-btn-radius: 14px;
    --kc-btn-border: 1px solid color-mix(in srgb, var(--k-btn-bottom) 80%, black);
    --kc-btn-shadow: 0 4px 12px color-mix(in srgb, var(--k-main-dark) 30%, transparent);
    --kc-btn-clip: none;
    --kc-btn-mask: none;
    --kc-btn-spacing: 0.02em;
    --kc-btn-press: scale(0.97);

    --kc-btn2-bg: var(--k-paper);
    --kc-btn2-border: 1px solid var(--k-line);
    --kc-btn2-shadow: 0 3px 8px color-mix(in srgb, var(--k-main-dark) 14%, transparent);
    --kc-chip-radius: 12px;

    --kc-tab-radius: 12px;
    --kc-tab-clip: none;

    --kc-fab-bg: linear-gradient(180deg, var(--k-btn-top) 0%, var(--k-btn-bottom) 100%);
    --kc-fab-border: 3px solid var(--k-paper);
    --kc-fab-shadow: 0 8px 20px color-mix(in srgb, var(--k-main-dark) 45%, transparent);
    --kc-fab-radius: 50%;
    --kc-fab-clip: none;
    --kc-fab-mask: none;
    --kc-fab-anim: none;

    --kc-nav-bg: color-mix(in srgb, var(--k-paper) 94%, transparent);
    --kc-nav-border: 1px solid var(--k-line);
    --kc-nav-text: var(--k-ink-soft);
    --kc-nav-active-text: var(--k-title);
    --kc-nav-active-bg: color-mix(in srgb, var(--k-main-light) 80%, transparent);

    --kc-input-radius: 12px;
    --kc-input-border: 1.5px solid var(--k-line);
    --kc-key-radius: 14px;
}
`;

// 各圖案風格
const MOTIFS = {
    // 🐾 軟萌：圓滾滾、粗軟描邊、玩具般的厚底陰影、卡片底部一排肉球點點
    paw: `
    --kc-card-radius: 30px;
    --kc-card-border: 3px solid var(--k-line);
    --kc-card-shadow: 0 6px 0 color-mix(in srgb, var(--k-line) 85%, var(--k-main)), 0 12px 24px color-mix(in srgb, var(--k-main-dark) 14%, transparent);
    --kc-deco-bg:
        radial-gradient(circle at 14px 9px, var(--k-main-light) 0 5px, transparent 5.5px),
        radial-gradient(circle at 6px 3px, var(--k-main-light) 0 2.4px, transparent 2.9px),
        radial-gradient(circle at 14px 1.5px, var(--k-main-light) 0 2.4px, transparent 2.9px),
        radial-gradient(circle at 22px 3px, var(--k-main-light) 0 2.4px, transparent 2.9px);
    --kc-deco-bg-size: 56px 16px;
    --kc-deco-inset: auto 14px 8px 14px;
    --kc-deco-h: 16px;
    --kc-btn-radius: 999px;
    --kc-btn-border: 3px solid var(--k-btn-bottom);
    --kc-btn-shadow: 0 5px 0 color-mix(in srgb, var(--k-btn-bottom) 70%, black);
    --kc-btn-press: translateY(4px);
    --kc-btn2-border: 3px solid var(--k-line);
    --kc-btn2-shadow: 0 4px 0 var(--k-line);
    --kc-chip-radius: 999px;
    --kc-tab-radius: 999px;
    --kc-fab-border: 4px solid var(--k-paper);
    --kc-fab-shadow: 0 6px 0 color-mix(in srgb, var(--k-btn-bottom) 70%, black), 0 10px 20px color-mix(in srgb, var(--k-main-dark) 30%, transparent);
    --kc-fab-anim: kitBounce 2.8s ease-in-out infinite;
    --kc-nav-border: 3px solid var(--k-line);
    --kc-input-radius: 18px;
    --kc-input-border: 2.5px solid var(--k-line);
    --kc-key-radius: 22px;
    --kc-panel-radius: 30px;`,

    // 🌸 花瓣：對角圓角的花瓣形、卡片底部一排花瓣、「+」是五瓣花
    petal: `
    --kc-card-radius: 30px 10px 30px 10px;
    --kc-card-border: 1.5px solid var(--k-line);
    --kc-deco-bg: radial-gradient(circle at 12px 12px, color-mix(in srgb, var(--k-main-light) 90%, white) 0 8px, transparent 8.5px);
    --kc-deco-bg-size: 24px 12px;
    --kc-deco-inset: auto 0 0 0;
    --kc-deco-h: 7px;
    --kc-btn-radius: 22px 6px 22px 6px;
    --kc-btn-border: 1px solid color-mix(in srgb, var(--k-btn-bottom) 85%, white);
    --kc-btn-shadow: 0 6px 16px color-mix(in srgb, var(--k-main) 35%, transparent);
    --kc-chip-radius: 16px 5px 16px 5px;
    --kc-tab-radius: 18px 5px 18px 5px;
    --kc-fab-radius: 0;
    --kc-fab-border: none;
    --kc-fab-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><g fill='black'><circle cx='50' cy='24' r='22'/><circle cx='75' cy='42' r='22'/><circle cx='66' cy='72' r='22'/><circle cx='34' cy='72' r='22'/><circle cx='25' cy='42' r='22'/><circle cx='50' cy='52' r='24'/></g></svg>") center / contain no-repeat;
    --kc-fab-anim: kitSway 3.6s ease-in-out infinite;
    --kc-input-radius: 16px 5px 16px 5px;
    --kc-key-radius: 18px 6px 18px 6px;
    --kc-panel-radius: 32px 12px 32px 12px;`,

    // 🌊 海浪：圓潤藥丸、按鈕底部波浪、卡片底部浪花、「+」是會浮的泡泡
    wave: `
    --kc-card-radius: 24px;
    --kc-card-border: 1.5px solid var(--k-line);
    --kc-deco-bg: radial-gradient(circle at 10px -3px, transparent 9px, var(--k-main-light) 9.5px 12px, transparent 12.5px);
    --kc-deco-bg-size: 20px 10px;
    --kc-deco-inset: auto 0 0 0;
    --kc-deco-h: 10px;
    --kc-btn-radius: 999px;
    --kc-btn-mask:
        radial-gradient(circle 8px at 8px 0, #000 98%, transparent) 0 100% / 16px 8px repeat-x,
        linear-gradient(#000 0 0) 0 0 / 100% calc(100% - 7px) no-repeat;
    --kc-chip-radius: 999px;
    --kc-tab-radius: 999px;
    --kc-fab-bg: radial-gradient(circle at 35% 30%, #ffffff 0 10%, var(--k-main-light) 28%, var(--k-btn-top) 62%, var(--k-btn-bottom) 100%);
    --kc-fab-border: 2px solid color-mix(in srgb, white 70%, transparent);
    --kc-fab-anim: kitFloat 3.4s ease-in-out infinite;
    --kc-input-radius: 999px;
    --kc-key-radius: 999px;`,

    // 🍬 果凍：光澤果凍、卡片頂端一條糖果斜紋、「+」是會晃的果凍方塊
    jelly: `
    --kc-card-radius: 26px;
    --kc-card-border: 2px solid var(--k-main-light);
    --kc-deco-bg: repeating-linear-gradient(135deg, var(--k-main) 0 8px, var(--k-main-light) 8px 16px);
    --kc-deco-bg-size: auto;
    --kc-deco-inset: 0 0 auto 0;
    --kc-deco-h: 6px;
    --kc-btn-radius: 20px;
    --kc-btn-shadow: inset 0 8px 0 rgba(255, 255, 255, 0.35), inset 0 -6px 10px color-mix(in srgb, var(--k-btn-bottom) 60%, black), 0 6px 14px color-mix(in srgb, var(--k-main) 40%, transparent);
    --kc-btn-press: scale(1.04, 0.92);
    --kc-chip-radius: 16px;
    --kc-tab-radius: 16px;
    --kc-fab-radius: 22px;
    --kc-fab-shadow: inset 0 9px 0 rgba(255, 255, 255, 0.4), inset 0 -8px 12px color-mix(in srgb, var(--k-btn-bottom) 60%, black), 0 8px 18px color-mix(in srgb, var(--k-main) 45%, transparent);
    --kc-fab-anim: kitWobble 3s ease-in-out infinite;
    --kc-input-radius: 16px;
    --kc-key-radius: 20px;
    --kc-panel-radius: 28px;`,

    // ⚔️ 刀鋒：斜切平行四邊形按鈕、卡片左側粗色條 + 右上斜紋、深色選單、「+」是菱形
    blade: `
    --kc-card-radius: 6px;
    --kc-card-border: 1px solid var(--k-line);
    --kc-card-shadow: 6px 6px 0 color-mix(in srgb, var(--k-deep) 30%, transparent);
    --kc-deco-bg: linear-gradient(var(--k-main), var(--k-main)) 0 0 / 5px 100% no-repeat, repeating-linear-gradient(-45deg, var(--k-main) 0 5px, transparent 5px 11px) right top / 92px 6px no-repeat;
    --kc-deco-bg-size: auto;
    --kc-deco-inset: 0;
    --kc-deco-h: auto;
    --kc-btn-radius: 0;
    --kc-btn-clip: polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
    --kc-btn-border: none;
    --kc-btn-shadow: none;
    --kc-btn-spacing: 0.08em;
    --kc-btn2-border: 2px solid var(--k-line);
    --kc-chip-radius: 4px;
    --kc-tab-radius: 0;
    --kc-tab-clip: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
    --kc-fab-radius: 0;
    --kc-fab-border: none;
    --kc-fab-clip: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
    --kc-fab-shadow: none;
    --kc-nav-bg: linear-gradient(180deg, color-mix(in srgb, var(--k-deep) 92%, transparent), var(--k-deep));
    --kc-nav-border: 3px solid var(--k-main);
    --kc-nav-text: color-mix(in srgb, var(--k-on-deep) 78%, transparent);
    --kc-nav-active-text: var(--k-on-deep);
    --kc-nav-active-bg: linear-gradient(180deg, transparent 70%, var(--k-main) 70% 78%, transparent 78%);
    --kc-input-radius: 4px;
    --kc-key-radius: 6px;
    --kc-panel-radius: 8px;`,

    // 🖌️ 水墨：方正、雙框線、卡片四角如意角框、「+」是印章
    ink: `
    --kc-card-radius: 4px;
    --kc-card-border: 1px solid var(--k-line);
    --kc-card-outline: 1px solid color-mix(in srgb, var(--k-line) 70%, transparent);
    --kc-card-outline-offset: -6px;
    --kc-deco-bg:
        linear-gradient(var(--k-main), var(--k-main)) left top / 16px 2px no-repeat,
        linear-gradient(var(--k-main), var(--k-main)) left top / 2px 16px no-repeat,
        linear-gradient(var(--k-main), var(--k-main)) right top / 16px 2px no-repeat,
        linear-gradient(var(--k-main), var(--k-main)) right top / 2px 16px no-repeat,
        linear-gradient(var(--k-main), var(--k-main)) left bottom / 16px 2px no-repeat,
        linear-gradient(var(--k-main), var(--k-main)) left bottom / 2px 16px no-repeat,
        linear-gradient(var(--k-main), var(--k-main)) right bottom / 16px 2px no-repeat,
        linear-gradient(var(--k-main), var(--k-main)) right bottom / 2px 16px no-repeat;
    --kc-deco-bg-size: auto;
    --kc-deco-inset: 3px;
    --kc-deco-h: auto;
    --kc-btn-radius: 3px;
    --kc-btn-shadow: inset 0 0 0 2px color-mix(in srgb, white 35%, transparent), 0 3px 8px color-mix(in srgb, var(--k-main-dark) 25%, transparent);
    --kc-btn-spacing: 0.15em;
    --kc-chip-radius: 3px;
    --kc-tab-radius: 3px;
    --kc-fab-radius: 12px;
    --kc-fab-border: none;
    --kc-fab-shadow: inset 0 0 0 3px var(--k-btn-bottom), inset 0 0 0 5px color-mix(in srgb, white 70%, transparent), 0 6px 14px color-mix(in srgb, var(--k-main-dark) 35%, transparent);
    --kc-input-radius: 3px;
    --kc-key-radius: 4px;
    --kc-panel-radius: 6px;`,

    // 🪙 金幣：金色雙框卡片、浮雕金幣按鈕、「+」是會閃光的金幣
    gold: `
    --k-gold: #c9a14a;
    --k-gold-light: #f6e3a8;
    --k-gold-dark: #8a6420;
    --kc-card-radius: 16px;
    --kc-card-border: 2px solid var(--k-gold);
    --kc-card-outline: 1px solid color-mix(in srgb, var(--k-gold) 55%, transparent);
    --kc-card-outline-offset: -7px;
    --kc-card-shadow: 0 8px 22px color-mix(in srgb, var(--k-gold-dark) 25%, transparent);
    --kc-deco-bg: linear-gradient(45deg, transparent 42%, var(--k-gold) 42% 58%, transparent 58%) center top / 12px 12px no-repeat;
    --kc-deco-bg-size: auto;
    --kc-deco-inset: -6px 0 auto 0;
    --kc-deco-h: 12px;
    --kc-btn-bg: radial-gradient(ellipse at 50% 15%, #fff6d6 0%, var(--k-gold-light) 30%, var(--k-gold) 75%, var(--k-gold-dark) 100%);
    --kc-btn-border: 1px solid var(--k-gold-dark);
    --kc-btn-shadow: inset 0 0 0 2px color-mix(in srgb, white 50%, transparent), inset 0 -4px 7px color-mix(in srgb, var(--k-gold-dark) 50%, transparent), 0 5px 12px color-mix(in srgb, var(--k-gold-dark) 35%, transparent);
    --kc-btn-radius: 999px;
    --kc-btn-text: #3d2a05;
    --kc-btn2-border: 1.5px solid var(--k-gold);
    --kc-chip-radius: 999px;
    --kc-tab-radius: 999px;
    --kc-fab-bg: radial-gradient(circle at 40% 30%, #fff6d6 0%, var(--k-gold-light) 25%, var(--k-gold) 65%, var(--k-gold-dark) 100%);
    --kc-fab-border: 3px solid var(--k-gold-dark);
    --kc-fab-shadow: inset 0 0 0 4px color-mix(in srgb, white 45%, transparent), 0 8px 18px color-mix(in srgb, var(--k-gold-dark) 45%, transparent);
    --kc-fab-anim: kitCoin 5s ease-in-out infinite;
    --kc-nav-border: 2px solid var(--k-gold);
    --kc-input-border: 1.5px solid color-mix(in srgb, var(--k-gold) 70%, transparent);`,

    // 🧧 紅包：虛線紅框卡片、卡片頂端紅條、紅包按鈕配金邊、「+」是紅包
    lucky: `
    --kc-card-radius: 16px;
    --kc-card-border: 2px dashed color-mix(in srgb, var(--k-main) 65%, transparent);
    --kc-deco-bg: linear-gradient(var(--k-main), var(--k-main)), radial-gradient(circle, #f3c54d 0 2px, transparent 2.5px) 0 0 / 14px 6px repeat-x;
    --kc-deco-bg-size: auto;
    --kc-deco-inset: 0 0 auto 0;
    --kc-deco-h: 6px;
    --kc-btn-radius: 10px;
    --kc-btn-border: 2px solid #e8b53a;
    --kc-btn-shadow: inset 0 -4px 0 color-mix(in srgb, var(--k-btn-bottom) 70%, black), 0 5px 12px color-mix(in srgb, var(--k-main) 35%, transparent);
    --kc-chip-radius: 10px;
    --kc-tab-radius: 10px;
    --kc-fab-radius: 12px;
    --kc-fab-border: 3px solid #e8b53a;
    --kc-fab-anim: kitSway 3s ease-in-out infinite;`,

    // 🌙 夜光：月光霧面卡片、發光框線、深色選單、「+」是發光的月亮球
    night: `
    --kc-card-radius: 20px;
    --kc-card-border: 1px solid color-mix(in srgb, var(--k-main-light) 80%, white);
    --kc-card-shadow: 0 0 0 1px color-mix(in srgb, white 50%, transparent), 0 0 24px color-mix(in srgb, var(--k-main) 35%, transparent), 0 12px 28px color-mix(in srgb, var(--k-deep) 45%, transparent);
    --kc-deco-bg: radial-gradient(circle at 20% 40%, var(--k-main) 0 1.5px, transparent 2px), radial-gradient(circle at 55% 70%, var(--k-main) 0 1px, transparent 1.5px), radial-gradient(circle at 85% 30%, var(--k-main) 0 2px, transparent 2.5px);
    --kc-deco-bg-size: auto;
    --kc-deco-inset: 6px 8px auto auto;
    --kc-deco-h: 18px;
    --kc-btn-bg: linear-gradient(180deg, color-mix(in srgb, var(--k-deep) 80%, var(--k-main)) 0%, var(--k-deep) 100%);
    --kc-btn-text: var(--k-on-deep);
    --kc-btn-border: 1px solid var(--k-main-light);
    --kc-btn-shadow: 0 0 0 1px color-mix(in srgb, var(--k-main) 40%, transparent), 0 0 16px color-mix(in srgb, var(--k-main) 55%, transparent);
    --kc-btn-radius: 999px;
    --kc-chip-radius: 999px;
    --kc-tab-radius: 999px;
    --kc-fab-bg: radial-gradient(circle at 35% 35%, #fffbe8 0 18%, var(--k-main-light) 40%, var(--k-main) 75%, var(--k-main-dark) 100%);
    --kc-fab-border: 2px solid color-mix(in srgb, white 70%, transparent);
    --kc-fab-shadow: 0 0 22px color-mix(in srgb, var(--k-main) 70%, transparent), 0 0 46px color-mix(in srgb, var(--k-main-light) 45%, transparent);
    --kc-fab-anim: kitGlow 3s ease-in-out infinite;
    --kc-nav-bg: linear-gradient(180deg, color-mix(in srgb, var(--k-deep) 88%, transparent), var(--k-deep));
    --kc-nav-border: 1px solid color-mix(in srgb, var(--k-main-light) 50%, transparent);
    --kc-nav-text: color-mix(in srgb, var(--k-on-deep) 75%, transparent);
    --kc-nav-active-text: var(--k-on-deep);
    --kc-nav-active-bg: radial-gradient(ellipse at 50% 40%, color-mix(in srgb, var(--k-main) 55%, transparent), transparent 70%);`,

    // 👑 優雅：細雙線框、卡片頂端一顆寶石、「+」是切割寶石
    prince: `
    --kc-card-radius: 16px;
    --kc-card-border: 1px solid var(--k-line);
    --kc-card-outline: 1px solid color-mix(in srgb, var(--k-line) 75%, transparent);
    --kc-card-outline-offset: -5px;
    --kc-deco-bg: linear-gradient(45deg, transparent 35%, var(--k-main) 35% 65%, transparent 65%) center / 10px 10px no-repeat, linear-gradient(90deg, transparent, var(--k-line) 30%, transparent 46%, transparent 54%, var(--k-line) 70%, transparent) center / 100% 1px no-repeat;
    --kc-deco-bg-size: auto;
    --kc-deco-inset: 0 22% auto 22%;
    --kc-deco-h: 12px;
    --kc-btn-radius: 12px;
    --kc-btn-shadow: inset 0 0 0 1px color-mix(in srgb, white 45%, transparent), 0 5px 14px color-mix(in srgb, var(--k-main-dark) 30%, transparent);
    --kc-btn-spacing: 0.06em;
    --kc-chip-radius: 10px;
    --kc-tab-radius: 10px;
    --kc-fab-radius: 0;
    --kc-fab-border: none;
    --kc-fab-clip: polygon(30% 0, 70% 0, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0 70%, 0 30%);
    --kc-fab-shadow: none;
    --kc-fab-anim: kitShine 4s ease-in-out infinite;`,

    // 🎨 基本：乾淨柔和
    basic: `
    --kc-card-radius: 18px;
    --kc-btn-radius: 14px;`
};

const nots = BASE_EXCLUDE.join(', ');

const css = `/* ===================================================================
   主題設計工具組（theme-kit）— 由產生器建立，請改 build-kit.js 後重新產生
   每個主題在自己的 css/themes/<id>.css 裡定義 --k-* 配色；
   這裡依 data-motif（圖案風格）決定按鈕、卡片、框線、「+」按鈕的形狀。
   只有 theme.js 有指定圖案風格的主題才會套用（html 上會有 data-kit）。
   =================================================================== */
${DEFAULTS}
${Object.entries(MOTIFS).map(([m, body]) => `html[data-kit][data-motif="${m}"] {${body}\n}`).join('\n\n')}

/* 舊主題用這些變數決定文字和底色；改成工具組算好的配色，字才不會淡到看不見 */
${P} {
    --text-primary: var(--k-ink) !important;
    --text-strong: var(--k-ink) !important;
    --text-secondary: var(--k-ink-soft) !important;
    --text-tertiary: var(--k-ink-soft) !important;
    --bg-white: var(--k-paper) !important;
    --bg-card: var(--k-paper) !important;
    --bg-light: var(--k-paper-2) !important;
    --border-light: color-mix(in srgb, var(--k-line) 70%, transparent) !important;
    --border-medium: var(--k-line) !important;
    --color-primary: var(--k-main) !important;
    --color-primary-dark: var(--k-main-dark) !important;
    --color-primary-light: var(--k-main-light) !important;
}

/* ---------- 卡片 ---------- */
${sel(CARDS)} {
    background: var(--kc-card-bg) !important;
    border: var(--kc-card-border) !important;
    border-radius: var(--kc-card-radius) !important;
    outline: var(--kc-card-outline);
    outline-offset: var(--kc-card-outline-offset);
    box-shadow: var(--kc-card-shadow) !important;
    color: var(--k-ink) !important;
    position: relative;
}

${sel(CARDS, '::after')} {
    content: '' !important;
    position: absolute !important;
    inset: var(--kc-deco-inset) !important;
    height: var(--kc-deco-h) !important;
    width: auto !important;
    background: var(--kc-deco-bg) !important;
    background-size: var(--kc-deco-bg-size, auto) !important;
    background-repeat: repeat-x;
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
    border: none !important;
    border-radius: 0 !important;
    pointer-events: none !important;
    z-index: 0 !important;
}

${sel(CARDS.filter(c => c !== '.settings-item'), ' > *')} {
    position: relative;
    z-index: 1;
}

${sel(MINI)} {
    background: color-mix(in srgb, var(--k-paper) 92%, white) !important;
    border: 1px solid var(--k-line) !important;
    border-radius: var(--kc-chip-radius) !important;
    color: var(--k-ink) !important;
    box-shadow: 0 3px 8px color-mix(in srgb, var(--k-main-dark) 12%, transparent) !important;
}

/* 卡片裡的次要文字 */
${P} .settings-item-text { color: var(--k-ink) !important; }
${P} .settings-item-subtext,
${P} .summary-label { color: var(--k-ink-soft) !important; }

${P} .settings-item-accent {
    top: 50% !important;
    bottom: auto !important;
    left: 10px !important;
    width: 8px !important;
    height: 8px !important;
    border-radius: 50% !important;
    transform: translateY(-50%);
}

/* ---------- 對話框、面板 ---------- */
${sel(PANELS)} {
    background: linear-gradient(180deg, color-mix(in srgb, var(--k-paper) 70%, white) 0%, var(--k-paper) 100%) !important;
    border: var(--kc-card-border) !important;
    border-radius: var(--kc-panel-radius) !important;
    box-shadow: 0 22px 60px color-mix(in srgb, var(--k-deep) 35%, transparent) !important;
    color: var(--k-ink) !important;
}

${P} .panel-header {
    background: linear-gradient(135deg, var(--k-btn-top) 0%, var(--k-btn-bottom) 100%) !important;
    color: var(--k-on-main) !important;
}

/* ---------- 所有按鈕（基本：奶油紙色、主題框線；下面的分組再細分） ---------- */
${P} button:where(:not(${nots})) {
    background: var(--kc-btn2-bg) !important;
    color: var(--k-ink) !important;
    border: var(--kc-btn2-border) !important;
    border-radius: var(--kc-chip-radius) !important;
    box-shadow: var(--kc-btn2-shadow) !important;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
}

${P} button:where(:not(${nots})):active {
    transform: var(--kc-btn-press);
}

/* 主要動作 */
${sel(PRIMARY)} {
    background: var(--kc-btn-bg) !important;
    color: var(--kc-btn-text, var(--k-on-main)) !important;
    -webkit-text-fill-color: var(--kc-btn-text, var(--k-on-main)) !important;
    border: var(--kc-btn-border) !important;
    border-radius: var(--kc-btn-radius) !important;
    box-shadow: var(--kc-btn-shadow) !important;
    clip-path: var(--kc-btn-clip);
    -webkit-mask: var(--kc-btn-mask);
    mask: var(--kc-btn-mask);
    font-weight: 700 !important;
    letter-spacing: var(--kc-btn-spacing);
    text-shadow: none !important;
}

${sel(PRIMARY, ' *')} {
    color: inherit !important;
    -webkit-text-fill-color: inherit !important;
}

${sel(PRIMARY, ':active')} {
    transform: var(--kc-btn-press) !important;
}

/* 次要動作 */
${P} .monthly-planner-btn--outline,
${P} .monthly-planner-btn--secondary,
${P} .nmb-action--secondary {
    background: var(--kc-btn2-bg) !important;
    color: var(--k-title) !important;
    -webkit-text-fill-color: var(--k-title) !important;
    border: var(--kc-btn2-border) !important;
}

/* 刪除 */
${sel(DANGER)} {
    background: linear-gradient(180deg, #e5574d 0%, #b8302a 100%) !important;
    color: #ffffff !important;
    border: 1px solid #9c2620 !important;
}

/* 關閉 ✕、返回：圓形 */
${sel(CLOSERS)},
${sel(BACKS)} {
    border-radius: 50% !important;
    color: var(--k-ink) !important;
}

/* 切換、選項 */
${sel(TABS)} {
    border-radius: var(--kc-tab-radius) !important;
    clip-path: var(--kc-tab-clip);
}

${sel(TABS, ':not(.active):not(.selected)')} {
    color: var(--k-ink-soft) !important;
}

${sel(TABS, ':not(.active):not(.selected) *')} {
    color: var(--k-ink-soft) !important;
    -webkit-text-fill-color: var(--k-ink-soft) !important;
}

${sel(TABS, '.active')},
${sel(TABS, '.selected')} {
    background: linear-gradient(180deg, var(--k-btn-top) 0%, var(--k-btn-bottom) 100%) !important;
    color: var(--k-on-main) !important;
    border: 1px solid var(--k-btn-bottom) !important;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--k-main) 40%, transparent) !important;
}

${sel(TABS, '.active *')},
${sel(TABS, '.selected *')} {
    color: var(--k-on-main) !important;
    -webkit-text-fill-color: var(--k-on-main) !important;
}

/* 每月規劃的「全部／存股／儲蓄」：舊主題另外指定了字的填色，這裡一起蓋掉 */
${P} .savings-type-tab {
    background: var(--kc-btn2-bg) !important;
    color: var(--k-ink-soft) !important;
    -webkit-text-fill-color: var(--k-ink-soft) !important;
    text-shadow: none !important;
}

${P} .savings-type-tab.active {
    background: linear-gradient(180deg, var(--k-btn-top) 0%, var(--k-btn-bottom) 100%) !important;
    color: var(--k-on-main) !important;
    -webkit-text-fill-color: var(--k-on-main) !important;
}

/* 計算機鍵盤 */
${P} .key-btn {
    background: var(--k-paper) !important;
    color: var(--k-ink) !important;
    border: 1px solid var(--k-line) !important;
    border-radius: var(--kc-key-radius) !important;
    box-shadow: 0 3px 0 var(--k-line) !important;
}

${P} .key-btn.operator {
    background: var(--k-paper-2) !important;
    color: var(--k-title) !important;
}

${P} .key-btn.equal {
    background: var(--kc-btn-bg) !important;
    color: var(--kc-btn-text, var(--k-on-main)) !important;
    border: var(--kc-btn-border) !important;
}

${P} .key-btn.clear {
    background: linear-gradient(180deg, #e5574d 0%, #b8302a 100%) !important;
    color: #ffffff !important;
}

${P} .key-btn:active {
    transform: translateY(2px);
    box-shadow: 0 1px 0 var(--k-line) !important;
}

/* ---------- 輸入框 ---------- */
${sel(INPUTS)} {
    background: #ffffff !important;
    color: var(--k-ink) !important;
    -webkit-text-fill-color: var(--k-ink) !important;
    border: var(--kc-input-border) !important;
    border-radius: var(--kc-input-radius) !important;
}

${sel(INPUTS, ':focus')} {
    border-color: var(--k-main) !important;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--k-main) 25%, transparent) !important;
    outline: none !important;
}

${sel(INPUTS, '::placeholder')} {
    color: var(--k-ink-soft) !important;
    -webkit-text-fill-color: var(--k-ink-soft) !important;
    opacity: 0.8;
}

/* ---------- 標題、月份 ---------- */
${P} .ledger-title,
${P} .summary-month {
    background: none !important;
    color: var(--k-title) !important;
    -webkit-text-fill-color: var(--k-title) !important;
    text-shadow: 0 1px 0 #ffffff, 0 0 8px rgba(255, 255, 255, 0.9) !important;
    filter: none !important;
}

/* ---------- 底部選單 ---------- */
${P} .bottom-nav {
    background: var(--kc-nav-bg) !important;
    border-top: var(--kc-nav-border) !important;
    box-shadow: 0 -6px 18px color-mix(in srgb, var(--k-deep) 18%, transparent) !important;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
}

${P} .nav-item,
${P} .nav-item .nav-text {
    color: var(--kc-nav-text) !important;
    -webkit-text-fill-color: var(--kc-nav-text) !important;
    text-shadow: none !important;
}

${P} .nav-item {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
}

${P} .nav-item.active {
    background: var(--kc-nav-active-bg) !important;
    box-shadow: none !important;
}

${P} .nav-item.active .nav-text {
    color: var(--kc-nav-active-text) !important;
    -webkit-text-fill-color: var(--kc-nav-active-text) !important;
    font-weight: 700 !important;
}

/* ---------- 「+」按鈕 ---------- */
${P} .fab-btn {
    background: var(--kc-fab-bg) !important;
    color: var(--k-on-main) !important;
    border: var(--kc-fab-border) !important;
    border-radius: var(--kc-fab-radius) !important;
    box-shadow: var(--kc-fab-shadow) !important;
    clip-path: var(--kc-fab-clip);
    -webkit-mask: var(--kc-fab-mask);
    mask: var(--kc-fab-mask);
    width: 62px !important;
    height: 62px !important;
    animation: var(--kc-fab-anim);
}

@keyframes kitBounce { 0%, 100% { transform: translateY(0); } 45% { transform: translateY(-6px); } 55% { transform: translateY(-6px) scale(1.04, 0.96); } }
@keyframes kitFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
@keyframes kitWobble { 0%, 100% { transform: scale(1); } 30% { transform: scale(1.06, 0.94); } 60% { transform: scale(0.96, 1.04); } }
@keyframes kitSpinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes kitCoin { 0%, 80%, 100% { transform: rotateY(0deg); } 90% { transform: rotateY(180deg); } }
@keyframes kitSway { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
@keyframes kitGlow { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.18); } }
@keyframes kitShine { 0%, 100% { filter: brightness(1) saturate(1); } 50% { filter: brightness(1.15) saturate(1.2); } }

@media (prefers-reduced-motion: reduce) {
    ${P} .fab-btn { animation: none !important; }
}
`;

fs.writeFileSync(out, css);
console.log('已產生', out, (css.length / 1024).toFixed(1) + 'KB');
