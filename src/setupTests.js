global.console.warn = (message) => {
  // Allow known VE migration deprecation warnings through without throwing.
  // These are emitted by resolveExtend() for theme.X.extend usage and are
  // expected/intentional during the styled-components → Vanilla Extract migration.
  if (typeof message === 'string' && message.includes('[grommet]')) return;
  throw message;
};
global.console.error = (...args) => {
  // Temporarily format message to capture actual prop names during debugging.
  const message = args[0];
  const formatted =
    typeof message === 'string'
      ? args.slice(1).reduce((msg, arg) => msg.replace('%s', arg), message)
      : message;
  throw formatted;
};
