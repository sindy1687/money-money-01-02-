# Money Money 專案清理腳本 (PowerShell 版本)
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "   Money Money 專案清理腳本" -ForegroundColor Yellow
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# 創建備份目錄
Write-Host "正在備份重要檔案..." -ForegroundColor Green
if (-not (Test-Path "backup")) {
    New-Item -ItemType Directory -Name "backup"
}

# 備份核心檔案
$coreFiles = @(
    "index.html",
    "script.js", 
    "styles.css",
    "styles-core.css",
    "themes.css",
    "stocks.json",
    "favicon.svg"
)

foreach ($file in $coreFiles) {
    if (Test-Path $file) {
        Copy-Item $file "backup\" -Force
        Write-Host "已備份: $file" -ForegroundColor Gray
    }
}

Write-Host "備份完成！" -ForegroundColor Green
Write-Host ""

# 清理函數
function Remove-FilesByPattern {
    param([string]$Pattern, [string]$Description)
    
    Write-Host "刪除 $Description..." -ForegroundColor Yellow
    $files = Get-ChildItem -Path $Pattern -ErrorAction SilentlyContinue
    $removedCount = 0
    
    foreach ($file in $files) {
        try {
            Remove-Item $file.FullName -Force -ErrorAction SilentlyContinue
            $removedCount++
            Write-Host "  已刪除: $($file.Name)" -ForegroundColor Gray
        } catch {
            Write-Host "  無法刪除: $($file.Name)" -ForegroundColor Red
        }
    }
    
    Write-Host "  共刪除 $removedCount 個檔案" -ForegroundColor Green
    Write-Host ""
}

# 第一批：測試檔案
Remove-FilesByPattern "test-*.html" "測試 HTML 檔案"
Remove-FilesByPattern "debug-*.html" "調試 HTML 檔案"
Remove-FilesByPattern "diagnose-*.html" "診斷 HTML 檔案"

# 第二批：主題檔案
Remove-FilesByPattern "*-theme.css" "主題 CSS 檔案"
Remove-FilesByPattern "test-*-theme.html" "主題測試檔案"

# 第三批：修復檔案
Remove-FilesByPattern "fix-*.js" "修復 JavaScript 檔案"
Remove-FilesByPattern "*-fix.js" "修復腳本檔案"
Remove-FilesByPattern "fix-*.py" "修復 Python 檔案"
Remove-FilesByPattern "fix-*.ps1" "修復 PowerShell 檔案"

# 第四批：實驗檔案
Remove-FilesByPattern "*-demo.html" "演示檔案"
Remove-FilesByPattern "*-debug.html" "調試檔案"
Remove-FilesByPattern "*-simple.html" "簡單測試檔案"
Remove-FilesByPattern "*-test.html" "測試檔案"

# 第五批：開發工具
Remove-FilesByPattern "check-*.js" "檢查工具檔案"
Remove-FilesByPattern "add_*.js" "添加工具檔案"
Remove-FilesByPattern "apply-*.js" "應用工具檔案"
Remove-FilesByPattern "inject-*.js" "注入工具檔案"

# 第六批：備份檔案
Remove-FilesByPattern "*.backup" "備份檔案"
Remove-FilesByPattern "*_backup.*" "舊備份檔案"

# 第七批：臨時檔案
Remove-FilesByPattern "temp_*.*" "臨時檔案"
Remove-FilesByPattern "*.tmp" "暫存檔案"

# 第八批：其他不需要檔案
Remove-FilesByPattern "*.bat" "批次檔"
Remove-FilesByPattern "*.ps1" "PowerShell 腳本"
Remove-FilesByPattern "*.txt" "文字檔案"
Remove-FilesByPattern "*.md" "Markdown 檔案"
Remove-FilesByPattern "*.py" "Python 檔案"
Remove-FilesByPattern "*.gs" "Google Apps Script 檔案"

# 保留重要文檔
Write-Host "保留重要文檔..." -ForegroundColor Green
$importantDocs = @(
    "README.md",
    "README-THEMES.md", 
    "Google_Sheet_Setup_Guide.md",
    "Investment_Tracking_Guide.md",
    "Universal_Backup_System_Guide.md",
    "cleanup-plan.md",
    "cleanup-script.md"
)

foreach ($doc in $importantDocs) {
    if (Test-Path $doc) {
        Write-Host "  保留: $doc" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "清理完成！" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "保留的核心檔案：" -ForegroundColor Yellow
foreach ($file in $coreFiles) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length
        Write-Host "  ✓ $file ($($size) bytes)" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file (不存在)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "重要文檔：" -ForegroundColor Yellow
foreach ($doc in $importantDocs) {
    if (Test-Path $doc) {
        Write-Host "  ✓ $doc" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "請檢查應用程式是否正常運行！" -ForegroundColor Cyan
Write-Host "備份檔案位於 'backup' 目錄中。" -ForegroundColor Gray
Write-Host ""

# 統計清理結果
$remainingFiles = Get-ChildItem -File | Measure-Object | Select-Object -ExpandProperty Count
Write-Host "清理後剩餘檔案數量: $remainingFiles" -ForegroundColor Magenta

Read-Host "按 Enter 鍵繼續..."
