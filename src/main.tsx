import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const root = document.getElementById("root")!;

// The markup is prerendered at build time, so first paint needs no JavaScript.
// Hydration only wakes up the nav.
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
