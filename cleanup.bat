@echo off
echo ===================================
echo    Money Money 專案清理腳本
echo ===================================
echo.

echo 正在備份重要檔案...
if not exist "backup" mkdir backup
copy "index.html" "backup\"
copy "script.js" "backup\"
copy "styles.css" "backup\"
copy "styles-core.css" "backup\"
copy "themes.css" "backup\"
copy "stocks.json" "backup\"
echo 備份完成！

echo.
echo 開始清理測試檔案...

REM 第一批：測試檔案
echo 刪除測試檔案...
del /f /q "test-*.html" 2>nul
del /f /q "debug-*.html" 2>nul
del /f /q "diagnose-*.html" 2>nul

REM 第二批：主題檔案
echo 刪除多餘主題檔案...
del /f /q "*-theme.css" 2>nul
del /f /q "test-*-theme.html" 2>nul

REM 第三批：修復檔案
echo 刪除修復檔案...
del /f /q "fix-*.js" 2>nul
del /f /q "*-fix.js" 2>nul
del /f /q "fix-*.py" 2>nul
del /f /q "fix-*.ps1" 2>nul

REM 第四批：實驗檔案
echo 刪除實驗檔案...
del /f /q "*-demo.html" 2>nul
del /f /q "*-debug.html" 2>nul
del /f /q "*-simple.html" 2>nul
del /f /q "*-test.html" 2>nul

REM 第五批：開發工具
echo 刪除開發工具檔案...
del /f /q "check-*.js" 2>nul
del /f /q "add_*.js" 2>nul
del /f /q "apply-*.js" 2>nul
del /f /q "inject-*.js" 2>nul

REM 第六批：備份檔案
echo 刪除舊備份檔案...
del /f /q "*.backup" 2>nul
del /f /q "*_backup.*" 2>nul

REM 第七批：臨時檔案
echo 刪除臨時檔案...
del /f /q "temp_*.*" 2>nul
del /f /q "*.tmp" 2>nul

REM 第八批：其他不需要檔案
echo 刪除其他檔案...
del /f /q "*.bat" 2>nul
del /f /q "*.ps1" 2>nul
del /f /q "*.txt" 2>nul
del /f /q "*.md" 2>nul
del /f /q "*.py" 2>nul
del /f /q "*.gs" 2>nul

echo.
echo 清理完成！
echo.
echo 保留的核心檔案：
echo - index.html (主應用程式)
echo - script.js (主要 JavaScript)
echo - styles.css (完整樣式)
echo - styles-core.css (核心樣式)
echo - themes.css (主題樣式)
echo - stocks.json (股票資料)
echo - favicon.svg (網站圖標)
echo.
echo 重要文檔：
echo - README.md
echo - README-THEMES.md
echo - Google_Sheet_Setup_Guide.md
echo - Investment_Tracking_Guide.md
echo.
echo 請檢查應用程式是否正常運行！
pause
