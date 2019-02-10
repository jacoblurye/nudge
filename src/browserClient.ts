import { Callback } from "./types";

export const urlToKey = (url: URL) => url.host;

export default {
  /** Call a function on the user's currently open tab.
   * @param f - a callback taking the tab URL as argument
   */
  onCurrentTab: (f: Callback<URL>) =>
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab, ..._]) => {
      if (tab && tab.url) f(new URL(tab.url));
    }),

  /** Store a URL that should be redirected to the target URL.
   * @param url - a bad URL
   */
  insertBadURL: (url: URL) => {
    const urlKV = { [urlToKey(url)]: url.href };
    chrome.storage.sync.set(urlKV);
  },

  /** Remove a bad URL
   * @param url - a url to remove from storage
   * @param f - a callback to call once removal completes
   */
  removeBadURL: (url: URL, f: Callback<void>) =>
    chrome.storage.sync.remove([urlToKey(url)], () => f()),

  /** Check if a URL is bad and pass the result of the test to a callback
   * @param url - a URL to test for badness
   * @param f - a callback taking whether or not the url is bad as argument
   */
  isBadURL: (url: URL, f: Callback<boolean>) =>
    chrome.storage.sync.get([urlToKey(url)], badURL =>
      f(urlToKey(url) in badURL)
    ),

  /** Call a function on a list of all bad URLs
   * @param f - a callback taking a list of bad URL origins as argument
   */
  onBadURLs: (f: Callback<URL[]>) =>
    chrome.storage.sync.get(({ targetURL, cache, ...badURLs }) => {
      const urls = Object.values(badURLs).map(url => new URL(url));
      f(urls);
    }),

  /** Set the target URL.
   * @param url - the URL the user wants to focus on
   */
  setTargetURL: (url: URL) => chrome.storage.sync.set({ targetURL: url }),

  /** Get the target URL.
   * @param f - a function taking the target URL as argument
   */

  /** Call a function on the user's current target URL
   * @param f - a callback taking the target URL as argument
   */
  onTargetURL: (f: Callback<URL>) =>
    chrome.storage.sync.get(["targetURL"], res => f(res["targetURL"]))
};
