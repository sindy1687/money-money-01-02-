// 清除有問題的自定義圖示
console.log('🧹 開始清除有問題的自定義圖示...');

// 清除 categoryCustomIcons
localStorage.removeItem('categoryCustomIcons');
console.log('✓ 已清除 categoryCustomIcons');

// 清除 customCategories（如果有問題的自定義分類）
const customCategories = JSON.parse(localStorage.getItem('customCategories') || '[]');
if (customCategories.length > 0) {
    console.log('📋 當前自定義分類:', customCategories);
    // 可選：也清除自定義分類
    // localStorage.removeItem('customCategories');
    // console.log('✓ 已清除 customCategories');
}

console.log('🎉 清除完成！請重新整理頁面。');

// 重新載入頁面以應用變更
if (confirm('是否要重新整理頁面以應用變更？')) {
    location.reload();
}
