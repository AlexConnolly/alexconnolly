/**
 * Renders assets/og.html to public/og.png at exactly 1200x630.
 *
 * The card is authored as a page rather than an SVG so it uses the real
 * webfont — an SVG rasteriser would silently fall back to something else and
 * nobody would notice until the link preview looked wrong.
 *
 *   npm run og
 *
 * Needs Playwright's Chromium once:  npx playwright install chromium
 */
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { existsSync } from "node:fs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const card = resolve(root, "assets/og.html");
const out = resolve(root, "public/og.png");

if (!existsSync(card)) {
  console.error(`missing ${card}`);
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});

await page.goto(`file://${card.split("\\").join("/")}`, { waitUntil: "networkidle" });
// the webfont is the whole point; do not shoot before it lands
await page.evaluate(() => document.fonts.ready);

await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();

console.log(`wrote ${out}`);
