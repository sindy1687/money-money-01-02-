// 移除強制白色設定的修復腳本
const fs = require('fs');
const path = require('path');

const cssFilePath = path.join(__dirname, 'styles.css');

// 讀取CSS檔案
let cssContent = fs.readFileSync(cssFilePath, 'utf8');

console.log('開始移除強制白色設定...');

// 定義需要移除或替換的強制白色設定
const whiteFixes = [
    // 移除強制白色背景（保留主題變數）
    {
        from: /background:\s*rgba\(255,\s*255,\s*255,\s*[\d.]+\)\s*!important/g,
        to: 'background: var(--bg-card) !important'
    },
    {
        from: /background:\s*rgba\(255,\s*255,\s*255,\s*[\d.]+\)/g,
        to: 'background: var(--bg-card)'
    },
    
    // 移除強制白色文字（保留主題變數）
    {
        from: /color:\s*rgba\(255,\s*255,\s*255,\s*[\d.]+\)\s*!important/g,
        to: 'color: var(--text-primary) !important'
    },
    {
        from: /color:\s*rgba\(255,\s*255,\s*255,\s*[\d.]+\)/g,
        to: 'color: var(--text-primary)'
    },
    
    // 移除純白色設定
    {
        from: /color:\s*white\s*!important/g,
        to: 'color: var(--text-primary) !important'
    },
    {
        from: /color:\s*white/g,
        to: 'color: var(--text-primary)'
    },
    {
        from: /background:\s*white\s*!important/g,
        to: 'background: var(--bg-card) !important'
    },
    {
        from: /background:\s*white/g,
        to: 'background: var(--bg-card)'
    },
    
    // 移除十六進位白色
    {
        from: /color:\s*#fff\s*!important/g,
        to: 'color: var(--text-primary) !important'
    },
    {
        from: /color:\s*#fff/g,
        to: 'color: var(--text-primary)'
    },
    {
        from: /background:\s*#fff\s*!important/g,
        to: 'background: var(--bg-card) !important'
    },
    {
        from: /background:\s*#fff/g,
        to: 'background: var(--bg-card)'
    },
    
    // 移除白色陰影和邊框
    {
        from: /rgba\(255,\s*255,\s*255,\s*[\d.]+\)/g,
        to: 'var(--color-primary-rgba-20)'
    },
    
    // 特殊情況：按鈕文字保持白色（如果背景是深色）
    {
        from: /\.key-btn\.delete.*color:\s*white\s*!important/g,
        to: '.key-btn.delete { color: var(--text-white) !important'
    },
    {
        from: /\.key-btn\.equal.*color:\s*white\s*!important/g,
        to: '.key-btn.equal { color: var(--text-white) !important'
    }
];

// 應用修復
let fixedContent = cssContent;
let totalReplacements = 0;

whiteFixes.forEach((fix, index) => {
    const beforeContent = fixedContent;
    fixedContent = fixedContent.replace(fix.from, fix.to);
    const replacements = (beforeContent.match(fix.from) || []).length;
    totalReplacements += replacements;
    
    if (replacements > 0) {
        console.log(`修復 ${index + 1}: 替換了 ${replacements} 處強制白色設定`);
    }
});

// 寫回檔案
fs.writeFileSync(cssFilePath, fixedContent, 'utf8');

console.log(`\n✅ 強制白色設定移除完成！`);
console.log(`📊 總共替換了 ${totalReplacements} 處設定`);
console.log(`📁 檔案已更新: ${cssFilePath}`);

// 生成報告
const report = `
# 強制白色設定移除報告

## 修復統計
- 總共替換: ${totalReplacements} 處強制白色設定
- 修復時間: ${new Date().toLocaleString()}

## 修復類型
1. **背景顏色**: rgba(255,255,255,*) → var(--bg-card)
2. **文字顏色**: rgba(255,255,255,*) → var(--text-primary)
3. **純白色**: white/#fff → 主題變數
4. **邊框陰影**: 白色rgba → 主題色rgba

## 影響範圍
- 所有主題的強制白色設定已移除
- 改用主題變數確保一致性
- 保留必要的白色文字（如深色背景按鈕）

## 驗證建議
1. 檢查所有主題的顯示效果
2. 確認文字可讀性
3. 驗證按鈕和表單元素
4. 測試深色和淺色主題
`;

fs.writeFileSync(path.join(__dirname, 'force-white-removal-report.md'), report, 'utf8');
console.log(`📋 報告已生成: force-white-removal-report.md`);
