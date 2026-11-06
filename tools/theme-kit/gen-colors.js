// 依每個主題的主色與圖片配色，算出主題設計工具組要用的顏色，並檢查文字對比
// 用法：node gen-colors.js <themes.json> <palettes.json> <網站資料夾> [--write]
const fs = require('fs');
const path = require('path');
const [listFile, palFile, root] = process.argv.slice(2);
const WRITE = process.argv.includes('--write');
const themes = JSON.parse(fs.readFileSync(listFile, 'utf8'));
const pals = JSON.parse(fs.readFileSync(palFile, 'utf8'));

// ---------- 顏色工具 ----------
const hexToRgb = h => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
const rgbToHex = c => '#' + c.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
function rgbToHsl([r, g, b]) {
    r /= 255; g /= 255; b /= 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b); let h = 0, s = 0; const l = (mx + mn) / 2;
    if (mx !== mn) { const d = mx - mn; s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; }
    return [h, s * 100, l * 100];
}
function hslToRgb([h, s, l]) {
    s /= 100; l /= 100; const k = n => (n + h / 30) % 12; const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [f(0) * 255, f(8) * 255, f(4) * 255];
}
const hsl = (h, s, l) => rgbToHex(hslToRgb([h, Math.max(0, Math.min(100, s)), Math.max(0, Math.min(100, l))]));
const lum = hex => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; const [r, g, b] = hexToRgb(hex); return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

// 把顏色的亮度往下壓，直到和指定背景的對比達標
function darkenUntil(hex, bg, target) {
    let [h, s, l] = rgbToHsl(hexToRgb(hex));
    let out = hex;
    while (contrast(out, bg) < target && l > 2) { l -= 2; out = hsl(h, s, l); }
    return out;
}
function lightenUntil(hex, bg, target) {
    let [h, s, l] = rgbToHsl(hexToRgb(hex));
    let out = hex;
    while (contrast(out, bg) < target && l < 98) { l += 2; out = hsl(h, s, l); }
    return out;
}

// 主題分到哪一種圖案風格（依圖片內容）
const MOTIFS = {
    paw: ['totoro', 'cuteCats', 'shibaPastel', 'pikachuSnow', 'leafCatGreen', 'piggyMelody', 'autumnBunny', 'mintBunnyTea', 'pastelCatDream', 'cozyWood', 'shinchan', 'anyMelody', 'shinchanFlashlightNight'],
    petal: ['floralGradient', 'mintRoseFairy', 'pastelBlossomMist', 'blueBunnyFlower', 'mintBlossomGarden', 'capybaraSakuraPond', 'lilyCatPond', 'starryBlossomEyes'],
    wave: ['oceanWhale', 'dreamyfish', 'totoroCitrusPool', 'samoyedSnowWave'],
    jelly: ['jellyParty', 'pastelStarryEyes', 'dreamy'],
    blade: ['demonslayer', 'waterBlade', 'waveRonin', 'amberRonin', 'serpentEyes', 'narutoGraffiti', 'graffiti', 'shinobu'],
    ink: ['kitsuneElegance', 'hanfuMaskNoir', 'peonyAzureMask', 'hanfuElegance', 'goldfishLantern'],
    gold: ['mandalaNoirBloom', 'caitu', 'crystalFortune', 'attractGold', 'ganeshaGoldOm', 'blackGoldFrog', 'blackCatCoinGalaxy', 'luckyCatPink', 'coinCatGold', 'noface', 'blueLotusGoldGlow'],
    lucky: ['getrich', 'fortuneGodGetRich', 'festive'],
    night: ['starryOceanPrince', 'littlePrinceWhaleNight', 'citrusNoirBlossom'],
    prince: ['emeraldPrince', 'emerald', 'mori', 'littlePrince', 'crimsonIvory'],
    basic: ['pink', 'blue', 'green', 'purple', 'orange', 'cyan', 'red', 'yellow', 'indigo', 'teal']
};
const motifOf = {};
for (const [m, ids] of Object.entries(MOTIFS)) ids.forEach(id => { motifOf[id] = m; });

const idx = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const aliases = JSON.parse(idx.match(/const themeFileAliases = (\{[^}]*\})/)[1].replace(/'/g, '"').replace(/(\w+):/g, '"$1":'));

const rows = [];
const blocksByFile = {};
for (const t of themes) {
    const motif = motifOf[t.id];
    if (!motif) continue;
    const pal = pals[t.id];
    // 主色：用主題原本挑的顏色；太灰的話改用圖片裡最鮮豔的顏色
    let base = t.color || (pal && pal.vivid) || '#7c4dff';
    let [h, s, l] = rgbToHsl(hexToRgb(base));
    if (s < 18 && pal) { [h, s, l] = rgbToHsl(hexToRgb(pal.vivid)); }
    s = Math.max(s, 35);
    l = Math.min(Math.max(l, 38), 60);
    const main = hsl(h, s, l);
    const mainDark = hsl(h, s, Math.max(l - 16, 18));
    const mainLight = hsl(h, Math.min(s, 80), 86);
    const paper = hsl(h, Math.min(s, 60), 97.5);
    const paper2 = hsl(h, Math.min(s, 55), 93);
    const line = hsl(h, Math.min(s, 50), 78);
    // 卡片上的文字：同色系的深色，和卡片底至少 7:1
    const ink = darkenUntil(hsl(h, Math.min(s, 45), 18), paper2, 7);
    const inkSoft = darkenUntil(hsl(h, Math.min(s, 30), 38), paper2, 4.6);
    // 深色區（夜光、刀鋒的選單列）
    const deepSrc = pal ? pal.deep : hsl(h, s, 14);
    let [dh, ds, dl] = rgbToHsl(hexToRgb(deepSrc));
    if (ds < 10) { dh = h; ds = Math.min(s, 40); }
    const deep = hsl(dh, Math.max(ds, 25), Math.min(dl, 16));
    const onDeep = lightenUntil(hsl(h, 40, 90), deep, 7);
    // 按鈕上的字：白字對主色和深主色都要 4.5:1，不夠就把按鈕顏色壓深；淺色主題改用深字
    let btnTop = main, btnBottom = mainDark, onMain = '#ffffff';
    if (contrast('#ffffff', btnBottom) < 4.5 || contrast('#ffffff', btnTop) < 4.5) {
        // 淺色主色：漸層改成「亮一點 → 主色」，配深字；兩端都要 4.5:1
        const lightTop = hsl(h, s, Math.min(l + 10, 80));
        const darkText = darkenUntil(hsl(h, Math.min(s, 60), 16), main, 4.5);
        if (l >= 50 && contrast(darkText, main) >= 4.5 && contrast(darkText, lightTop) >= 4.5) {
            btnTop = lightTop;
            btnBottom = main;
            onMain = darkText;
        } else {
            btnTop = darkenUntil(btnTop, '#ffffff', 4.6);
            btnBottom = darkenUntil(btnBottom, '#ffffff', 4.6);
        }
    }
    const title = darkenUntil(mainDark, '#ffffff', 5.5);
    const vals = {
        '--k-main': main, '--k-main-dark': mainDark, '--k-main-light': mainLight,
        '--k-btn-top': btnTop, '--k-btn-bottom': btnBottom, '--k-on-main': onMain,
        '--k-paper': paper, '--k-paper-2': paper2, '--k-line': line,
        '--k-ink': ink, '--k-ink-soft': inkSoft, '--k-title': title,
        '--k-deep': deep, '--k-on-deep': onDeep
    };
    const checks = {
        '卡片字': contrast(ink, paper2), '次要字': contrast(inkSoft, paper2),
        '按鈕字': Math.min(contrast(onMain, btnTop), contrast(onMain, btnBottom)),
        '標題': contrast(title, '#ffffff'), '深色區字': contrast(onDeep, deep)
    };
    rows.push({ id: t.id, motif, ...Object.fromEntries(Object.entries(checks).map(([k, v]) => [k, v.toFixed(1)])) });
    const file = 'css/themes/' + (aliases[t.id] || t.id) + '.css';
    const block = `:root[data-theme="${t.id}"] {\n${Object.entries(vals).map(([k, v]) => `    ${k}: ${v};`).join('\n')}\n}\n`;
    (blocksByFile[file] = blocksByFile[file] || []).push(block);
}

console.table(rows);
const weak = rows.filter(r => r['卡片字'] < 7 || r['次要字'] < 4.5 || r['按鈕字'] < 4.5 || r['標題'] < 4.5 || r['深色區字'] < 7);
console.log('對比不足的主題：', weak.length ? weak.map(r => r.id).join(', ') : '無');

if (WRITE) {
    const START = '/* ===== 主題設計工具組配色（自動產生，請勿手動修改；由 theme-kit 產生器更新） ===== */';
    const END = '/* ===== 主題設計工具組配色結束 ===== */';
    for (const [file, blocks] of Object.entries(blocksByFile)) {
        const full = path.join(root, file);
        let css = fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : '';
        const re = new RegExp('\\n?' + START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\n?');
        css = css.replace(re, '');
        css = css.replace(/\s*$/, '\n') + '\n' + START + '\n' + blocks.join('\n') + END + '\n';
        fs.writeFileSync(full, css);
    }
    fs.writeFileSync(path.join(path.dirname(listFile), 'motifs.json'), JSON.stringify(motifOf, null, 1));
    console.log('已寫入', Object.keys(blocksByFile).length, '個主題檔');
}
