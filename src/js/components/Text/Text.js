import React, { forwardRef, useContext, useMemo, useState } from 'react';

import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';

import { ThemeContext } from '../../contexts/ThemeContext';
import { cx } from '../../utils/classes';
import { normalizeColor } from '../../utils/colors';
import { resolveExtend } from '../../utils/extend';
import { edgeStyle } from '../../utils/styles';
import { textRecipe } from './text.css';
import { Tip } from '../Tip';
import { useForwardedRef } from '../../utils';
import { TextPropTypes } from './propTypes';
import { useSkeleton } from '../Skeleton';
import { TextSkeleton } from './TextSkeleton';
import { TextContext } from './TextContext';

// Maps Grommet alignSelf prop values to CSS align-self values.
// Mirrors the ALIGN_SELF_MAP in utils/styles.js (shared until Phase 0.4).
const ALIGN_SELF_MAP = {
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
  baseline: 'baseline',
};

// Maps Grommet textAlign prop values to CSS text-align values.
const TEXT_ALIGN_MAP = {
  center: 'center',
  end: 'right',
  justify: 'justify',
  start: 'left',
};

const Text = forwardRef(
  (
    {
      children,
      color,
      tag,
      as,
      tip: tipProp,
      // can't alphabetize a11yTitle before tip is defined
      a11yTitle = (typeof tipProp === 'string' && tipProp) ||
        tipProp?.content ||
        undefined,
      truncate,
      size,
      skeleton: skeletonProp,
      level = 1,
      // genericStyles props — applied via inline style until Phase 0.4
      alignSelf,
      gridArea,
      margin,
      // style props passed through directly
      textAlign,
      weight,
      wordBreak,
      style: styleProp,
      className: classNameProp,
      // SC internal props — dropped when Text is wrapped via styled(Text)
      // forwardedAs is SC's way of passing `as` through a styled wrapper.
      // theme is injected by SC's ThemeProvider when using styled(Text).
      forwardedAs,
      theme: _theme,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext);
    const textRef = useForwardedRef(ref);
    const [textTruncated, setTextTruncated] = useState(false);
    const textContextValue = useMemo(() => ({ size }), [size]);

    const skeleton = useSkeleton();

    useLayoutEffect(() => {
      const updateTip = () => {
        setTextTruncated(false);
        if (
          truncate === 'tip' &&
          textRef.current &&
          textRef.current.scrollWidth > textRef.current.offsetWidth
        ) {
          setTextTruncated(true);
        }
      };
      window.addEventListener('resize', updateTip);
      window.addEventListener('pagechange', updateTip);
      updateTip();
      return () => {
        window.removeEventListener('resize', updateTip);
        window.removeEventListener('pagechange', updateTip);
      };
    }, [textRef, truncate]);

    if (skeleton) {
      return (
        <TextSkeleton
          ref={ref}
          as={as}
          level={level}
          size={size}
          {...skeletonProp}
          {...rest}
        />
      );
    }

    // ── Named size variant → VE recipe class; arbitrary px/em → inline style ──
    const namedSizes = [
      'xsmall',
      'small',
      'medium',
      'large',
      'xlarge',
      'xxlarge',
      '2xl',
      '3xl',
      '4xl',
      '5xl',
      '6xl',
    ];
    const isNamedSize = !size || namedSizes.includes(size);

    // ── Build inline style object for runtime-only concerns ──────────────────
    const runtimeStyle = {};

    // Arbitrary size (e.g. "32px") — not in the contract
    if (size && !isNamedSize) {
      const sizeData = theme.text && theme.text[size];
      if (sizeData) {
        runtimeStyle.fontSize = sizeData.size;
        runtimeStyle.lineHeight = sizeData.height;
      } else {
        runtimeStyle.fontSize = size;
        runtimeStyle.lineHeight = 'normal';
      }
    }

    // Color — requires full theme for dark/light resolution.
    // Guard against missing theme.global (outside <Grommet> wrapper).
    if (color && theme.global) {
      runtimeStyle.color = normalizeColor(color, theme);
    } else if (color) {
      runtimeStyle.color = color;
    }

    // Weight and wordBreak — arbitrary consumer values
    if (weight) runtimeStyle.fontWeight = weight;
    if (wordBreak) runtimeStyle.wordBreak = wordBreak;

    // textAlign
    if (textAlign) {
      runtimeStyle.textAlign = TEXT_ALIGN_MAP[textAlign] || textAlign;
    }

    // genericStyles — alignSelf, gridArea, margin
    // These will move to a shared VE utility in Phase 0.4.
    if (alignSelf) {
      runtimeStyle.alignSelf = ALIGN_SELF_MAP[alignSelf] || alignSelf;
    }
    if (gridArea) {
      runtimeStyle.gridArea = gridArea;
    }
    if (margin && theme.global) {
      // edgeStyle returns a css`` tagged template; for the inline style shim
      // we resolve margin directly from theme.global.edgeSize.
      const resolveEdge = (val) =>
        (theme.global.edgeSize && theme.global.edgeSize[val]) || val;
      if (typeof margin === 'string') {
        runtimeStyle.margin = resolveEdge(margin);
      } else {
        const { top, bottom, left, right, horizontal, vertical } = margin;
        if (top) runtimeStyle.marginTop = resolveEdge(top);
        if (bottom) runtimeStyle.marginBottom = resolveEdge(bottom);
        if (left) runtimeStyle.marginLeft = resolveEdge(left);
        if (right) runtimeStyle.marginRight = resolveEdge(right);
        if (horizontal) {
          runtimeStyle.marginLeft = resolveEdge(horizontal);
          runtimeStyle.marginRight = resolveEdge(horizontal);
        }
        if (vertical) {
          runtimeStyle.marginTop = resolveEdge(vertical);
          runtimeStyle.marginBottom = resolveEdge(vertical);
        }
      }
    }

    // theme.text.extend — backward-compat shim, emits dev warning
    const extendStyle = resolveExtend(theme.text && theme.text.extend, {
      size,
      theme,
    });

    const combinedStyle = {
      ...runtimeStyle,
      ...extendStyle,
      ...styleProp,
    };

    // Resolve element tag: `as` prop overrides default <span>, `tag` is legacy alias.
    // `forwardedAs` is styled-components' mechanism for passing `as` through a
    // styled(Text) wrapper — honour it so SC-wrapped Text still respects `as`.
    const Tag = forwardedAs || (!as && tag ? tag : as) || 'span';

    const styledTextResult = (
      <Tag
        aria-label={a11yTitle}
        className={cx(
          textRecipe({
            size: isNamedSize ? size || 'medium' : undefined,
            truncate:
              truncate === true
                ? 'true'
                : truncate === 'tip'
                ? 'tip'
                : undefined,
          }),
          classNameProp,
        )}
        style={Object.keys(combinedStyle).length ? combinedStyle : undefined}
        ref={textRef}
        {...rest}
      >
        {children !== undefined ? (
          <TextContext.Provider value={textContextValue}>
            {children}
          </TextContext.Provider>
        ) : undefined}
      </Tag>
    );

    const tipProps = tipProp && typeof tipProp === 'object' ? tipProp : {};

    if (tipProp || textTruncated) {
      if (textTruncated) {
        return (
          <Tip content={children} {...tipProps}>
            {styledTextResult}
          </Tip>
        );
      }
      if (truncate !== 'tip') {
        return <Tip {...tipProps}>{styledTextResult}</Tip>;
      }
    }

    return styledTextResult;
  },
);

Text.displayName = 'Text';
Text.propTypes = TextPropTypes;

export { Text };
