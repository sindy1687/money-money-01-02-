// 批量修復CSS透明度問題的腳本
const fs = require('fs');
const path = require('path');

// 需要修復的CSS文件列表
const cssFiles = [
    'festive-theme.css',
    'dreamy-realm-theme.css',
    'halloween-theme.css',
    'little-prince-theme.css'
];

// 修復函數
function fixTransparency(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 移除強制透明設定，替換為實心背景
        const replacements = [
            // 將頁面透明背景替換為半透明白色
            {
                from: /background: transparent !important;/g,
                to: 'background: rgba(255, 255, 255, 0.9) !important;'
            },
            // 移除 backdrop-filter: none
            {
                from: /backdrop-filter: none !important;/g,
                to: 'backdrop-filter: blur(8px) !important;'
            },
            // 確保有邊框陰影
            {
                from: /box-shadow: none !important;/g,
                to: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;'
            }
        ];
        
        let modified = false;
        replacements.forEach(({ from, to }) => {
            if (content.match(from)) {
                content = content.replace(from, to);
                modified = true;
                console.log(`✅ 修復了 ${filePath} 中的透明設定`);
            }
        });
        
        if (modified) {
            fs.writeFileSync(filePath, content);
            console.log(`📝 已更新 ${filePath}`);
        }
        
    } catch (error) {
        console.error(`❌ 處理 ${filePath} 時出錯:`, error);
    }
}

// 處理所有文件
cssFiles.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        fixTransparency(fullPath);
    } else {
        console.log(`⚠️ 文件不存在: ${fullPath}`);
    }
});

console.log('🎉 透明度修復完成！');
