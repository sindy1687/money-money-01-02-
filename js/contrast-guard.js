// 文字對比守衛：換主題或畫面有新內容時，檢查每段文字和它背後的底色，
// 對比不夠（字太淡看不清楚）就把字色往深或往淺調到 4.5:1，保留原本的色相；
// 字直接壓在圖片背景上（算不出底色）時，加一圈光暈讓字浮出來。
// 換下一個主題前會先還原，避免上一個主題的修正殘留。

const ContrastGuard = (() => {
    const TARGET = 4.5;
    const MARK = 'data-cg';
    const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'LINK', 'META', 'HEAD', 'TITLE', 'SVG', 'PATH', 'IMG', 'VIDEO', 'CANVAS', 'NOSCRIPT', 'BR', 'OPTION']);

    // ---------- 顏色工具 ----------
    function parseColor(str) {
        const m = String(str).match(/rgba?\(([^)]+)\)/);
        if (!m) return null;
        const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number);
        return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
    }
    const lum = ({ r, g, b }) => {
        const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    const over = (top, bottom) => {
        const a = top.a;
        return { r: top.r * a + bottom.r * (1 - a), g: top.g * a + bottom.g * (1 - a), b: top.b * a + bottom.b * (1 - a), a: 1 };
    };
    function toHsl({ r, g, b }) {
        r /= 255; g /= 255; b /= 255;
        const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
        let h = 0, s = 0; const l = (mx + mn) / 2;
        if (mx !== mn) {
            const d = mx - mn;
            s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
            h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
            h /= 6;
        }
        return [h, s, l];
    }
    function fromHsl(h, s, l) {
        if (s === 0) return { r: l * 255, g: l * 255, b: l * 255, a: 1 };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
        const f = t => { t = (t + 1) % 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; };
        return { r: f(h + 1 / 3) * 255, g: f(h) * 255, b: f(h - 1 / 3) * 255, a: 1 };
    }
    const css = c => `rgb(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)})`;

    // 同色相往深或往淺調，直到對比達標；先試比較有機會達標的方向（黑字或白字哪個對比高）
    function fixColor(fg, bg) {
        const [h, s, l0] = toHsl(fg);
        const black = { r: 0, g: 0, b: 0, a: 1 }, white = { r: 255, g: 255, b: 255, a: 1 };
        const preferDark = ratio(black, bg) >= ratio(white, bg);
        for (const darker of preferDark ? [true, false] : [false, true]) {
            let l = l0;
            for (let i = 0; i < 60; i++) {
                l = darker ? Math.max(0, l - 0.02) : Math.min(1, l + 0.02);
                const c = fromHsl(h, s, l);
                if (ratio(c, bg) >= TARGET + 0.15) return c; // 留一點餘裕，轉成整數色碼後才不會差一點點
                if (l === 0 || l === 1) break;
            }
        }
        return preferDark ? black : white;
    }

    // ---------- 算出文字背後的底色 ----------
    // 回傳 { color } 或 { image: true }（底下是圖片，算不出單一顏色）
    let bgCache = new Map();
    function gradientColor(img) {
        const cols = (img.match(/rgba?\([^)]+\)/g) || []).map(parseColor).filter(Boolean);
        if (!cols.length) return null;
        const n = cols.length;
        return cols.reduce((acc, c) => ({ r: acc.r + c.r / n, g: acc.g + c.g / n, b: acc.b + c.b / n, a: acc.a + c.a / n }), { r: 0, g: 0, b: 0, a: 0 });
    }
    function backdrop(el) {
        if (!el || el.nodeType !== 1) return { color: { r: 255, g: 255, b: 255, a: 1 } };
        if (bgCache.has(el)) return bgCache.get(el);
        const cs = getComputedStyle(el);
        let result;
        const own = parseColor(cs.backgroundColor) || { r: 0, g: 0, b: 0, a: 0 };
        const img = cs.backgroundImage;
        let layer = own;
        if (img && img !== 'none') {
            if (/url\(/.test(img) && !/gradient/.test(img.split('url(')[0] || '')) {
                // 圖片背景：若底色本身夠不透明就當成底色，否則算不出來
                result = own.a >= 0.85 ? { color: { ...own, a: 1 } } : { image: true };
                bgCache.set(el, result);
                return result;
            }
            const g = gradientColor(img);
            if (g) layer = g.a > own.a ? g : own;
        }
        if (layer.a >= 0.95) {
            result = { color: { ...layer, a: 1 } };
        } else {
            const parent = el.parentElement ? backdrop(el.parentElement) : (el === document.documentElement ? { color: { r: 255, g: 255, b: 255, a: 1 } } : backdrop(document.documentElement));
            if (parent.image) {
                result = layer.a >= 0.6 ? { color: over(layer, { r: 128, g: 128, b: 128, a: 1 }), approx: true } : { image: true };
            } else {
                result = { color: layer.a > 0 ? over(layer, parent.color) : parent.color };
            }
        }
        bgCache.set(el, result);
        return result;
    }

    // 只看有文字或數字的；純 emoji / 符號的顏色不受字色影響，不用檢查
    const READABLE = /[\p{L}\p{N}]/u;
    function hasOwnText(el) {
        for (const n of el.childNodes) if (n.nodeType === 3 && READABLE.test(n.textContent)) return true;
        return false;
    }

    // ---------- 掃描與修正 ----------
    function check(el) {
        const cs = getComputedStyle(el);
        if (cs.visibility === 'hidden' || cs.opacity === '0') return null;
        if (/text/.test(cs.webkitBackgroundClip || cs.backgroundClip || '')) return null; // 漸層字
        const fill = parseColor(cs.webkitTextFillColor);
        const fg = fill && fill.a > 0 ? fill : parseColor(cs.color);
        if (!fg || fg.a === 0) return null;
        const bd = backdrop(el);
        if (bd.image) {
            const shadow = cs.textShadow && cs.textShadow !== 'none';
            return shadow ? null : { el, kind: 'image', fg };
        }
        const solidFg = fg.a < 1 ? over(fg, bd.color) : fg;
        const r = ratio(solidFg, bd.color);
        if (r >= TARGET) return null;
        // 半透明面板疊在圖片上：底色只是估計，有光暈就算看得清楚
        if (bd.approx && cs.textShadow && cs.textShadow !== 'none') return null;
        return { el, kind: 'low', fg: solidFg, bg: bd.color, ratio: r, approx: bd.approx };
    }

    function candidates(root) {
        const all = root.querySelectorAll ? root.querySelectorAll('*') : [];
        const list = root.nodeType === 1 ? [root, ...all] : [...all];
        return list.filter(el => !SKIP_TAGS.has(el.tagName) && !el.closest('svg') &&
            (hasOwnText(el) || el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT'));
    }

    // 立即掃描（測試、小範圍用）
    function scan(root = document.body, { dryRun = false } = {}) {
        bgCache = new Map();
        const issues = [];
        for (const el of candidates(root)) {
            const issue = check(el);
            if (issue) issues.push(issue);
        }
        if (!dryRun) issues.forEach(apply);
        return issues;
    }

    // 分批掃描：每批只做一點，手機閒下來再做下一批，畫面不會卡住
    const idle = window.requestIdleCallback || (cb => setTimeout(() => cb({ timeRemaining: () => 8 }), 16));
    let scanToken = 0;
    function scanInBatches(root = document.body, done) {
        const token = ++scanToken;
        bgCache = new Map();
        const list = candidates(root);
        let i = 0;
        const step = (deadline) => {
            if (token !== scanToken) return; // 又換了主題，舊的掃描停止
            while (i < list.length && deadline.timeRemaining() > 2) {
                const el = list[i++];
                if (!el.isConnected) continue;
                const issue = check(el);
                if (issue) apply(issue);
            }
            if (i < list.length) idle(step);
            else if (done) done();
        };
        idle(step);
    }

    function apply(issue) {
        const el = issue.el;
        if (!el.hasAttribute(MARK)) {
            el.setAttribute(MARK, JSON.stringify({
                color: [el.style.getPropertyValue('color'), el.style.getPropertyPriority('color')],
                fill: [el.style.getPropertyValue('-webkit-text-fill-color'), el.style.getPropertyPriority('-webkit-text-fill-color')],
                shadow: [el.style.getPropertyValue('text-shadow'), el.style.getPropertyPriority('text-shadow')]
            }));
        }
        if (issue.kind === 'low') {
            const fixed = fixColor(issue.fg, issue.bg);
            const c = css(fixed);
            el.style.setProperty('color', c, 'important');
            el.style.setProperty('-webkit-text-fill-color', c, 'important');
            // 底色只是估計（下面是圖片）或調到黑白還不夠：再加一圈光暈
            if (issue.approx || ratio(fixed, issue.bg) < TARGET) {
                const halo = lum(fixed) > 0.4 ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)';
                el.style.setProperty('text-shadow', `0 0 3px ${halo}, 0 0 8px ${halo}`, 'important');
            }
        } else {
            const light = lum(issue.fg) > 0.4;
            const halo = light ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255, 255, 255, 0.92)';
            el.style.setProperty('text-shadow', `0 0 3px ${halo}, 0 0 8px ${halo}, 0 1px 2px ${halo}`, 'important');
        }
    }

    // 還原這個守衛改過的地方
    function reset() {
        document.querySelectorAll(`[${MARK}]`).forEach(el => {
            try {
                const saved = JSON.parse(el.getAttribute(MARK));
                const put = (prop, [v, p]) => { if (v) el.style.setProperty(prop, v, p); else el.style.removeProperty(prop); };
                put('color', saved.color);
                put('-webkit-text-fill-color', saved.fill);
                put('text-shadow', saved.shadow);
            } catch (e) { /* 忽略 */ }
            el.removeAttribute(MARK);
        });
    }

    // 檢查期間暫停顏色的過場動畫，才讀得到最後的顏色（不然會讀到變色到一半的值）
    const FREEZE = 'data-cg-freeze';
    (function addFreezeStyle() {
        const style = document.createElement('style');
        style.textContent = `html[${FREEZE}] *, html[${FREEZE}] *::before, html[${FREEZE}] *::after { transition: none !important; }`;
        document.head.appendChild(style);
    })();
    const freeze = () => { document.documentElement.setAttribute(FREEZE, ''); void document.body.offsetHeight; };
    const unfreeze = () => document.documentElement.removeAttribute(FREEZE);

    // 整頁重新檢查：還原舊的修正 → 讀最後的顏色 → 修正
    function fullCheck({ dryRun = false } = {}) {
        freeze();
        reset();
        const issues = scan(document.body, { dryRun });
        requestAnimationFrame(unfreeze);
        return issues;
    }

    // ---------- 何時執行 ----------
    let fullTimer = null;
    function scheduleFull(delay = 350) {
        clearTimeout(fullTimer);
        fullTimer = setTimeout(() => {
            requestAnimationFrame(() => {
                freeze();
                reset();
                scanInBatches(document.body, unfreeze);
            });
        }, delay);
    }

    let pending = new Set();
    let partTimer = null;
    function schedulePart(node) {
        pending.add(node);
        clearTimeout(partTimer);
        partTimer = setTimeout(() => {
            const nodes = [...pending];
            pending = new Set();
            requestAnimationFrame(() => nodes.forEach(n => { if (n.isConnected) scan(n); }));
        }, 250);
    }

    function start() {
        // 換主題：html 的 data-theme 改變，或主題樣式檔載入完成
        new MutationObserver(muts => {
            if (muts.some(m => m.attributeName === 'data-theme')) scheduleFull(600);
        }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        document.addEventListener('themestylesheetload', () => scheduleFull(150));

        // 畫面新增內容（對話框、記錄列表等）
        new MutationObserver(muts => {
            for (const m of muts) {
                for (const n of m.addedNodes) {
                    if (n.nodeType === 1 && !n.closest('[data-cg-skip]')) schedulePart(n);
                }
            }
        }).observe(document.body, { childList: true, subtree: true });

        scheduleFull(800);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();

    return { scan, reset, fullCheck, ratio, parseColor };
})();

window.ContrastGuard = ContrastGuard;
