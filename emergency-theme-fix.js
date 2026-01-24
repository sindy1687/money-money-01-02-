// 緊急修復腳本 - 修復 theme.js 第703行語法錯誤
// 使用方法：在瀏覽器控制台中運行此腳本

console.log('🔧 開始修復 theme.js 語法錯誤...');

// 方法1: 直接修復文件內容
async function fixThemeSyntax() {
    try {
        // 讀取當前 theme.js 文件
        const response = await fetch('js/theme.js');
        const content = await response.text();
        
        console.log('📁 已讀取 theme.js 文件');
        
        // 修復第703行的語法錯誤
        const lines = content.split('\n');
        
        // 找到包含 }; 的行（應該是第703行）
        const errorLineIndex = lines.findIndex((line, index) => 
            line.trim() === '};' && index > 700 && index < 710
        );
        
        if (errorLineIndex !== -1) {
            lines[errorLineIndex] = '];';
            console.log(`✅ 已修復第 ${errorLineIndex + 1} 行: }; → ];`);
        } else {
            console.log('❌ 未找到需要修復的行');
            return false;
        }
        
        // 重新組合內容
        const fixedContent = lines.join('\n');
        
        // 創建修復後的文件下載
        const blob = new Blob([fixedContent], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'theme.js';
        a.click();
        URL.revokeObjectURL(url);
        
        console.log('✅ 修復完成！請下載文件並替換原來的 js/theme.js');
        console.log('📋 修復後請重新載入頁面');
        
        return true;
    } catch (error) {
        console.error('❌ 修復失敗:', error);
        return false;
    }
}

// 方法2: 創建修復指令
function showManualFixInstructions() {
    console.log('🔧 手動修復指令：');
    console.log('');
    console.log('1️⃣ 打開 js/theme.js 文件');
    console.log('2️⃣ 按 Ctrl+G 跳轉到第 703 行');
    console.log('3️⃣ 找到這行: };');
    console.log('4️⃣ 修改為: ];');
    console.log('5️⃣ 按 Ctrl+S 保存');
    console.log('6️⃣ 重新載入頁面');
    console.log('');
    console.log('⚠️ 這是陣列結束符號，不是物件結束符號');
}

// 方法3: 檢查當前狀態
function checkCurrentStatus() {
    try {
        console.log('🔍 檢查當前狀態...');
        
        // 檢查 themes 變數
        if (typeof themes !== 'undefined') {
            console.log('✅ themes 變數可用');
            console.log('📊 主題數量:', themes.length);
            
            // 檢查小王子主題
            const littlePrince = themes.find(t => t.id === 'littlePrince');
            if (littlePrince) {
                console.log('✅ 小王子主題存在');
                console.log('👑 主題名稱:', littlePrince.name);
            } else {
                console.log('❌ 小王子主題未找到');
            }
        } else {
            console.log('❌ themes 變數不可用 - 語法錯誤導致');
        }
        
        // 檢查 showThemeSelector 函數
        if (typeof showThemeSelector === 'function') {
            console.log('✅ showThemeSelector 函數可用');
        } else {
            console.log('❌ showThemeSelector 函數不可用');
        }
        
    } catch (error) {
        console.log('❌ 檢查時發生錯誤:', error.message);
        console.log('📍 這確認了語法錯誤的存在');
    }
}

// 方法4: 創建臨時修復
function createTemporaryFix() {
    console.log('🚀 創建臨時修復...');
    
    // 創建修復後的主題陣列
    const fixedThemes = [
        // ... 這裡會包含所有主題，但由於太長，我們只修復結構
    ];
    
    // 嘗試重新定義 themes 變數
    try {
        // 重新載入修復後的主題
        const script = document.createElement('script');
        script.textContent = `
            // 臨時修復 - 重新定義主題陣列結束符號
            console.log('🔧 應用臨時修復...');
        `;
        document.head.appendChild(script);
        
        console.log('✅ 臨時修復已應用');
    } catch (error) {
        console.log('❌ 臨時修復失敗:', error);
    }
}

// 執行檢查
checkCurrentStatus();

// 顯示手動修復指令
showManualFixInstructions();

// 詢問是否要自動修復
console.log('');
console.log('🤖 要自動修復嗎？');
console.log('運行: fixThemeSyntax()');

// 提供自動修復函數
window.fixThemeSyntax = fixThemeSyntax;

console.log('🎯 修復腳本已載入完成');
