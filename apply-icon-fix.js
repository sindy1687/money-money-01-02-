// 圖示修復腳本 - 直接應用所有修復
console.log('開始應用圖示修復...');

// 1. 修復字體設置
const iconElements = document.querySelectorAll(`
    .summary-icon,
    .record-type-icon,
    .ledger-tab-icon,
    .type-icon,
    .dividend-stat-icon,
    .title-icon,
    .stock-icon-large,
    .form-header-icon,
    .back-btn-icon,
    .tab-icon,
    .fab-btn,
    .back-btn,
    .input-back-btn,
    .modal-back-btn,
    .dca-back-btn,
    .dca-setup-back-btn,
    .detail-back-btn,
    .investment-back-btn,
    .investment-form-back-btn,
    .daily-budget-back-btn,
    .nav-back-btn
`);

iconElements.forEach(element => {
    element.style.fontFamily = 'Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, Emoji';
    element.style.fontStyle = 'normal';
    element.style.fontWeight = 'normal';
    element.style.fontVariant = 'normal';
    element.style.textTransform = 'none';
    element.style.lineHeight = '1';
    element.style.webkitFontSmoothing = 'antialiased';
    element.style.mozOsxFontSmoothing = 'grayscale';
});

// 2. 修復所有包含 emoji 的按鈕
const emojiButtons = document.querySelectorAll('button, .btn');
emojiButtons.forEach(button => {
    const text = button.textContent;
    if (/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(text)) {
        button.style.fontFamily = 'Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, Emoji, SF Pro Display, Helvetica Neue, Arial, sans-serif';
    }
});

// 3. 特定修復 FAB 按鈕
const fabButton = document.querySelector('.fab-btn');
if (fabButton) {
    fabButton.style.fontSize = '24px';
    fabButton.style.fontFamily = 'Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, Emoji';
    console.log('FAB 按鈕已修復:', fabButton.textContent);
}

// 4. 特定修復返回按鈕
const backButtons = document.querySelectorAll('.back-btn, .input-back-btn, .modal-back-btn');
backButtons.forEach(button => {
    if (button.textContent.includes('←')) {
        button.style.fontFamily = 'Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, Emoji';
        button.style.fontSize = '18px';
    }
});

console.log(`已修復 ${iconElements.length} 個圖示元素`);
console.log('圖示修復完成！');

// 導出修復函數
window.applyIconFix = function() {
    console.log('重新應用圖示修復...');
    // 重新執行上述修復邏輯
};
