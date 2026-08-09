// TODO: Delete this when the latest version of `@types/screeps` is released
/**
 * The Console API defined by
 * [screeps/engine](https://github.com/screeps/engine/blob/1b9b1541923f061311474a2f1bac0fea37911f70/src/game/console.js#L10).
 *
 * Notes:
 * - `console` is not defined until the first tick. Any messages you log on init will not be emitted to the client.
 */
interface Console {
  /**
   * The **`console.log()`** static method outputs a message to the console.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/log_static).
   *
   * Unlike the DOM implementation, HTML special characters are escaped to mitigate XSS attacks.
   * To log HTML to the console, use {@link logUnsafe} instead.
   * For more context, see [screeps/engine issue 162](https://github.com/screeps/screeps/issues/162).
   */
  log(...data: unknown[]): void;

  /**
   * The **`console.logUnsafe()`** static method outputs a message to the console.
   *
   * `logUnsafe()` is a new addition that may not be present on older servers.
   * When defined, it is identical to the DOM implementation of {@link log}.
   * When undefined, {@link log} will not escape HTML characters.
   *
   * To safely log unescaped messages on any environment, use `(console.logUnsafe ?? console.log)(...)`.
   */
  logUnsafe(...data: unknown[]): void;
}

declare var console: Console;
