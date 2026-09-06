// Renders the app to static HTML at build time so the page is readable with
// JavaScript off, and first paint never waits on a bundle. PLAN.md F8.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
// Windows: a bare absolute path is not a valid ESM specifier, it needs file://
const { render } = await import(pathToFileURL(resolve(root, "dist-ssr/entry-server.js")).href);
const template = readFileSync(resolve(root, "dist/index.html"), "utf-8");

const html = template.replace("<!--app-html-->", render());
writeFileSync(resolve(root, "dist/index.html"), html);

console.log(`prerendered ${html.length} bytes into dist/index.html`);
