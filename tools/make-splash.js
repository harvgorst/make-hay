// Generates the iPhone launch screens in splash/: the owner's scythe artwork (brand/make-hay-logo-art.png, the logo without its words)
// with "Make Hay" set in Jacquard 12 (tools/jacquard-12.woff2, SIL Open Font License) in the logo's olive. The owner asked for this lettering in 2.3.0.
// Usage: node tools/make-splash.js, then replace the apple-touch-startup-image links in index.html with tools/splash-links.html, adding ?v=<version> so iPhones fetch the new images.
// brand/make-hay-logo-art.png is brand/make-hay-logo-clean.png (background flattened to #FDF8E1) cropped above the words; the icons come from the same file.
// Afterwards quantise the PNGs (96 colours, no dither) to keep each launch image around 75 KB.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'splash');
const LOGO = fs.readFileSync(path.join(ROOT, 'brand', 'make-hay-logo-art.png')).toString('base64');
const JQ = fs.readFileSync(path.join(__dirname, 'jacquard-12.woff2')).toString('base64');
const OLIVE = '#505328';   // the lettering colour of the original logo
const CREAM = '#FDF8E1';   // the logo's own background, so its edges disappear
// iPhone screen sizes (CSS points, portrait) and pixel ratios
const SIZES = [[375,667,2],[414,736,3],[375,812,3],[414,896,2],[414,896,3],[390,844,3],[428,926,3],[393,852,3],[430,932,3],[402,874,3],[440,956,3],[420,912,3]];
(async () => {
  for (const f of fs.readdirSync(OUT)) if (f.startsWith('splash-')) fs.unlinkSync(path.join(OUT, f));
  const b = await chromium.launch(); const links = [];
  for (const [w, h, r] of SIZES) for (const orient of ['portrait', 'landscape']) {
    const [vw, vh] = orient === 'portrait' ? [w, h] : [h, w];
    const p = await b.newPage({ viewport: { width: vw, height: vh }, deviceScaleFactor: r });
    const m = Math.min(vw, vh);
    await p.setContent(`<style>@font-face{font-family:J;src:url(data:font/woff2;base64,${JQ})}
      html,body{margin:0;height:100%;background:${CREAM}}body{display:flex;flex-direction:column;align-items:center;justify-content:center}
      img{width:${Math.round(m * .74)}px;height:auto}div{font:400 ${Math.round(m * .19)}px/1 J;color:${OLIVE};margin-top:6px}</style>
      <img src="data:image/png;base64,${LOGO}"><div>Make Hay</div>`);
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(100);
    const name = `splash-${w}x${h}@${r}-${orient}.png`;
    await p.screenshot({ path: path.join(OUT, name) });
    await p.close();
    links.push(`<link rel="apple-touch-startup-image" media="screen and (device-width: ${w}px) and (device-height: ${h}px) and (-webkit-device-pixel-ratio: ${r}) and (orientation: ${orient})" href="splash/${name}">`);
  }
  fs.writeFileSync(path.join(__dirname, 'splash-links.html'), links.join('\n'));
  await b.close();
})();
