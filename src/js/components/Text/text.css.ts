/**
 * Text component — Vanilla Extract recipe
 *
 * Handles the static, theme-driven CSS for Text:
 *   - font-family from theme contract
 *   - font-size + line-height for all named size variants
 *   - truncate variant
 *
 * Dynamic / runtime concerns NOT handled here (applied via inline `style` prop
 * in Text.js instead):
 *   - color        — requires normalizeColor(theme) dark/light resolution
 *   - weight       — arbitrary consumer value (e.g. "300", "bold")
 *   - wordBreak    — arbitrary consumer value
 *   - textAlign    — prop-driven, arbitrary consumer value
 *   - margin       — requires edgeStyle(theme) — migrated in Phase 0.4
 *   - alignSelf    — part of genericStyles — migrated in Phase 0.4
 *   - gridArea     — part of genericStyles — migrated in Phase 0.4
 */

import { recipe } from '@vanilla-extract/recipes';
import { vars as _vars } from '../../themes/grommet/theme.contract.css';

// Cast needed: createThemeContract return type includes MapLeafNodes<any,...>
// which TS cannot narrow to the plain `var(--xxx)` string that recipe() expects.
// Runtime behavior is correct — vars contains CSS custom property references.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const vars = _vars as any;

export const textRecipe = recipe({
  base: {
    // font-family from theme contract — overridable by theme.text.font.family
    fontFamily: vars.font.family,
  },

  variants: {
    /**
     * Named size variants — maps to theme.text[size].{size, height}
     * Sizes are pre-computed from generate(24, 6): fontSizing(n)
     *   size = 18 + n*4 px   height = 24 + n*4 px
     */
    size: {
      xsmall:  { fontSize: vars.text.xsmall.size,  lineHeight: vars.text.xsmall.height  },
      small:   { fontSize: vars.text.small.size,   lineHeight: vars.text.small.height   },
      medium:  { fontSize: vars.text.medium.size,  lineHeight: vars.text.medium.height  },
      large:   { fontSize: vars.text.large.size,   lineHeight: vars.text.large.height   },
      xlarge:  { fontSize: vars.text.xlarge.size,  lineHeight: vars.text.xlarge.height  },
      xxlarge: { fontSize: vars.text.xxlarge.size, lineHeight: vars.text.xxlarge.height },
      '2xl':   { fontSize: vars.text.t2xl.size,    lineHeight: vars.text.t2xl.height    },
      '3xl':   { fontSize: vars.text.t3xl.size,    lineHeight: vars.text.t3xl.height    },
      '4xl':   { fontSize: vars.text.t4xl.size,    lineHeight: vars.text.t4xl.height    },
      '5xl':   { fontSize: vars.text.t5xl.size,    lineHeight: vars.text.t5xl.height    },
      '6xl':   { fontSize: vars.text.t6xl.size,    lineHeight: vars.text.t6xl.height    },
    },

    /**
     * truncate — matches StyledText's truncateStyle.
     * 'tip' behaves the same visually (JS handles the Tip wrapping in Text.js).
     */
    truncate: {
      true: {
        whiteSpace: 'nowrap',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      tip: {
        whiteSpace: 'nowrap',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  },

  defaultVariants: {
    size: 'medium',
  },
});
