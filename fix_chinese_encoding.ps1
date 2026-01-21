# 修復CSS中的中文編碼問題
$cssFilePath = "c:\Users\gaga2\OneDrive\Desktop\fixed_files\styles.css"

# 讀取CSS檔案
$cssContent = Get-Content -Path $cssFilePath -Raw -Encoding UTF8

# 基本修復 - 替換常見的亂碼組合
$cssContent = $cssContent -replace '钅', '狀態顏色'
$cssContent = $cssContent -replace '銝駁', '主題'
$cssContent = $cssContent -replace '憿讛', '顏色'
$cssContent = $cssContent -replace '蝟餌', '組合'
$cssContent = $cssContent -replace '峕艶', '背景'
$cssContent = $cssContent -replace '𦠜', '邊框'
$cssContent = $cssContent -replace '啣蔣', '陰影'
$cssContent = $cssContent -replace '𤩺', '主要'
$cssContent = $cssContent -replace '滢', '側邊欄'
$cssContent = $cssContent -replace '詨', '數字'
$cssContent = $cssContent -replace '寞', '鍵盤'
$cssContent = $cssContent -replace '厰', '輸入'
$cssContent = $cssContent -replace '璅', '表單'
$cssContent = $cssContent -replace '撘', '頁面'
$cssContent = $cssContent -replace '瑁', '樣式'
$cssContent = $cssContent -replace '矽', '卡片'
$cssContent = $cssContent -replace '甈', '文字'
$cssContent = $cssContent -replace '霈', '淺色'
$cssContent = $cssContent -replace '絞', '漸層'

# 寫回檔案
$cssContent | Out-File -FilePath $cssFilePath -Encoding UTF8 -Force

Write-Host "CSS中文編碼問題已修復！" -ForegroundColor Green
