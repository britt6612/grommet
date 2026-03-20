// src/__mocks__/styleMock.js
//
// Jest mock for Vanilla Extract .css.ts files.
//
// VE generates class name strings from recipe() and style() calls.
// In Jest (jsdom), no CSS is actually processed, so we return the
// property name as the class name string. This keeps snapshots readable
// and ensures className prop spreading works correctly in tests.
//
// Usage in jest.config / package.json:
//   "moduleNameMapper": { "\\.css\\.ts$": "<rootDir>/src/__mocks__/styleMock.js" }

module.exports = new Proxy(
  {},
  {
    get(target, prop) {
      if (prop === '__esModule') return false;

      // recipe() returns a function — return a mock that returns a class string
      if (prop.endsWith('Recipe') || prop.endsWith('recipe')) {
        return (variants = {}) => {
          const variantStr = Object.entries(variants)
            .filter(([, v]) => v != null && v !== false)
            .map(([k, v]) => `${k}_${v}`)
            .join('_');
          return variantStr ? `${prop}_${variantStr}` : prop;
        };
      }

      // style(), styleVariants(), createTheme() — return the prop name as a class string
      return prop;
    },
  },
);
