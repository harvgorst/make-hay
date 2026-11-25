// Generates the iPhone launch screens in splash/ from splash/logo.png (the Make Hay logo with its words).
// Usage: node tools/make-splash.js, then replace the apple-touch-startup-image links in index.html with tools/splash-links.html, adding ?v=<version> so iPhones fetch the new images.
// splash/logo.png and the icons come from brand/make-hay-logo-clean.png (the owner's logo with its background texture flattened to #FDF8E1).
// Afterwards quantise the PNGs (96 colours, no dither) to keep each launch image around 75 KB.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'splash');
const LOGO = fs.readFileSync(path.join(OUT, 'logo.png')).toString('base64');
const CREAM = '#FDF8E1';   // the logo's own background, so its edges disappear
// The top of each launch screen is the app's dark top bar: iOS keeps showing the launch image in the clock strip
// above the page, so this band is what colours that strip. Band = clock strip + the app's 64px top bar (63px + 1px line).
const TOPBAR = '#1B2019', TOPLINE = '#353D31', BAR = 64;
// Tallest clock strip (points) among the iPhones of each screen size; landscape hides it except on home-button phones.
const STRIP = { 667: 20, 736: 20, 812: 50, 896: 48, 844: 47, 926: 47, 852: 59, 932: 59, 874: 62, 956: 62, 912: 68 };
// iPhone screen sizes (CSS points, portrait) and pixel ratios
const SIZES = [[375,667,2],[414,736,3],[375,812,3],[414,896,2],[414,896,3],[390,844,3],[428,926,3],[393,852,3],[430,932,3],[402,874,3],[440,956,3],[420,912,3]];
(async () => {
  for (const f of fs.readdirSync(OUT)) if (f.startsWith('splash-')) fs.unlinkSync(path.join(OUT, f));
  const b = await chromium.launch(); const links = [];
  for (const [w, h, r] of SIZES) for (const orient of ['portrait', 'landscape']) {
    const [vw, vh] = orient === 'portrait' ? [w, h] : [h, w];
    const p = await b.newPage({ viewport: { width: vw, height: vh }, deviceScaleFactor: r });
    const strip = orient === 'portrait' || h < 800 ? STRIP[h] : 0;
    await p.setContent(`<style>html,body{margin:0;height:100%;background:${CREAM}}body{display:flex;align-items:center;justify-content:center}
      body::before{content:'';position:fixed;left:0;right:0;top:0;height:${strip + BAR - 1}px;background:${TOPBAR};border-bottom:1px solid ${TOPLINE}}
      img{width:${Math.round(Math.min(vw, vh) * .72)}px;height:auto}</style><img src="data:image/png;base64,${LOGO}">`);
    await p.waitForTimeout(100);
    const name = `splash-${w}x${h}@${r}-${orient}.png`;
    await p.screenshot({ path: path.join(OUT, name) });
    await p.close();
    links.push(`<link rel="apple-touch-startup-image" media="screen and (device-width: ${w}px) and (device-height: ${h}px) and (-webkit-device-pixel-ratio: ${r}) and (orientation: ${orient})" href="splash/${name}">`);
  }
  fs.writeFileSync(path.join(__dirname, 'splash-links.html'), links.join('\n'));
  await b.close();
})();
