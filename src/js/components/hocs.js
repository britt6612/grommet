import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import getDisplayName from 'recompose/getDisplayName';
import { ThemeContext as IconThemeContext } from 'grommet-icons';

import AnnounceContext from '../contexts/AnnounceContext';
import ThemeContext from '../contexts/ThemeContext';
import { deepMerge } from '../utils';

export const withFocus = (WrappedComponent) => {
  class FocusableComponent extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
      const { withFocusRef } = nextProps;
      const { wrappedRef } = prevState;
      const nextWrappedRef = withFocusRef || wrappedRef;
      if (nextWrappedRef !== wrappedRef) {
        return { wrappedRef: nextWrappedRef };
      }
      return null;
    }

    state = {
      focus: false,
      wrappedRef: React.createRef(),
    }

    mouseActive = false // not in state because it doesn't affect rendering

    componentDidMount = () => {
      const { wrappedRef } = this.state;
      window.addEventListener('mousedown', this.handleActiveMouse);

      // we could be using onFocus in the wrapper node itself
      // but react does not invoke it if you programically
      // call wrapperNode.focus() inside componentWillUnmount
      // see Drop "this.originalFocusedElement.focus();" for reference
      const wrapperNode = findDOMNode(wrappedRef.current);
      if (wrapperNode && wrapperNode.addEventListener) {
        wrapperNode.addEventListener('focus', this.setFocus);
      }
    }

    componentWillUnmount = () => {
      const { wrappedRef } = this.state;
      window.removeEventListener('mousedown', this.handleActiveMouse);
      const wrapperNode = findDOMNode(wrappedRef.current);
      if (wrapperNode && wrapperNode.addEventListener) {
        wrapperNode.removeEventListener('focus', this.setFocus);
      }
      clearTimeout(this.mouseTimer);
    }

    handleActiveMouse = () => {
      this.mouseActive = true;

      // this avoids showing focus when clicking around
      clearTimeout(this.mouseTimer);
      // empirical number to reset mouseActive after
      // some time has passed without mousedown
      this.mouseTimer = setTimeout(() => {
        this.mouseActive = false;
      }, 300);
    }

    setFocus = () => {
      if (this.mouseActive === false) {
        this.setState({ focus: true });
      }
    }

    resetFocus() {
      this.setState({ focus: false });
    }

    render() {
      const { onFocus, onBlur, withFocusRef, ...rest } = this.props;
      const { focus, wrappedRef } = this.state;
      return (
        <WrappedComponent
          ref={wrappedRef}
          focus={focus}
          {...rest}
          onFocus={(event) => {
            this.setFocus();
            if (onFocus) {
              onFocus(event);
            }
          }}
          onBlur={(event) => {
            this.resetFocus();
            if (onBlur) {
              onBlur(event);
            }
          }}
        />
      );
    }
  }

  FocusableComponent.displayName = getDisplayName(WrappedComponent);

  return React.forwardRef((props, ref) =>
    <FocusableComponent {...props} withFocusRef={ref} />);
};

export const withTheme = (WrappedComponent) => {
  class ThemedComponent extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
      const { themeContext, theme } = nextProps;
      const { theme: stateTheme } = prevState;
      if (theme && !stateTheme) {
        return { theme: deepMerge(themeContext, theme) };
      } else if (!theme && stateTheme) {
        return { theme: undefined };
      }
      return null;
    }

    state = {}

    render() {
      const { withThemeRef, themeContext, ...rest } = this.props;
      const { theme } = this.state;
      let content = (
        <WrappedComponent
          ref={withThemeRef}
          {...rest}
          theme={theme || themeContext}
        />
      );
      if (theme) {
        content = (
          <ThemeContext.Consumer value={theme}>
            {content}
          </ThemeContext.Consumer>
        );
      }
      return content;
    }
  }

  ThemedComponent.displayName = getDisplayName(WrappedComponent);

  return React.forwardRef((props, ref) => (
    <ThemeContext.Consumer>
      {theme =>
        <ThemedComponent {...props} themeContext={theme} withThemeRef={ref} />}
    </ThemeContext.Consumer>
  ));
};

export const withForwardRef = WrappedComponent =>
  React.forwardRef((props, ref) =>
    <WrappedComponent forwardRef={ref} {...props} />);

export const withAnnounce = WrappedComponent => props => (
  <AnnounceContext.Consumer>
    {announce => <WrappedComponent {...props} announce={announce} />}
  </AnnounceContext.Consumer>
);

export const withIconTheme = WrappedComponent => props => (
  <IconThemeContext.Consumer>
    {iconTheme => <WrappedComponent {...props} iconTheme={iconTheme} />}
  </IconThemeContext.Consumer>
);

export default { withAnnounce, withFocus, withForwardRef, withIconTheme, withTheme };