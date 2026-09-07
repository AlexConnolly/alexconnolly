/**
 * The page has no client-side behaviour: no navigation, no scroll tracking,
 * nothing to hydrate. So this entry exists only to pull the stylesheet into
 * the build — React runs at build time in scripts/prerender.mjs and never
 * reaches the browser.
 *
 * If interactivity is ever needed again, hydration comes back here:
 *   import { hydrateRoot } from "react-dom/client";
 *   import App from "./App";
 *   hydrateRoot(document.getElementById("root")!, <App />);
 */
import "./styles.css";
