/**
 * Grommet Default Theme — Vanilla Extract
 *
 * Pre-computed from generate(24, 6) — src/js/themes/base.js.
 *
 * fontSizing(n) formula (baseSpacing=24, scale=6, baseFontSize=18, fontScale=4):
 *   size     = `${18 + n * 4}px`
 *   height   = `${24 + n * 4}px`
 *   maxWidth = `${24 * (18 + n * 4)}px`
 *
 * edgeSize formula:
 *   none=0, hair=1, xxsmall=3, xsmall=6, small=12, medium=24, large=48, xlarge=96 (all px)
 *
 * DO NOT hand-edit the token values — re-run the codegen script instead.
 * See proof-of-concept-vanilla-extract/docs/00-infrastructure.md § 0.3
 */

import { createTheme } from '@vanilla-extract/css';
import { vars } from './theme.contract.css';

// ─── Light theme (default) ────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const grommetTheme = createTheme(vars as any, {
  // ── Global colors ──────────────────────────────────────────────────────────
  color: {
    brand:               '#7D4CDB',
    background:          '#FFFFFF',
    backgroundBack:      '#EDEDED',
    backgroundFront:     '#FFFFFF',
    backgroundContrast:  '#33333310',
    border:              'rgba(0, 0, 0, 0.33)',
    control:             '#7D4CDB',       // brand (light)
    focus:               '#6FFFB0',       // accent-1
    placeholder:         '#AAAAAA',
    selected:            '#7D4CDB',       // brand
    selectedBackground:  '#7D4CDB',
    selectedText:        '#000000',       // text-strong (light)
    text:                '#444444',
    textStrong:          '#000000',
    textWeak:            '#555555',
    textXweak:           '#666666',
    icon:                '#666666',
    active:              'rgba(221, 221, 221, 0.5)',
    activeBackground:    '#33333310',     // background-contrast (light)
    activeText:          '#000000',       // text-strong (light)
    white:               '#FFFFFF',
    black:               '#000000',
    // Status
    statusCritical:  '#EB0000',
    statusWarning:   '#C27B00',
    statusOk:        '#009E67',
    statusUnknown:   '#919191',
    statusDisabled:  '#CCCCCC',
    // Accents (accent-1 … accent-4)
    accent1: '#6FFFB0',
    accent2: '#FD6FFF',
    accent3: '#81FCED',
    accent4: '#FFCA58',
    // Neutrals
    neutral1: '#00873D',
    neutral2: '#3D138D',
    neutral3: '#00739D',
    neutral4: '#A2423D',
    // Light scale
    light1: '#F8F8F8',
    light2: '#F2F2F2',
    light3: '#EDEDED',
    light4: '#DADADA',
    light5: '#DADADA',
    light6: '#DADADA',
    // Dark scale
    dark1: '#333333',
    dark2: '#555555',
    dark3: '#777777',
    dark4: '#999999',
    dark5: '#999999',
    dark6: '#999999',
  },

  // ── Edge sizes ─────────────────────────────────────────────────────────────
  edgeSize: {
    none:                  '0px',
    hair:                  '1px',
    xxsmall:               '3px',    // 24 / 8
    xsmall:                '6px',    // 24 / 4
    small:                 '12px',   // 24 / 2
    medium:                '24px',
    large:                 '48px',   // 24 * 2
    xlarge:                '96px',   // 24 * 4
    responsiveBreakpoint:  'small',
  },

  // ── Font globals ───────────────────────────────────────────────────────────
  font: {
    family: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    size:   '18px',   // baseFontSize = baseSpacing * 0.75 = 18
    height: '24px',   // baseSpacing
  },

  // ── Focus ──────────────────────────────────────────────────────────────────
  focus: {
    shadowColor: '#6FFFB0',
    shadowSize:  '2px',
    borderColor: '#6FFFB0',
  },

  // ── Text sizes — fontSizing(n) ─────────────────────────────────────────────
  text: {
    xsmall:  { size: '12px',  height: '18px',  maxWidth: '288px'  },  // n=-1.5  (18-6=12, 24-6=18)
    small:   { size: '14px',  height: '20px',  maxWidth: '336px'  },  // n=-1
    medium:  { size: '18px',  height: '24px',  maxWidth: '432px'  },  // n=0
    large:   { size: '22px',  height: '28px',  maxWidth: '528px'  },  // n=1
    xlarge:  { size: '26px',  height: '32px',  maxWidth: '624px'  },  // n=2
    xxlarge: { size: '34px',  height: '40px',  maxWidth: '816px'  },  // n=4
    t2xl:    { size: '34px',  height: '40px',  maxWidth: '816px'  },  // n=4  (alias)
    t3xl:    { size: '42px',  height: '48px',  maxWidth: '1008px' },  // n=6
    t4xl:    { size: '54px',  height: '60px',  maxWidth: '1296px' },  // n=9
    t5xl:    { size: '70px',  height: '76px',  maxWidth: '1680px' },  // n=13
    t6xl:    { size: '90px',  height: '96px',  maxWidth: '2160px' },  // n=18
  },

  // ── Heading sizes — fontSizing(n) per level/viewport ──────────────────────
  heading: {
    weight: '600',
    level: {
      '1': {
        small:  { size: '34px',  height: '40px',  maxWidth: '816px'  },  // n=4
        medium: { size: '50px',  height: '56px',  maxWidth: '1200px' },  // n=8
        large:  { size: '82px',  height: '88px',  maxWidth: '1968px' },  // n=16
        xlarge: { size: '114px', height: '120px', maxWidth: '2736px' },  // n=24
      },
      '2': {
        small:  { size: '26px',  height: '32px',  maxWidth: '624px'  },  // n=2
        medium: { size: '34px',  height: '40px',  maxWidth: '816px'  },  // n=4
        large:  { size: '50px',  height: '56px',  maxWidth: '1200px' },  // n=8
        xlarge: { size: '66px',  height: '72px',  maxWidth: '1584px' },  // n=12
      },
      '3': {
        small:  { size: '22px',  height: '28px',  maxWidth: '528px'  },  // n=1
        medium: { size: '26px',  height: '32px',  maxWidth: '624px'  },  // n=2
        large:  { size: '34px',  height: '40px',  maxWidth: '816px'  },  // n=4
        xlarge: { size: '42px',  height: '48px',  maxWidth: '1008px' },  // n=6
      },
      '4': {
        small:  { size: '18px',  height: '24px',  maxWidth: '432px'  },  // n=0
        medium: { size: '18px',  height: '24px',  maxWidth: '432px'  },  // n=0
        large:  { size: '18px',  height: '24px',  maxWidth: '432px'  },  // n=0
        xlarge: { size: '18px',  height: '24px',  maxWidth: '432px'  },  // n=0
      },
      '5': {
        // fontSizing(-0.5): 18 + (-0.5 * 4) = 16px, height=24+(-2)=22px
        small:  { size: '16px',  height: '22px',  maxWidth: '384px'  },
        medium: { size: '16px',  height: '22px',  maxWidth: '384px'  },
        large:  { size: '16px',  height: '22px',  maxWidth: '384px'  },
        xlarge: { size: '16px',  height: '22px',  maxWidth: '384px'  },
      },
      '6': {
        small:  { size: '14px',  height: '20px',  maxWidth: '336px'  },  // n=-1
        medium: { size: '14px',  height: '20px',  maxWidth: '336px'  },
        large:  { size: '14px',  height: '20px',  maxWidth: '336px'  },
        xlarge: { size: '14px',  height: '20px',  maxWidth: '336px'  },
      },
    },
  },

  // ── Paragraph sizes ────────────────────────────────────────────────────────
  paragraph: {
    small:   { size: '14px',  height: '20px',  maxWidth: '336px'  },  // n=-1
    medium:  { size: '18px',  height: '24px',  maxWidth: '432px'  },  // n=0
    large:   { size: '22px',  height: '28px',  maxWidth: '528px'  },  // n=1
    xlarge:  { size: '26px',  height: '32px',  maxWidth: '624px'  },  // n=2
    xxlarge: { size: '34px',  height: '40px',  maxWidth: '816px'  },  // n=4
  },

  // ── Anchor ─────────────────────────────────────────────────────────────────
  anchor: {
    color:              '#7D4CDB',     // brand (light)
    fontWeight:         '600',
    textDecoration:     'none',
    hoverTextDecoration:'underline',
    gap:                '12px',        // edgeSize.small
  },

  // ── Avatar sizes (baseSpacing multiples) ───────────────────────────────────
  avatar: {
    sizeXsmall: '18px',   // 24 * 0.75
    sizeSmall:  '24px',   // 24
    sizeMedium: '48px',   // 24 * 2  (default)
    sizeLarge:  '72px',   // 24 * 3
    sizeXlarge: '96px',   // 24 * 4
    size2xl:    '120px',  // 24 * 5
    size3xl:    '144px',  // 24 * 6
    size4xl:    '168px',  // 24 * 7
    size5xl:    '192px',  // 24 * 8
  },

  // ── Tag ────────────────────────────────────────────────────────────────────
  tag: {
    borderRadius:  'large',   // round: 'large' → CSS 'large' maps to 999px via VE recipe
    padHorizontal: '12px',    // edgeSize.small
    padVertical:   '6px',     // edgeSize.xsmall
    valueWeight:   '600',
  },

  // ── Spinner sizes ──────────────────────────────────────────────────────────
  spinner: {
    sizeXsmall: '18px',   // 24 * 0.75
    sizeSmall:  '24px',   // 24 (default)
    sizeMedium: '48px',   // 24 * 2
    sizeLarge:  '72px',   // 24 * 3
    sizeXlarge: '96px',   // 24 * 4
  },

  // ── Button ─────────────────────────────────────────────────────────────────
  button: {
    borderWidth:   '2px',
    borderRadius:  '18px',
    borderColor:   'rgba(0, 0, 0, 0.33)',
    padVertical:   '4px',
    padHorizontal: '22px',
    // Sizes
    smallBorderRadius:  '18px',
    smallPadVertical:   '4px',
    smallPadHorizontal: '20px',
    largeBorderRadius:  '24px',
    largePadVertical:   '8px',
    largePadHorizontal: '32px',
    // Kind colors
    primaryBackground: '#7D4CDB',
    primaryColor:      '#FFFFFF',
    secondaryBorderColor: '#7D4CDB',
    secondaryColor:    '#7D4CDB',
    // Hover
    hoverBackground:   'rgba(51, 51, 51, 0.1)',
    // Active / disabled
    activeBackground:  'rgba(51, 51, 51, 0.1)',
    disabledOpacity:   '0.3',
  },

  // ── Header ─────────────────────────────────────────────────────────────────
  header: {
    gap:          '24px',  // edgeSize.medium
    stickyZIndex: '20',
  },

  // ── Layer / Drop ───────────────────────────────────────────────────────────
  layer: {
    borderRadius:       '4px',
    backgroundDark:     '#000000',   // black
    backgroundLight:    '#FFFFFF',   // white
    overlayBackground:  'rgba(0, 0, 0, 0.5)',
    zIndex:             '20',
  },

  // ── Breakpoints ────────────────────────────────────────────────────────────
  breakpoint: {
    small:  '768px',    // baseSpacing * 32
    medium: '1536px',   // baseSpacing * 64
    large:  '99999px',  // effectively unbounded
  },
});

// ─── Dark theme ───────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const grommetDarkTheme = createTheme(vars as any, {
  color: {
    brand:               '#7D4CDB',
    background:          '#000000',
    backgroundBack:      '#33333308',
    backgroundFront:     '#444444',
    backgroundContrast:  '#FFFFFF18',
    border:              'rgba(255, 255, 255, 0.33)',
    control:             '#6FFFB0',       // accent-1 (dark)
    focus:               '#6FFFB0',
    placeholder:         '#AAAAAA',
    selected:            '#7D4CDB',
    selectedBackground:  '#7D4CDB',
    selectedText:        '#FFFFFF',       // text-strong (dark)
    text:                '#f8f8f8',
    textStrong:          '#FFFFFF',
    textWeak:            '#CCCCCC',
    textXweak:           '#BBBBBB',
    icon:                '#f8f8f8',
    active:              'rgba(221, 221, 221, 0.5)',
    activeBackground:    '#FFFFFF18',     // background-contrast (dark)
    activeText:          '#FFFFFF',       // text-strong (dark)
    white:               '#FFFFFF',
    black:               '#000000',
    statusCritical:  '#EB0000',
    statusWarning:   '#C27B00',
    statusOk:        '#009E67',
    statusUnknown:   '#919191',
    statusDisabled:  '#CCCCCC',
    accent1: '#6FFFB0',
    accent2: '#FD6FFF',
    accent3: '#81FCED',
    accent4: '#FFCA58',
    neutral1: '#00873D',
    neutral2: '#3D138D',
    neutral3: '#00739D',
    neutral4: '#A2423D',
    light1: '#F8F8F8',
    light2: '#F2F2F2',
    light3: '#EDEDED',
    light4: '#DADADA',
    light5: '#DADADA',
    light6: '#DADADA',
    dark1: '#333333',
    dark2: '#555555',
    dark3: '#777777',
    dark4: '#999999',
    dark5: '#999999',
    dark6: '#999999',
  },

  // All sizing/spacing/typography tokens are identical between light and dark
  edgeSize:  { none: '0px', hair: '1px', xxsmall: '3px', xsmall: '6px', small: '12px', medium: '24px', large: '48px', xlarge: '96px', responsiveBreakpoint: 'small' },
  font:      { family: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`, size: '18px', height: '24px' },
  focus:     { shadowColor: '#6FFFB0', shadowSize: '2px', borderColor: '#6FFFB0' },
  text:      { xsmall: { size: '12px', height: '18px', maxWidth: '288px' }, small: { size: '14px', height: '20px', maxWidth: '336px' }, medium: { size: '18px', height: '24px', maxWidth: '432px' }, large: { size: '22px', height: '28px', maxWidth: '528px' }, xlarge: { size: '26px', height: '32px', maxWidth: '624px' }, xxlarge: { size: '34px', height: '40px', maxWidth: '816px' }, t2xl: { size: '34px', height: '40px', maxWidth: '816px' }, t3xl: { size: '42px', height: '48px', maxWidth: '1008px' }, t4xl: { size: '54px', height: '60px', maxWidth: '1296px' }, t5xl: { size: '70px', height: '76px', maxWidth: '1680px' }, t6xl: { size: '90px', height: '96px', maxWidth: '2160px' } },
  heading:   { weight: '600', level: { '1': { small: { size: '34px', height: '40px', maxWidth: '816px' }, medium: { size: '50px', height: '56px', maxWidth: '1200px' }, large: { size: '82px', height: '88px', maxWidth: '1968px' }, xlarge: { size: '114px', height: '120px', maxWidth: '2736px' } }, '2': { small: { size: '26px', height: '32px', maxWidth: '624px' }, medium: { size: '34px', height: '40px', maxWidth: '816px' }, large: { size: '50px', height: '56px', maxWidth: '1200px' }, xlarge: { size: '66px', height: '72px', maxWidth: '1584px' } }, '3': { small: { size: '22px', height: '28px', maxWidth: '528px' }, medium: { size: '26px', height: '32px', maxWidth: '624px' }, large: { size: '34px', height: '40px', maxWidth: '816px' }, xlarge: { size: '42px', height: '48px', maxWidth: '1008px' } }, '4': { small: { size: '18px', height: '24px', maxWidth: '432px' }, medium: { size: '18px', height: '24px', maxWidth: '432px' }, large: { size: '18px', height: '24px', maxWidth: '432px' }, xlarge: { size: '18px', height: '24px', maxWidth: '432px' } }, '5': { small: { size: '16px', height: '22px', maxWidth: '384px' }, medium: { size: '16px', height: '22px', maxWidth: '384px' }, large: { size: '16px', height: '22px', maxWidth: '384px' }, xlarge: { size: '16px', height: '22px', maxWidth: '384px' } }, '6': { small: { size: '14px', height: '20px', maxWidth: '336px' }, medium: { size: '14px', height: '20px', maxWidth: '336px' }, large: { size: '14px', height: '20px', maxWidth: '336px' }, xlarge: { size: '14px', height: '20px', maxWidth: '336px' } } } },
  paragraph: { small: { size: '14px', height: '20px', maxWidth: '336px' }, medium: { size: '18px', height: '24px', maxWidth: '432px' }, large: { size: '22px', height: '28px', maxWidth: '528px' }, xlarge: { size: '26px', height: '32px', maxWidth: '624px' }, xxlarge: { size: '34px', height: '40px', maxWidth: '816px' } },
  anchor:    { color: '#6FFFB0', fontWeight: '600', textDecoration: 'none', hoverTextDecoration: 'underline', gap: '12px' },
  avatar:    { sizeXsmall: '18px', sizeSmall: '24px', sizeMedium: '48px', sizeLarge: '72px', sizeXlarge: '96px', size2xl: '120px', size3xl: '144px', size4xl: '168px', size5xl: '192px' },
  tag:       { borderRadius: 'large', padHorizontal: '12px', padVertical: '6px', valueWeight: '600' },
  spinner:   { sizeXsmall: '18px', sizeSmall: '24px', sizeMedium: '48px', sizeLarge: '72px', sizeXlarge: '96px' },
  button:    { borderWidth: '2px', borderRadius: '18px', borderColor: 'rgba(255, 255, 255, 0.33)', padVertical: '4px', padHorizontal: '22px', smallBorderRadius: '18px', smallPadVertical: '4px', smallPadHorizontal: '20px', largeBorderRadius: '24px', largePadVertical: '8px', largePadHorizontal: '32px', primaryBackground: '#7D4CDB', primaryColor: '#FFFFFF', secondaryBorderColor: '#7D4CDB', secondaryColor: '#7D4CDB', hoverBackground: 'rgba(255, 255, 255, 0.18)', activeBackground: 'rgba(255, 255, 255, 0.18)', disabledOpacity: '0.3' },
  header:    { gap: '24px', stickyZIndex: '20' },
  layer:     { borderRadius: '4px', backgroundDark: '#000000', backgroundLight: '#FFFFFF', overlayBackground: 'rgba(0, 0, 0, 0.5)', zIndex: '20' },
  breakpoint:{ small: '768px', medium: '1536px', large: '99999px' },
});
