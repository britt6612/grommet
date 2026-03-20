// src/js/utils/extend.js
//
// Backward-compatibility shim for theme.X.extend.
//
// theme.X.extend can be:
//   1. A plain CSS string:             `font-weight: bold;`
//   2. A css`` tagged template result: css`text-transform: uppercase;`
//   3. A css`` with embedded fns:      css`${(props) => props.plain && '...'}`
//   4. An arrow function:              (props) => `color: red;`
//   5. undefined / null (most common)
//
// This shim resolves any of those forms to a React style object so it can be
// applied via the `style` prop alongside a VE class name.
//
// Limitations (warned about in dev):
//   - Pseudo-selectors (&:hover { })  → dropped — use className prop instead
//   - @-rules (@media, @keyframes)     → dropped — use className prop instead
//
// See migration guide for how to migrate extend values to className.

/**
 * Resolves a theme.X.extend value to a React style object.
 *
 * @param {string|Function|Array|undefined} extend  The extend value from the theme.
 * @param {object} props  The current component props (passed to function forms).
 * @returns {object|undefined}  A React style object, or undefined if nothing to apply.
 */
export function resolveExtend(extend, props) {
  if (!extend) return undefined;

  // Resolve to a flat CSS string first.
  let resolved;
  if (typeof extend === 'function') {
    // Form 4: arrow function returning a CSS string
    resolved = extend(props);
  } else if (Array.isArray(extend)) {
    // Forms 2 & 3: css`` tagged template result (array of strings + functions)
    resolved = extend
      .map((part) => (typeof part === 'function' ? part(props) : part))
      .join('');
  } else {
    // Form 1: plain string
    resolved = String(extend);
  }

  if (!resolved) return undefined;

  // Dev-mode: detect and warn about rules the style prop cannot express.
  if (process.env.NODE_ENV !== 'production') {
    const hasPseudo = /&[\w\s:[\]()>+~*,]+\s*\{/.test(resolved);
    const hasAtRule = /@[\w-]+/.test(resolved);
    const detected = [
      ...(hasPseudo ? ['pseudo-selectors'] : []),
      ...(hasAtRule ? ['@-rules'] : []),
    ];

    if (detected.length > 0) {
      // eslint-disable-next-line no-console
      console.warn(
        `[grommet] theme.X.extend contains ${detected.join(' and ')} ` +
          `which cannot be applied via the style prop shim and have been dropped. ` +
          `Migrate to the className prop instead. ` +
          `See the v3 migration guide for details.`,
      );
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        `[grommet] theme.X.extend is deprecated and will be removed in a future ` +
          `major version. Use the className prop instead. ` +
          `See the v3 migration guide for details.`,
      );
    }
  }

  return parseCssStringToObject(resolved);
}

/**
 * Parses a flat CSS declaration string into a React style object.
 *
 * Handles property: value pairs only.
 * Nested rules, pseudo-selectors, and @-rules are NOT supported —
 * they are detected and warned about before this function is called.
 *
 * Values containing colons (e.g. rgb(), url()) are handled correctly
 * by joining all colon-split parts after the first.
 *
 * @param {string} cssString
 * @returns {object}
 */
function parseCssStringToObject(cssString) {
  if (!cssString) return undefined;
  return cssString
    .split(';')
    .filter(Boolean)
    .reduce((acc, declaration) => {
      // Split on first colon only — values like rgb(0,0,0) contain colons too.
      const colonIdx = declaration.indexOf(':');
      if (colonIdx === -1) return acc;
      const prop = declaration.slice(0, colonIdx).trim();
      const value = declaration.slice(colonIdx + 1).trim();
      if (prop && value) {
        // Convert kebab-case to camelCase for React style objects.
        const camelProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        acc[camelProp] = value;
      }
      return acc;
    }, {});
}
