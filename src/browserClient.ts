import { Callback } from "./types";

const urlToKey = (url: URL) => url.origin;

export default {
  /** Call a function on the user's currently open tab.
   * @param f - a callback taking the tab URL as argument
   */
  onCurrentTab: (f: Callback<URL>) =>
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs.length) {
        const url = tabs[0].url;
        url && f(new URL(url));
      }
    }),

  /** Store a URL that should be redirected to the target URL.
   * @param url - a distracting URL
   */
  insertDistractingURL: (url: URL) => {
    const urlKV = { [urlToKey(url)]: url.href };
    chrome.storage.sync.set(urlKV);
  },

  /** Remove a distracting URL
   * @param url - a url to remove from storage
   */
  removeDistractingURL: (url: URL) => chrome.storage.sync.remove([url.origin]),

  /** Check if a URL is distracting and should be redirected
   * @param url - a URL to test for distracting-ness
   * @param f - a callback taking the target URL as argument that gets called only if `url` is distracting
   */
  ifDistractingURL: (url: URL, f: Callback<URL>) =>
    chrome.storage.sync.get(storage => {
      if (url.origin in storage && "targetURL" in storage)
        f(storage["targetURL"]);
    }),

  /** Call a function on a list of all distracting URLs
   * @param f - a callback taking a list of distracting URL origins as argument
   */
  onDistractingOrigins: (f: Callback<URL[]>) =>
    chrome.storage.sync.get(({ targetURL, cache, ...badURLs }) => {
      const urls = Object.values(badURLs).map(url => new URL(url));
      f(urls);
    }),

  /** Set the target URL.
   * @param url - the URL the user wants to focus on
   */
  setTargetURL: (url: URL) => chrome.storage.sync.set({ targetURL: url }),

  /** Call a function on the user's current target URL
   * @param f - a callback taking the target URL as argument
   */
  onTargetURL: (f: Callback<URL>) =>
    chrome.storage.sync.get(["targetURL"], res => f(res["targetURL"]))
};
