import "@testing-library/jest-dom/vitest";

// jsdom has no layout engine, so offsetTop is always 0 and matchMedia is absent.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
