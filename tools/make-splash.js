// Generates the iPhone launch screens in splash/ from splash/mark.png.
// Usage: node tools/make-splash.js path/to/ibm-plex-sans-latin-600-normal.woff2
// (font from the @fontsource/ibm-plex-sans npm package). Then paste tools/splash-links.html into the <head> of index.html.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path'), ROOT = path.join(__dirname, '..');
const FONT = process.argv[2], OUT = path.join(ROOT, 'splash'), ICON = fs.readFileSync(path.join(OUT, 'mark.png')).toString('base64');
// iPhone screen sizes (CSS points, portrait) and pixel ratios
const SIZES = [[375,667,2],[414,736,3],[375,812,3],[414,896,2],[414,896,3],[390,844,3],[428,926,3],[393,852,3],[430,932,3],[402,874,3],[440,956,3],[420,912,3]];
const THEMES = { light: { bg: '#4A6B38', fg: '#F3F6EC' }, dark: { bg: '#1B2019', fg: '#E6EADF' } };
(async () => {
  const b = await chromium.launch(); const links = [];
  for (const [w, h, r] of SIZES) for (const orient of ['portrait', 'landscape']) for (const [tn, t] of Object.entries(THEMES)) {
    const [vw, vh] = orient === 'portrait' ? [w, h] : [h, w];
    const p = await b.newPage({ viewport: { width: vw, height: vh }, deviceScaleFactor: r });
    await p.setContent(`<style>@font-face{font-family:Plex;src:url(data:font/woff2;base64,${fs.readFileSync(FONT).toString('base64')}) format('woff2');font-weight:600}
      html,body{margin:0;height:100%;background:${t.bg};}
      body{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${Math.round(Math.min(vw, vh) * .05)}px}
      img{width:${Math.round(Math.min(vw, vh) * .34)}px;height:auto;display:block}
      p{margin:0;font:600 ${Math.round(Math.min(vw, vh) * .075)}px Plex, sans-serif;color:${t.fg};letter-spacing:-.01em}</style>
      <img src="data:image/png;base64,${ICON}"><p>Make Hay</p>`);
    await p.waitForTimeout(150);
    const name = `splash-${w}x${h}@${r}-${orient}-${tn}.png`;
    await p.screenshot({ path: `${OUT}/${name}` });
    await p.close();
    links.push(`<link rel="apple-touch-startup-image" media="screen and (device-width: ${w}px) and (device-height: ${h}px) and (-webkit-device-pixel-ratio: ${r}) and (orientation: ${orient}) and (prefers-color-scheme: ${tn})" href="splash/${name}">`);
  }
  fs.writeFileSync(path.join(__dirname, 'splash-links.html'), links.join('\n'));
  await b.close();
})();
