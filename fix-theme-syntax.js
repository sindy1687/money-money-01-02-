// 修復主題語法錯誤的腳本
// 修復 js/theme.js 第703行的語法錯誤

console.log('開始修復主題語法錯誤...');

// 使用 fetch API 讀取文件並修復
fetch('js/theme.js')
    .then(response => response.text())
    .then(content => {
        // 將內容按行分割
        const lines = content.split('\n');
        
        // 修復第703行（索引702）的語法錯誤
        if (lines[702] && lines[702].trim() === '};') {
            lines[702] = '];';
            console.log('已修復第703行的語法錯誤: }; -> ];');
        }
        
        // 重新組合內容
        const fixedContent = lines.join('\n');
        
        // 創建修復後的內容下載
        const blob = new Blob([fixedContent], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'theme-fixed.js';
        a.click();
        URL.revokeObjectURL(url);
        
        console.log('修復完成，請下載 theme-fixed.js 文件並替換原來的 js/theme.js');
    })
    .catch(error => {
        console.error('修復失敗:', error);
        
        // 如果 fetch 失敗，提供手動修復指導
        console.log('手動修復指導:');
        console.log('1. 打開 js/theme.js 文件');
        console.log('2. 找到第703行');
        console.log('3. 將 }; 修改为 ];');
        console.log('4. 保存文件');
    });

// 檢查主題陣列是否正確關閉
function checkThemeArraySyntax() {
    fetch('js/theme.js')
        .then(response => response.text())
        .then(content => {
            // 檢查主題陣列的開始和結束
            const arrayStart = content.indexOf('var themes = window.AppThemes || [');
            const arrayEnd = content.lastIndexOf('];');
            
            if (arrayStart !== -1 && arrayEnd !== -1) {
                console.log('主題陣列結構正確');
                console.log('陣列開始位置:', arrayStart);
                console.log('陣列結束位置:', arrayEnd);
            } else {
                console.error('主題陣列結構有問題');
                console.log('陣列開始位置:', arrayStart);
                console.log('陣列結束位置:', arrayEnd);
            }
        });
}

// 測試主題功能
function testThemeFunction() {
    try {
        if (typeof showThemeSelector === 'function') {
            console.log('✅ showThemeSelector 函數可用');
        } else {
            console.error('❌ showThemeSelector 函數不可用');
        }
        
        if (typeof themes !== 'undefined') {
            console.log('✅ themes 變數可用');
            console.log('主題數量:', themes.length);
            
            // 檢查小王子主題是否存在
            const littlePrinceTheme = themes.find(t => t.id === 'littlePrince');
            if (littlePrinceTheme) {
                console.log('✅ 小王子主題已添加');
                console.log('主題資訊:', {
                    id: littlePrinceTheme.id,
                    name: littlePrinceTheme.name,
                    category: littlePrinceTheme.category
                });
            } else {
                console.error('❌ 小王子主題未找到');
            }
        } else {
            console.error('❌ themes 變數不可用');
        }
    } catch (error) {
        console.error('測試失敗:', error);
    }
}

// 執行檢查
checkThemeArraySyntax();
testThemeFunction();

console.log('修復腳本執行完成');
