// ========== 主題定義模組 ==========

// 主題數據定義
var themes = window.AppThemes || (window.AppThemes = [
    {
        id: 'pink',
        name: '粉色主題',
        icon: '💖',
        buttonIcon: '💗',
        preview: 'linear-gradient(135deg, #ffeef5 0%, #fff5f9 100%)',
        color: '#ff69b4',
        category: 'basic'
    },
    {
        id: 'blue',
        name: '藍色主題',
        icon: '💙',
        buttonIcon: '💙',
        preview: 'linear-gradient(135deg, #e8f4fd 0%, #f0f8ff 100%)',
        color: '#4a90e2',
        category: 'basic'
    },
    {
        id: 'green',
        name: '綠色主題',
        icon: '🌿',
        buttonIcon: '🌱',
        preview: 'linear-gradient(135deg, #c6efce 0%, #e5f8e8 100%)',
        color: '#4caf50',
        category: 'basic'
    },
    {
        id: 'purple',
        name: '紫色主題',
        icon: '💜',
        buttonIcon: '💜',
        preview: 'linear-gradient(135deg, #f3e5f5 0%, #fce4ec 100%)',
        color: '#9c27b0',
        category: 'basic'
    },
    {
        id: 'orange',
        name: '橙色主題',
        icon: '🧡',
        buttonIcon: '🧡',
        preview: 'linear-gradient(135deg, #fff3e0 0%, #fff8f0 100%)',
        color: '#ff9800',
        category: 'basic'
    },
    {
        id: 'cyan',
        name: '青色主題',
        icon: '🩵',
        buttonIcon: '🩵',
        preview: 'linear-gradient(135deg, #e0f7fa 0%, #e1f5fe 100%)',
        color: '#00bcd4',
        category: 'basic'
    },
    {
        id: 'star',
        name: '星空主題',
        icon: '⭐',
        buttonIcon: '🌟',
        preview: 'linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #5e35b1 100%)',
        color: '#3949ab',
        category: 'cosmic'
    },
    {
        id: 'red',
        name: '紅色主題',
        icon: '❤️',
        buttonIcon: '❤️',
        preview: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
        color: '#f44336',
        category: 'basic'
    },
    {
        id: 'yellow',
        name: '黃色主題',
        icon: '💛',
        buttonIcon: '💛',
        preview: 'linear-gradient(135deg, #fffde7 0%, #fff9c4 100%)',
        color: '#ffeb3b',
        category: 'basic'
    },
    {
        id: 'indigo',
        name: '靛藍主題',
        icon: '💙',
        buttonIcon: '💙',
        preview: 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)',
        color: '#3f51b5',
        category: 'basic'
    },
    {
        id: 'teal',
        name: '青綠主題',
        icon: '💚',
        buttonIcon: '💚',
        preview: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)',
        color: '#009688',
        category: 'basic'
    },
    {
        id: 'aurora',
        name: '極光主題',
        icon: '🌈',
        buttonIcon: '🌈',
        preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#667eea',
        category: 'cosmic',
        backgroundImage: 'https://i.pinimg.com/1200x/fe/b3/f9/feb3f9990f903e1b7b0f4a2066a97722.jpg'
    },
    {
        id: 'noface',
        name: '無臉男主題',
        icon: '🪙',
        buttonIcon: '🪙',
        preview: 'url("https://i.pinimg.com/736x/85/9c/7c/859c7c50479b84c65089909c4acec1f3.jpg") center/cover',
        color: '#D4AF37',
        category: 'anime',
        backgroundImage: 'https://i.pinimg.com/736x/85/9c/7c/859c7c50479b84c65089909c4acec1f3.jpg'
    },
    {
        id: 'demonslayer',
        name: '鬼滅之刃主題',
        icon: '🗡️',
        buttonIcon: '🗡️',
        preview: 'url("https://i.pinimg.com/736x/73/3c/b0/733cb0696372d66f16702dd385a5aa5b.jpg") center/cover',
        color: '#00c2d1',
        category: 'anime',
        backgroundImage: 'https://i.pinimg.com/736x/73/3c/b0/733cb0696372d66f16702dd385a5aa5b.jpg'
    },
    {
        id: 'money',
        name: '金錢滿滿',
        icon: '💸',
        buttonIcon: '💸',
        preview: 'url("https://i.pinimg.com/736x/cc/56/8d/cc568d4109c2c92d507f597ba0ece7be.jpg") center/cover',
        color: '#16f49a',
        category: 'wealth',
        backgroundImage: 'https://i.pinimg.com/736x/cc/56/8d/cc568d4109c2c92d507f597ba0ece7be.jpg'
    },
    {
        id: 'caitu',
        name: '財兔滿滿',
        icon: '🐰',
        buttonIcon: '🐰',
        preview: 'url("https://i.pinimg.com/736x/85/9c/7c/859c7c50479b84c65089909c4acec1f3.jpg") center/cover',
        color: '#FFD700',
        category: 'wealth',
        backgroundImage: 'https://i.pinimg.com/736x/85/9c/7c/859c7c50479b84c65089909c4acec1f3.jpg'
    },
    {
        id: 'goldenTree',
        name: '金樹計畫',
        icon: '🌳',
        buttonIcon: '🌳',
        preview: 'url("https://i.pinimg.com/736x/28/a0/be/28a0be222d619be4c2944dbd309c4153.jpg") center/cover',
        color: '#8B4513',
        category: 'wealth',
        backgroundImage: 'https://i.pinimg.com/736x/28/a0/be/28a0be222d619be4c2944dbd309c4153.jpg'
    },
    {
        id: 'chaonengli',
        name: '鈔能力',
        icon: '💰',
        buttonIcon: '💰',
        preview: 'url("https://i.pinimg.com/736x/cc/56/8d/cc568d4109c2c92d507f597ba0ece7be.jpg") center/cover',
        color: '#D4AF37',
        category: 'wealth',
        backgroundImage: 'https://i.pinimg.com/736x/cc/56/8d/cc568d4109c2c92d507f597ba0ece7be.jpg'
    },
    {
        id: 'fruit',
        name: '水果清爽',
        icon: '🍓',
        buttonIcon: '🍋',
        preview: 'url("https://i.pinimg.com/736x/3a/57/69/3a576934dcdf3bb2ba06b3d2964ab296.jpg") center/cover',
        color: '#40E0D0',
        category: 'cute',
        backgroundImage: 'https://i.pinimg.com/736x/3a/57/69/3a576934dcdf3bb2ba06b3d2964ab296.jpg'
    },
    {
        id: 'meow',
        name: '喵喵喵',
        icon: '🐱',
        buttonIcon: '🐈',
        preview: 'url("https://i.pinimg.com/736x/9b/c1/cd/9bc1cd5e89c11cd36a290ef3cf707919.jpg") center/cover',
        color: '#87CEEB',
        category: 'cute',
        backgroundImage: 'https://i.pinimg.com/736x/9b/c1/cd/9bc1cd5e89c11cd36a290ef3cf707919.jpg'
    },
    {
        id: 'cute',
        name: '可愛圖片主題',
        icon: '🐾',
        buttonIcon: '🐾',
        preview: 'url("image/BMG.jpg") center/cover',
        color: '#4dd0e1',
        category: 'cute',
        backgroundImage: 'image/BMG.jpg'
    },
    {
        id: 'bluerose',
        name: '藍玫瑰騎士',
        icon: '🌹',
        buttonIcon: '🗡️',
        preview: 'url("https://i.pinimg.com/1200x/d5/a1/c1/d5a1c149ab3b2a049576504e83fd21f7.jpg") center/cover',
        color: '#007bff',
        category: 'fantasy',
        backgroundImage: 'https://i.pinimg.com/1200x/d5/a1/c1/d5a1c149ab3b2a049576504e83fd21f7.jpg'
    },
    {
        id: 'emeraldPrince',
        name: '翡翠王子',
        icon: '👑',
        buttonIcon: '🗡️',
        preview: 'url("https://i.pinimg.com/736x/55/40/2f/55402fb6bcf0c65c832636ad5504499f.jpg") center/cover',
        color: '#2E8B57',
        category: 'fantasy',
        backgroundImage: 'https://i.pinimg.com/736x/55/40/2f/55402fb6bcf0c65c832636ad5504499f.jpg'
    },
    {
        id: 'emerald',
        name: '翠綠之夢',
        icon: '💎',
        buttonIcon: '🌿',
        preview: 'url("https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg") center/cover',
        color: '#2E8B57',
        category: 'fantasy',
        backgroundImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg',
        investmentCardImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg',
        accountingCardImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg',
        walletBudgetCardImage: 'https://i.pinimg.com/1200x/95/64/99/956499812b93c3c5bf8226051c7e627f.jpg',
        monthlyPlanningCardImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg',
        investmentSettingsCardImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg',
        holdingCardImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg',
        buyingCardImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg',
        sellingCardImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg',
        dividendCardImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg'
    },
    {
        id: 'graffiti',
        name: '塗鴉風格',
        icon: '🎨',
        buttonIcon: '🎭',
        preview: 'url("https://i.pinimg.com/1200x/fa/a1/0c/faa10cd0b7816efb3ac74d940bc4bda4.jpg") center/cover',
        color: '#1E90FF',
        category: 'fantasy',
        backgroundImage: 'https://i.pinimg.com/1200x/fa/a1/0c/faa10cd0b7816efb3ac74d940bc4bda4.jpg',
        investmentCardImage: 'https://i.pinimg.com/1200x/fa/a1/0c/faa10cd0b7816efb3ac74d940bc4bda4.jpg',
        accountingCardImage: 'https://i.pinimg.com/1200x/fa/a1/0c/faa10cd0b7816efb3ac74d940bc4bda4.jpg',
        walletBudgetCardImage: 'https://i.pinimg.com/1200x/fa/a1/0c/faa10cd0b7816efb3ac74d940bc4bda4.jpg',
        monthlyPlanningCardImage: 'https://i.pinimg.com/1200x/fa/a1/0c/faa10cd0b7816efb3ac74d940bc4bda4.jpg',
        investmentSettingsCardImage: 'https://i.pinimg.com/1200x/fa/a1/0c/faa10cd0b7816efb3ac74d940bc4bda4.jpg',
        holdingCardImage: 'https://i.pinimg.com/1200x/fa/a1/0c/faa10cd0b7816efb3ac74d940bc4bda4.jpg',
        buyingCardImage: 'https://i.pinimg.com/1200x/fa/a1/0c/faa10cd0b7816efb3ac74d940bc4bda4.jpg',
        sellingCardImage: 'https://i.pinimg.com/1200x/fa/a1/0c/faa10cd0b7816efb3ac74d940bc4bda4.jpg',
        dividendCardImage: 'https://i.pinimg.com/1200x/fa/a1/0c/faa10cd0b7816efb3ac74d940bc4bda4.jpg'
    },
    {
        id: 'shinobu',
        name: '蝴蝶忍',
        icon: '🦋',
        buttonIcon: '🗡️',
        preview: 'url("https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg") center/cover',
        color: '#9B59B6',
        category: 'anime',
        backgroundImage: 'https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg',
        investmentCardImage: 'https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg',
        accountingCardImage: 'https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg',
        walletBudgetCardImage: 'https://i.pinimg.com/736x/8b/18/2b/8b182b4b3bdc6420ae9bb42b08025854.jpg',
        monthlyPlanningCardImage: 'https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg',
        investmentSettingsCardImage: 'https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg',
        holdingCardImage: 'https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg',
        buyingCardImage: 'https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg',
        sellingCardImage: 'https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg',
        dividendCardImage: 'https://i.pinimg.com/736x/26/c9/c0/26c9c0297b0cad3dfa8d6d5c41ccfc18.jpg'
    },
    {
        id: 'cyberpunkCity',
        name: '賽博龐克 City',
        icon: '🌆',
        buttonIcon: '🤖',
        preview: 'url("https://i.pinimg.com/736x/3b/90/48/3b90488a1815b544a78493213c747ee0.jpg") center/cover',
        color: '#ff3f81',
        category: 'dynamic'
    },
    {
        id: 'space',
        name: '星際宇航',
        icon: '🚀',
        buttonIcon: '🛸',
        preview: 'url("https://i.pinimg.com/1200x/d6/33/35/d63335d42debcc743999b03ce2edb23f.jpg") center/cover',
        color: '#00d4ff',
        category: 'cosmic',
        backgroundVideo: 'https://v1.pinimg.com/videos/iht/720p/4e/00/d1/4e00d1999152ab007ebe4aef36d5e2c9.mp4'
    },
    {
        id: 'dreamyBlue',
        name: '夢幻藍夜',
        icon: '🌙',
        buttonIcon: '🐰',
        preview: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e8ba3 100%)',
        color: '#1e3c72',
        category: 'fantasy',
        backgroundImage: 'https://i.pinimg.com/736x/6f/af/e2/6fafe2a9d450965373f9829a386805d1.jpg',
        investmentCardImage: 'https://i.pinimg.com/736x/6f/af/e2/6fafe2a9d450965373f9829a386805d1.jpg',
        accountingCardImage: 'https://i.pinimg.com/736x/6f/af/e2/6fafe2a9d450965373f9829a386805d1.jpg',
        walletBudgetCardImage: 'https://i.pinimg.com/736x/6f/af/e2/6fafe2a9d450965373f9829a386805d1.jpg',
        monthlyPlanningCardImage: 'https://i.pinimg.com/736x/6f/af/e2/6fafe2a9d450965373f9829a386805d1.jpg',
        investmentSettingsCardImage: 'https://i.pinimg.com/736x/6f/af/e2/6fafe2a9d450965373f9829a386805d1.jpg',
        holdingCardImage: 'https://i.pinimg.com/736x/6f/af/e2/6fafe2a9d450965373f9829a386805d1.jpg',
        buyingCardImage: 'https://i.pinimg.com/736x/6f/af/e2/6fafe2a9d450965373f9829a386805d1.jpg',
        sellingCardImage: 'https://i.pinimg.com/736x/6f/af/e2/6fafe2a9d450965373f9829a386805d1.jpg',
        dividendCardImage: 'https://i.pinimg.com/736x/6f/af/e2/6fafe2a9d450965373f9829a386805d1.jpg'
    },
    {
        id: 'forest',
        name: '森林清風',
        icon: '🌿',
        buttonIcon: '🌲',
        preview: 'linear-gradient(135deg, #03130d 0%, #103524 45%, #2f855a 100%)',
        color: '#2f855a',
        category: 'nature'
    },
    {
        id: 'snow',
        name: '飄雪主題',
        icon: '❄️',
        buttonIcon: '❄️',
        preview: 'linear-gradient(135deg, #e8f1ff 0%, #ffffff 100%)',
        color: '#93c5fd',
        category: 'nature'
    },
    {
        id: 'dreamyGalaxy',
        name: '夢幻星河',
        icon: '🌌',
        buttonIcon: '✨',
        preview: 'url("https://i.pinimg.com/736x/2a/20/38/2a2038686a48d048cc0b21e4f2ba44a5.jpg") center/cover',
        color: '#B19CD9',
        category: 'cosmic',
        backgroundImage: 'https://i.pinimg.com/736x/2a/20/38/2a2038686a48d048cc0b21e4f2ba44a5.jpg',
        investmentCardImage: 'https://i.pinimg.com/736x/2a/20/38/2a2038686a48d048cc0b21e4f2ba44a5.jpg',
        accountingCardImage: 'https://i.pinimg.com/736x/2a/20/38/2a2038686a48d048cc0b21e4f2ba44a5.jpg',
        walletBudgetCardImage: 'https://i.pinimg.com/736x/2a/20/38/2a2038686a48d048cc0b21e4f2ba44a5.jpg',
        monthlyPlanningCardImage: 'https://i.pinimg.com/736x/2a/20/38/2a2038686a48d048cc0b21e4f2ba44a5.jpg',
        investmentSettingsCardImage: 'https://i.pinimg.com/736x/2a/20/38/2a2038686a48d048cc0b21e4f2ba44a5.jpg',
        holdingCardImage: 'https://i.pinimg.com/736x/2a/20/38/2a2038686a48d048cc0b21e4f2ba44a5.jpg',
        buyingCardImage: 'https://i.pinimg.com/736x/2a/20/38/2a2038686a48d048cc0b21e4f2ba44a5.jpg',
        sellingCardImage: 'https://i.pinimg.com/736x/2a/20/38/2a2038686a48d048cc0b21e4f2ba44a5.jpg',
        dividendCardImage: 'https://i.pinimg.com/736x/2a/20/38/2a2038686a48d048cc0b21e4f2ba44a5.jpg'
    },
    {
        id: 'firefly',
        name: '螢火蟲主題',
        icon: '✨',
        buttonIcon: '✨',
        preview: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: '#ffd700',
        category: 'cosmic'
    },
    {
        id: 'neon',
        name: '霓虹波動',
        icon: '🟣',
        buttonIcon: '🟣',
        preview: 'linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)',
        color: '#ff006e',
        category: 'cosmic'
    },
    {
        id: 'halloween',
        name: '🎃 萬聖節',
        icon: '🎃',
        buttonIcon: '👻',
        preview: 'linear-gradient(135deg, #1a1a1a 0%, #ff6b35 100%)',
        color: '#ff6b35',
        category: 'dynamic',
        backgroundImage: 'https://i.pinimg.com/1200x/ae/a4/be/aea4be0e868161d58dcab76c3de7f1fb.jpg'
    },
    {
        id: 'midnight',
        name: '午夜深色',
        icon: '🌙',
        buttonIcon: '🌙',
        preview: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
        color: '#ffffff',
        category: 'dark'
    },
    {
        id: 'totoro',
        name: '龍貓主題',
        icon: '🌼',
        buttonIcon: '🌼',
        preview: 'url("https://i.pinimg.com/736x/f6/e9/10/f6e910dc17992265ad9833055ff153ac.jpg") center/cover',
        color: '#8fbc8f',
        category: 'anime',
        backgroundImage: 'https://i.pinimg.com/736x/f6/e9/10/f6e910dc17992265ad9833055ff153ac.jpg'
    },
    {
        id: 'shinchan',
        name: '蠟筆小新主題',
        icon: '🌻',
        buttonIcon: '🌻',
        preview: 'url("https://i.pinimg.com/1200x/c3/66/a8/c366a88a9b62dee30d8628ddae89afa9.jpg") center/cover',
        color: '#ffeb3b',
        category: 'anime',
        backgroundImage: 'https://i.pinimg.com/1200x/c3/66/a8/c366a88a9b62dee30d8628ddae89afa9.jpg'
    },
    {
        id: 'cutePastel',
        name: '可愛粉彩',
        icon: '🌸',
        buttonIcon: '🐰',
        preview: 'linear-gradient(135deg, #ffeaa7 0%, #dfe6e9 50%, #a29bfe 100%)',
        color: '#fd79a8',
        category: 'cute',
        backgroundImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg',
        investmentCardImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg',
        accountingCardImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg',
        walletBudgetCardImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg',
        monthlyPlanningCardImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg',
        investmentSettingsCardImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg',
        holdingCardImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg',
        buyingCardImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg',
        sellingCardImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg',
        dividendCardImage: 'https://i.pinimg.com/736x/54/58/17/5458177129997fbd8f56b713e39d2d0f.jpg'
    },
    {
        id: 'cuteCats',
        name: '可愛貓咪',
        icon: '🐱',
        buttonIcon: '🐈',
        preview: 'url("https://i.pinimg.com/736x/fe/2a/cf/fe2acfb6eedcf65941dad52ad03e3490.jpg") center/cover',
        color: '#FFB6C1',
        category: 'cute',
        backgroundImage: 'https://i.pinimg.com/736x/fe/2a/cf/fe2acfb6eedcf65941dad52ad03e3490.jpg',
        investmentCardImage: 'https://i.pinimg.com/736x/bf/bb/d8/bfbbd8069018715418b04a38e199a34d.jpg',
        accountingCardImage: 'https://i.pinimg.com/736x/a7/bb/f9/a7bbf99031a6d722e01446217985af5f.jpg',
        walletBudgetCardImage: 'https://i.pinimg.com/1200x/95/64/99/956499812b93c3c5bf8226051c7e627f.jpg'
    },
    {
        id: 'dreamy',
        name: '夢幻境域',
        icon: '🌈',
        buttonIcon: '🎨',
        preview: 'url("https://i.pinimg.com/736x/21/4d/cc/214dccff6dac6b30bebd621afc60669d.jpg") center/cover',
        color: '#87CEEB',
        category: 'cute',
        backgroundImage: 'https://i.pinimg.com/736x/21/4d/cc/214dccff6dac6b30bebd621afc60669d.jpg',
        investmentCardImage: 'https://i.pinimg.com/736x/21/4d/cc/214dccff6dac6b30bebd621afc60669d.jpg',
        accountingCardImage: 'https://i.pinimg.com/736x/21/4d/cc/214dccff6dac6b30bebd621afc60669d.jpg',
        walletBudgetCardImage: 'https://i.pinimg.com/1200x/95/64/99/956499812b93c3c5bf8226051c7e627f.jpg',
        monthlyPlanningCardImage: 'https://i.pinimg.com/736x/21/4d/cc/214dccff6dac6b30bebd621afc60669d.jpg',
        investmentSettingsCardImage: 'https://i.pinimg.com/736x/21/4d/cc/214dccff6dac6b30bebd621afc60669d.jpg',
        holdingCardImage: 'https://i.pinimg.com/736x/21/4d/cc/214dccff6dac6b30bebd621afc60669d.jpg',
        buyingCardImage: 'https://i.pinimg.com/736x/21/4d/cc/214dccff6dac6b30bebd621afc60669d.jpg',
        sellingCardImage: 'https://i.pinimg.com/736x/21/4d/cc/214dccff6dac6b30bebd621afc60669d.jpg',
        dividendCardImage: 'https://i.pinimg.com/736x/21/4d/cc/214dccff6dac6b30bebd621afc60669d.jpg'
    },
    {
        id: 'dreamyfish',
        name: '夢幻魚語',
        icon: '🐠',
        buttonIcon: '🐟',
        preview: 'url("https://i.pinimg.com/736x/a3/82/37/a382370de3785e43c0bd8db75fa13e67.jpg") center/cover',
        color: '#87CEEB',
        category: 'cute',
        backgroundImage: 'https://i.pinimg.com/736x/a3/82/37/a382370de3785e43c0bd8db75fa13e67.jpg',
        investmentCardImage: 'https://i.pinimg.com/736x/a3/82/37/a382370de3785e43c0bd8db75fa13e67.jpg',
        accountingCardImage: 'https://i.pinimg.com/736x/a3/82/37/a382370de3785e43c0bd8db75fa13e67.jpg',
        walletBudgetCardImage: 'https://i.pinimg.com/1200x/95/64/99/956499812b93c3c5bf8226051c7e627f.jpg',
        monthlyPlanningCardImage: 'https://i.pinimg.com/736x/a3/82/37/a382370de3785e43c0bd8db75fa13e67.jpg',
        investmentSettingsCardImage: 'https://i.pinimg.com/736x/a3/82/37/a382370de3785e43c0bd8db75fa13e67.jpg',
        holdingCardImage: 'https://i.pinimg.com/736x/a3/82/37/a382370de3785e43c0bd8db75fa13e67.jpg',
        buyingCardImage: 'https://i.pinimg.com/736x/a3/82/37/a382370de3785e43c0bd8db75fa13e67.jpg',
        sellingCardImage: 'https://i.pinimg.com/736x/a3/82/37/a382370de3785e43c0bd8db75fa13e67.jpg',
        dividendCardImage: 'https://i.pinimg.com/736x/a3/82/37/a382370de3785e43c0bd8db75fa13e67.jpg'
    },
    {
        id: 'nightglowSeasons',
        name: '夜光四季',
        icon: '🌃',
        buttonIcon: '✨',
        preview: 'linear-gradient(135deg, #0a1929 0%, #1e3a5f 25%, #2e5266 50%, #1a365d 75%, #0f172a 100%)',
        color: '#64ffda',
        category: 'dynamic',
        backgroundVideo: 'https://v1.pinimg.com/videos/iht/expMp4/c7/39/73/c739737a7c0471e01fa4e606507d0a48_720w.mp4'
    },
    {
        id: 'goldIngot',
        name: '金元寶',
        icon: '🏆',
        buttonIcon: '💰',
        preview: 'url("https://i.pinimg.com/736x/af/1e/51/af1e51dcb0a0763d836d2d2e51f4daad.jpg") center/cover',
        color: '#FFDF6B',
        category: 'wealth',
        backgroundImage: 'https://i.pinimg.com/736x/af/1e/51/af1e51dcb0a0763d836d2d2e51f4daad.jpg',
        investmentCardImage: 'https://i.pinimg.com/736x/af/1e/51/af1e51dcb0a0763d836d2d2e51f4daad.jpg',
        accountingCardImage: 'https://i.pinimg.com/736x/af/1e/51/af1e51dcb0a0763d836d2d2e51f4daad.jpg',
        walletBudgetCardImage: 'https://i.pinimg.com/736x/af/1e/51/af1e51dcb0a0763d836d2d2e51f4daad.jpg',
        monthlyPlanningCardImage: 'https://i.pinimg.com/736x/af/1e/51/af1e51dcb0a0763d836d2d2e51f4daad.jpg',
        investmentSettingsCardImage: 'https://i.pinimg.com/736x/af/1e/51/af1e51dcb0a0763d836d2d2e51f4daad.jpg',
        holdingCardImage: 'https://i.pinimg.com/736x/af/1e/51/af1e51dcb0a0763d836d2d2e51f4daad.jpg',
        buyingCardImage: 'https://i.pinimg.com/736x/af/1e/51/af1e51dcb0a0763d836d2d2e51f4daad.jpg',
        sellingCardImage: 'https://i.pinimg.com/736x/af/1e/51/af1e51dcb0a0763d836d2d2e51f4daad.jpg',
        dividendCardImage: 'https://i.pinimg.com/736x/af/1e/51/af1e51dcb0a0763d836d2d2e51f4daad.jpg'
    }
]);

// 主題分類定義
const themeCategories = {
    basic: {
        name: '經典色彩',
        icon: '🎨',
        description: '純色經典主題'
    },
    nature: {
        name: '自然風光',
        icon: '🌿',
        description: '森林、雪景等自然主題'
    },
    cosmic: {
        name: '宇宙星空',
        icon: '🌌',
        description: '星空、極光等宇宙主題'
    },
    dark: {
        name: '深色主題',
        icon: '🌙',
        description: '深色護眼主題'
    },
    anime: {
        name: '動漫風格',
        icon: '🎌',
        description: '吉卜力、鬼滅等動漫主題'
    },
    wealth: {
        name: '財富金錢',
        icon: '💰',
        description: '金錢、財富相關主題'
    },
    cute: {
        name: '可愛風格',
        icon: '🐾',
        description: '可愛、萌系主題'
    },
    fantasy: {
        name: '奇幻風格',
        icon: '🗡️',
        description: '騎士、奇幻主題'
    },
    dynamic: {
        name: '動態背景',
        icon: '🎬',
        description: '影片動態背景主題'
    }
};

// 導出模組
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { themes, themeCategories };
} else {
    window.ThemeData = { themes, themeCategories };
}
