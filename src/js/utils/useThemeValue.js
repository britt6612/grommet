import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { defaultProps } from '../default-props';

/*
  Hook that returns the current theme from GrommetThemeContext.
  Falls back to the base theme when used outside of <Grommet>.

  passThemeFlag: During the migration period, un-migrated Styled*.js files
  still need the theme passed explicitly as a `theme` prop when they are used
  outside <Grommet> (no ThemeProvider in scope). Once all Styled*.js files are
  removed, passThemeFlag can be simplified to always return {}.
*/
const useThemeValue = () => {
  const context = useContext(ThemeContext);
  const hasContext = context && Object.keys(context).length > 0;
  const theme = hasContext ? context : defaultProps.theme;
  return {
    theme,
    // Pass theme explicitly to styled-components when outside <Grommet>.
    // Remove this after all Styled*.js files are deleted.
    passThemeFlag: { ...(!hasContext ? { theme } : {}) },
  };
};

export { useThemeValue };
