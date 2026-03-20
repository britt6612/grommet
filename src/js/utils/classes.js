// src/js/utils/classes.js
//
// Lightweight class name merger — replaces clsx/classnames.
// No external dependency needed for this simple case.
//
// Usage:
//   cx(recipe({ size: 'medium' }), className)
//   cx(baseClass, isActive && activeClass, userClass)

/**
 * Merges two or more class name strings, filtering out falsy values.
 * Used by all migrated components to combine VE recipe output with
 * consumer-supplied className props.
 *
 * @param  {...(string|false|null|undefined)} args
 * @returns {string}
 */
export const cx = (...args) => args.filter(Boolean).join(' ');
