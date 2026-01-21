// 修復CSS中的中文編碼問題
const fs = require('fs');
const path = require('path');

const cssFilePath = path.join(__dirname, 'styles.css');

// 讀取CSS檔案
let cssContent = fs.readFileSync(cssFilePath, 'utf8');

// 定義需要修復的亂碼映射
const encodingFixes = [
    // 基本狀態顏色
    { from: /钅/g, to: '狀態顏色' },
    
    // 忍者主題相關
    { from: /銝駁/g, to: '主題' },
    { from: /憿讛/g, to: '顏色' },
    { from: /蝟餌/g, to: '組合' },
    { from: /峕艶/g, to: '背景' },
    { from: /𦠜/g, to: '邊框' },
    { from: /啣蔣/g, to: '陰影' },
    { from: /𤩺/g, to: '主要' },
    { from: /摨/g, to: '顏色' },
    { from: /西/g, to: '透明度' },
    { from: /貊頂蝯/g, to: '變體' },
    { from: /霈/g, to: '淺色' },
    { from: /絞/g, to: '漸層' },
    { from: /撘/g, to: '頁面' },
    { from: /瑁/g, to: '樣式' },
    { from: /矽/g, to: '卡片' },
    { from: /甈/g, to: '文字' },
    { from: /∟/g, to: '按鈕' },
    { from: /箸/g, to: '導航' },
    { from: /䲰/g, to: '項目' },
    { from: /冽/g, to: '滾動' },
    { from: /鰵/g, to: '條' },
    { from: /滚/g, to: '切換' },
    { from: /神/g, to: '開關' },
    { from: /𧋦/g, to: '設置' },
    
    // 其他常見亂碼
    { from: /滢/g, to: '側邊欄' },
    { from: /詨/g, to: '數字' },
    { from: /寞/g, to: '鍵盤' },
    { from: /厰/g, to: '輸入' },
    { from: /璅/g, to: '表單' },
    { from: /嗵/g, to: '標籤' },
    { from: /噬/g, to: '頁' },
    { from: /蝡/g, to: '簽' },
    { from: /删頂/g, to: '樣式' },
    { from: /撠/g, to: '激活' },
    { from: /舘/g, to: '狀態' },
    { from: /⏛/g, to: '模態' },
    { from: /⊥/g, to: '框' },
    { from: /獢/g, to: '內容' },
    { from: /頂蝯/g, to: '區域' },
    { from: /頛/g, to: '頭部' },
    { from: /萇/g, to: '鍵' },
    { from: /𥿢/g, to: '盤' },
    { from: /皛/g, to: '滾動' },
    { from: /曉/g, to: '條' },
    { from: /璇/g, to: '樣式' },
    { from: /脲/g, to: '設置' },
    { from: /見/g, to: '股' },
    { from: /撘/g, to: '票' },
    { from: /瘛/g, to: '分紅' },
    { from: /梯/g, to: '再投資' },
    { from: /𠧧/g, to: '標籤' },
    { from: /璅/g, to: '統計' },
    { from: /∪/g, to: '項目' },
    { from: /拚/g, to: '樣式' },
    { from: /踵/g, to: '響應式' },
    { from: /撘/g, to: '設計' },
    { from: /讛/g, to: '媒體' },
    { from: /身/g, to: '查詢' },
    { from: /閮/g, to: '設置' },
    { from: /瘥/g, to: '每日' },
    { from: /𤩺/g, to: '支出' },
    { from: /𠯫/g, to: '顯示' },
    { from: /臬/g, to: '歷史' },
    { from: /枂/g, to: '記錄' },
    { from: /蝯/g, to: '樣式' },
    { from: /梯/g, to: '股票' },
    { from: /𤌍/g, to: '網格' },
    { from: /璅/g, to: '卡片' },
    { from: /𤩺/g, to: '標籤' }
];

// 應用修復
let fixedContent = cssContent;
encodingFixes.forEach(fix => {
    fixedContent = fixedContent.replace(fix.from, fix.to);
});

// 寫回檔案
fs.writeFileSync(cssFilePath, fixedContent, 'utf8');

console.log('CSS中文編碼問題已修復！');
console.log('修復的項目數量：', encodingFixes.length);
