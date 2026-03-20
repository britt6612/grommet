import React from 'react';
import PropTypes from 'prop-types';

import { deepMerge } from '../../utils';
import { ThemeContextPropTypes } from './propTypes';

// GrommetThemeContext is a plain React context — no styled-components dependency.
// It carries the merged theme object (including the `dark` boolean) for all
// components that need runtime color resolution via normalizeColor().
//
// Public API is identical to the previous styled-components ThemeContext:
//   - <ThemeContext.Provider value={theme}>
//   - <ThemeContext.Consumer>{(theme) => ...}</ThemeContext.Consumer>
//   - <ThemeContext.Extend value={partialTheme}>  (deep-merges on top of parent)
//   - useContext(ThemeContext)
const GrommetThemeContext = React.createContext({});

// ThemeContext.Extend: scoped theme override — deep-merges value on top of
// the inherited theme from the nearest Provider. API is unchanged.
GrommetThemeContext.Extend = ({ children, value }) => (
  <GrommetThemeContext.Consumer>
    {(theme) => (
      <GrommetThemeContext.Provider value={deepMerge(theme, value)}>
        {children}
      </GrommetThemeContext.Provider>
    )}
  </GrommetThemeContext.Consumer>
);

GrommetThemeContext.Extend.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.shape({}).isRequired,
};
GrommetThemeContext.propTypes = ThemeContextPropTypes;

// Export as `ThemeContext` so all existing imports are unchanged.
export { GrommetThemeContext as ThemeContext };
