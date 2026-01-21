// 修復 emoji 404 錯誤的腳本
console.log('🔧 修復 emoji 404 錯誤...');

// 攔截所有請求，阻止 emoji URL 請求
(function() {
    // 保存原始的 fetch 和 XMLHttpRequest
    const originalFetch = window.fetch;
    const originalXHROpen = XMLHttpRequest.prototype.open;
    
    // 攔截 fetch 請求
    window.fetch = function(url, options) {
        // 檢查 URL 是否包含 emoji 字符
        if (typeof url === 'string' && /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(url)) {
            console.warn('🚫 攔截到 emoji URL 請求:', url);
            // 返回一個被拒絕的 Promise
            return Promise.reject(new Error('Emoji URL 請求被阻止'));
        }
        return originalFetch.apply(this, arguments);
    };
    
    // 攔截 XMLHttpRequest
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        // 檢查 URL 是否包含 emoji 字符
        if (typeof url === 'string' && /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(url)) {
            console.warn('🚫 攔截到 emoji XHR 請求:', url);
            // 不執行請求
            return;
        }
        return originalXHROpen.apply(this, arguments);
    };
    
    console.log('✅ emoji 404 錯誤修復已啟用');
})();

// 阻止點擊事件中的 emoji 導航
document.addEventListener('click', function(e) {
    const target = e.target;
    
    // 檢查點擊的元素或其父元素是否包含 emoji
    if (target && target.textContent) {
        const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;
        
        if (emojiRegex.test(target.textContent.trim()) && target.tagName === 'A') {
            e.preventDefault();
            e.stopPropagation();
            console.warn('🚫 攔截到 emoji 連結點擊:', target.textContent);
        }
    }
}, true);

// 修復圖片的 src 屬性中的 emoji
function fixImageSrc() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.src && /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(img.src)) {
            console.warn('🚫 修復 emoji 圖片 src:', img.src);
            img.src = '';
            img.style.display = 'none';
        }
    });
}

// 頁面載入完成後修復
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixImageSrc);
} else {
    fixImageSrc();
}

// 定期檢查新的圖片
setInterval(fixImageSrc, 5000);

console.log('🔧 emoji 404 錯誤修復腳本已載入');
