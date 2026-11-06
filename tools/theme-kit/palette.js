// 下載每個主題的圖片，取出配色，並拼成一張縮圖總表
// 用法：node palette.js <themes.json> <輸出資料夾>
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const [listFile, outDir] = process.argv.slice(2);
const themes = JSON.parse(fs.readFileSync(listFile, 'utf8'));
const SKIP = new Set(['starCloudDream', 'ghostHalloween', 'halloweenCats']);
fs.mkdirSync(path.join(outDir, 'img'), { recursive: true });

const toHex = ([r, g, b]) => '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
const lum = ([r, g, b]) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const sat = ([r, g, b]) => { const mx = Math.max(r, g, b), mn = Math.min(r, g, b); return mx === 0 ? 0 : (mx - mn) / mx; };

// 簡單 k-means 取主色
function kmeans(px, k = 6, iter = 12) {
    let c = Array.from({ length: k }, (_, i) => px[Math.floor((i + 0.5) * px.length / k)].slice());
    let assign = new Array(px.length).fill(0);
    for (let t = 0; t < iter; t++) {
        for (let i = 0; i < px.length; i++) {
            let best = 0, bd = Infinity;
            for (let j = 0; j < k; j++) { const d = (px[i][0] - c[j][0]) ** 2 + (px[i][1] - c[j][1]) ** 2 + (px[i][2] - c[j][2]) ** 2; if (d < bd) { bd = d; best = j; } }
            assign[i] = best;
        }
        const sum = Array.from({ length: k }, () => [0, 0, 0, 0]);
        px.forEach((p, i) => { const s = sum[assign[i]]; s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; s[3]++; });
        c = sum.map((s, j) => s[3] ? [s[0] / s[3], s[1] / s[3], s[2] / s[3]] : c[j]);
    }
    const counts = new Array(k).fill(0); assign.forEach(a => counts[a]++);
    return c.map((col, j) => ({ rgb: col, share: counts[j] / px.length })).sort((a, b) => b.share - a.share);
}

(async () => {
    const result = {};
    const tiles = [];
    for (const t of themes) {
        if (SKIP.has(t.id) || !t.img) continue;
        const file = path.join(outDir, 'img', t.id + '.jpg');
        try {
            if (!fs.existsSync(file)) {
                const res = await fetch(t.img, { headers: { 'User-Agent': 'Mozilla/5.0' } });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
            }
            const { data, info } = await sharp(file).resize(48, 48, { fit: 'cover' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
            const px = [];
            for (let i = 0; i < data.length; i += 3) px.push([data[i], data[i + 1], data[i + 2]]);
            const clusters = kmeans(px);
            const avgLum = px.reduce((a, p) => a + lum(p), 0) / px.length;
            // 主色：佔比夠、飽和度最高的；深色：最暗；淺色：最亮
            const vivid = clusters.filter(c => c.share > 0.04).sort((a, b) => sat(b.rgb) * (0.4 + lum(b.rgb)) - sat(a.rgb) * (0.4 + lum(a.rgb)))[0];
            const dark = clusters.slice().sort((a, b) => lum(a.rgb) - lum(b.rgb))[0];
            const light = clusters.slice().sort((a, b) => lum(b.rgb) - lum(a.rgb))[0];
            result[t.id] = {
                name: t.name, cat: t.cat, dark: avgLum < 0.18,
                vivid: toHex(vivid.rgb), deep: toHex(dark.rgb), light: toHex(light.rgb),
                all: clusters.map(c => toHex(c.rgb) + ':' + Math.round(c.share * 100))
            };
            tiles.push({ id: t.id, file });
        } catch (e) {
            console.log('失敗', t.id, e.message);
        }
    }
    fs.writeFileSync(path.join(outDir, 'palettes.json'), JSON.stringify(result, null, 1));

    // 拼縮圖總表：每格 150x200，下方寫編號
    const W = 150, H = 200, COLS = 8;
    const make = async (list, out) => {
        const rows = Math.ceil(list.length / COLS);
        const composites = [];
        for (let i = 0; i < list.length; i++) {
            const img = await sharp(list[i].file).resize(W, H - 24, { fit: 'cover' }).toBuffer();
            const x = (i % COLS) * W, y = Math.floor(i / COLS) * H;
            composites.push({ input: img, left: x, top: y });
            const label = Buffer.from(`<svg width="${W}" height="24"><rect width="100%" height="100%" fill="white"/><text x="4" y="17" font-size="14" font-family="Arial">${list[i].id}</text></svg>`);
            composites.push({ input: label, left: x, top: y + H - 24 });
        }
        await sharp({ create: { width: COLS * W, height: rows * H, channels: 3, background: '#fff' } }).composite(composites).jpeg({ quality: 80 }).toFile(out);
    };
    await make(tiles.slice(0, 32), path.join(outDir, 'sheet1.jpg'));
    await make(tiles.slice(32), path.join(outDir, 'sheet2.jpg'));
    console.log('完成', Object.keys(result).length, '個主題');
})();
