/**
 * Get a string literal value from a URL.
 * If two URLs have the same `urlToKey` value,
 * they are considered equal.
 */
const urlToKey = (url: URL): string => url.host;

export const isSamePage = (current: URL, target: URL) => {
  const curKey = urlToKey(current);
  const tarKey = urlToKey(target);

  return curKey === tarKey || curKey.endsWith(tarKey);
};

export default urlToKey;
