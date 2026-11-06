# 主題設計工具組產生器

網站不會載入這個資料夾，只有新增或修改主題時才用得到。需要 Node.js；`palette.js` 另外需要 `sharp` 套件（`npm install sharp`）。

## 檔案

| 檔案 | 用途 |
|---|---|
| `build-kit.js` | 產生 `css/theme-kit.css`：11 種圖案風格（paw、petal、wave、jelly、blade、ink、gold、lucky、night、prince、basic）的按鈕、卡片、框線、「+」按鈕形狀 |
| `gen-colors.js` | 依每個主題的主色和圖片配色，算出 `--k-*` 配色並檢查文字對比，寫進各主題的 `css/themes/<id>.css` 結尾 |
| `palette.js` | 下載主題圖片、取出配色，輸出 `palettes.json` |
| `themes.json` | 主題清單（id、名稱、分類、主色、圖片網址） |
| `palettes.json` | 每張主題圖片取出的配色 |

## 新增一個主題時

1. 在 `js/theme.js` 的主題清單加入主題，並在 `themeMotifs` 指定它的圖案風格。
2. 在 `gen-colors.js` 開頭的 `MOTIFS` 把主題 id 加到同一種風格。
3. 更新 `themes.json`（加入新主題），執行 `node palette.js themes.json <輸出資料夾>` 取得配色。
4. 執行 `node gen-colors.js themes.json palettes.json <網站資料夾>` 先看對比報表，沒問題再加 `--write` 寫入。
5. 改了 `build-kit.js` 的話，執行 `node build-kit.js <網站資料夾>/css/theme-kit.css`。
6. 把 `index.html` 裡 `THEME_CSS_VERSION` 和 `theme-kit.css?v=` 的版本號改新，手機才會抓新檔。

手工設計的主題（星星雲朵夢、萬聖小幽靈、萬聖貓咪派對）不在 `themeMotifs` 裡，不會套用工具組。
