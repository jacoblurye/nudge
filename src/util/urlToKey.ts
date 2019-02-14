/**
 * Get a string literal value from a URL.
 * If two URLs have the same `urlToKey` value,
 * they are considered equal.
 */
const urlToKey = (url: URL): string => url.host;

export default urlToKey;
