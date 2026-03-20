/**
 * Grommet Theme Contract — Vanilla Extract
 *
 * Defines the type-safe CSS custom property structure for the Grommet theme.
 * All concrete theme implementations (grommet.theme.css.ts, custom themes) must
 * satisfy every key in this contract.
 *
 * Values are `null` — the contract only declares shape; actual values live in
 * theme implementation files created with `createTheme(vars, { ... })`.
 *
 * Token coverage: all 79 components, Phase 0.3.
 * Computed from generate(24, 6) — see src/js/themes/base.js.
 */

import { createThemeContract } from '@vanilla-extract/css';

export const vars = createThemeContract({
  // ─── Global ───────────────────────────────────────────────────────────────

  color: {
    brand: null,
    background: null,
    backgroundBack: null,
    backgroundFront: null,
    backgroundContrast: null,
    border: null,
    control: null,
    focus: null,
    placeholder: null,
    selected: null,
    selectedBackground: null,
    selectedText: null,
    text: null,
    textStrong: null,
    textWeak: null,
    textXweak: null,
    icon: null,
    active: null,
    activeBackground: null,
    activeText: null,
    white: null,
    black: null,
    // Status
    statusCritical: null,
    statusWarning: null,
    statusOk: null,
    statusUnknown: null,
    statusDisabled: null,
    // Named accents (accent-1 … accent-4 from generate)
    accent1: null,
    accent2: null,
    accent3: null,
    accent4: null,
    // Named neutrals
    neutral1: null,
    neutral2: null,
    neutral3: null,
    neutral4: null,
    // Named light/dark scale
    light1: null,
    light2: null,
    light3: null,
    light4: null,
    light5: null,
    light6: null,
    dark1: null,
    dark2: null,
    dark3: null,
    dark4: null,
    dark5: null,
    dark6: null,
  },

  // Edge sizes — map to global.edgeSize in generate()
  edgeSize: {
    none: null,
    hair: null,
    xxsmall: null,
    xsmall: null,
    small: null,
    medium: null,
    large: null,
    xlarge: null,
    responsiveBreakpoint: null,
  },

  // Font globals
  font: {
    family: null,
    size: null,
    height: null,
    // Face declarations are not tokens — loaded separately
  },

  // Focus ring
  focus: {
    shadowColor: null,
    shadowSize: null,
    borderColor: null,
  },

  // ─── Component tokens — Phase 1 ───────────────────────────────────────────
  // Text
  // fontSizing(n): size = 18+n*4 px, height = 24+n*4 px, maxWidth = 24*(18+n*4) px
  text: {
    xsmall: { size: null, height: null, maxWidth: null }, // fontSizing(-1.5) → 12px/18px/288px
    small: { size: null, height: null, maxWidth: null }, // fontSizing(-1)   → 14px/20px/336px
    medium: { size: null, height: null, maxWidth: null }, // fontSizing(0)    → 18px/24px/432px
    large: { size: null, height: null, maxWidth: null }, // fontSizing(1)    → 22px/28px/528px
    xlarge: { size: null, height: null, maxWidth: null }, // fontSizing(2)    → 26px/32px/624px
    xxlarge: { size: null, height: null, maxWidth: null }, // fontSizing(4)    → 34px/40px/816px
    t2xl: { size: null, height: null, maxWidth: null }, // fontSizing(4)    → 34px/40px/816px
    t3xl: { size: null, height: null, maxWidth: null }, // fontSizing(6)    → 42px/48px/1008px
    t4xl: { size: null, height: null, maxWidth: null }, // fontSizing(9)    → 54px/60px/1296px
    t5xl: { size: null, height: null, maxWidth: null }, // fontSizing(13)   → 70px/76px/1680px
    t6xl: { size: null, height: null, maxWidth: null }, // fontSizing(18)   → 90px/96px/2160px
  },

  // Heading — level 1-6, each at small/medium/large/xlarge viewport size
  heading: {
    weight: null,
    level: {
      '1': {
        small: { size: null, height: null, maxWidth: null }, // fontSizing(4)  → 34px
        medium: { size: null, height: null, maxWidth: null }, // fontSizing(8)  → 50px
        large: { size: null, height: null, maxWidth: null }, // fontSizing(16) → 82px
        xlarge: { size: null, height: null, maxWidth: null }, // fontSizing(24) → 114px
      },
      '2': {
        small: { size: null, height: null, maxWidth: null }, // fontSizing(2)  → 26px
        medium: { size: null, height: null, maxWidth: null }, // fontSizing(4)  → 34px
        large: { size: null, height: null, maxWidth: null }, // fontSizing(8)  → 50px
        xlarge: { size: null, height: null, maxWidth: null }, // fontSizing(12) → 66px
      },
      '3': {
        small: { size: null, height: null, maxWidth: null }, // fontSizing(1)  → 22px
        medium: { size: null, height: null, maxWidth: null }, // fontSizing(2)  → 26px
        large: { size: null, height: null, maxWidth: null }, // fontSizing(4)  → 34px
        xlarge: { size: null, height: null, maxWidth: null }, // fontSizing(6)  → 42px
      },
      '4': {
        small: { size: null, height: null, maxWidth: null }, // fontSizing(0)  → 18px
        medium: { size: null, height: null, maxWidth: null }, // fontSizing(0)  → 18px
        large: { size: null, height: null, maxWidth: null }, // fontSizing(0)  → 18px
        xlarge: { size: null, height: null, maxWidth: null }, // fontSizing(0)  → 18px
      },
      '5': {
        small: { size: null, height: null, maxWidth: null }, // fontSizing(-0.5) → 16px (rounded)
        medium: { size: null, height: null, maxWidth: null },
        large: { size: null, height: null, maxWidth: null },
        xlarge: { size: null, height: null, maxWidth: null },
      },
      '6': {
        small: { size: null, height: null, maxWidth: null }, // fontSizing(-1)   → 14px
        medium: { size: null, height: null, maxWidth: null },
        large: { size: null, height: null, maxWidth: null },
        xlarge: { size: null, height: null, maxWidth: null },
      },
    },
  },

  // Paragraph — reuses fontSizing
  paragraph: {
    small: { size: null, height: null, maxWidth: null }, // fontSizing(-1) → 14px
    medium: { size: null, height: null, maxWidth: null }, // fontSizing(0)  → 18px
    large: { size: null, height: null, maxWidth: null }, // fontSizing(1)  → 22px
    xlarge: { size: null, height: null, maxWidth: null }, // fontSizing(2)  → 26px
    xxlarge: { size: null, height: null, maxWidth: null }, // fontSizing(4)  → 34px
  },

  // Anchor
  anchor: {
    color: null,
    fontWeight: null,
    textDecoration: null,
    hoverTextDecoration: null,
    gap: null,
  },

  // Avatar
  avatar: {
    sizeXsmall: null, // 18px
    sizeSmall: null, // 24px
    sizeMedium: null, // 48px  (default)
    sizeLarge: null, // 72px
    sizeXlarge: null, // 96px
    size2xl: null, // 120px
    size3xl: null, // 144px
    size4xl: null, // 168px
    size5xl: null, // 192px
  },

  // Tag
  tag: {
    borderRadius: null,
    padHorizontal: null,
    padVertical: null,
    valueWeight: null,
  },

  // Spinner — container size variants
  spinner: {
    sizeXsmall: null, // 18px
    sizeSmall: null, // 24px
    sizeMedium: null, // 48px
    sizeLarge: null, // 72px
    sizeXlarge: null, // 96px
  },

  // ─── Component tokens — Phase 2 (layout) ──────────────────────────────────
  // Button (already in POC — kept for completeness)
  button: {
    borderWidth: null,
    borderRadius: null,
    borderColor: null,
    padVertical: null,
    padHorizontal: null,
    // Sizes
    smallBorderRadius: null,
    smallPadVertical: null,
    smallPadHorizontal: null,
    largeBorderRadius: null,
    largePadVertical: null,
    largePadHorizontal: null,
    // Kind colors
    primaryBackground: null,
    primaryColor: null,
    secondaryBorderColor: null,
    secondaryColor: null,
    // Hover
    hoverBackground: null,
    // Active / disabled
    activeBackground: null,
    disabledOpacity: null,
  },

  // Box — gap/pad reference tokens reuse edgeSize; overflow/direction are static
  // Box-specific background tokens handled at runtime via normalizeColor

  // Header / Footer / Nav / Main / Sidebar / Page — purely layout shells;
  // their only token is sticky zIndex and gap
  header: {
    gap: null,
    stickyZIndex: null,
  },

  // Layer / Drop (Phase 3)
  layer: {
    borderRadius: null,
    backgroundDark: null,
    backgroundLight: null,
    overlayBackground: null,
    zIndex: null,
  },

  // ─── Global responsive breakpoints ────────────────────────────────────────
  breakpoint: {
    small: null, // 768px (baseSpacing * 32)
    medium: null, // 1536px (baseSpacing * 64)
    large: null, // no upper bound — token kept for completeness
  },
});

/**
 * Convenience type for authoring custom theme implementations.
 *
 * @example
 * import { createTheme } from '@vanilla-extract/css';
 * import { vars } from '../../themes/grommet/theme.contract.css';
 *
 * export const myTheme = createTheme(vars, { ... });
 */
export type GrommetThemeVars = Parameters<typeof createThemeContract>[0];
