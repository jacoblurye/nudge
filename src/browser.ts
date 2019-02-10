import { Callback } from "./types";
import { urlToKey } from "./util";

export default {
  tabs: {
    /** Call a function on the user's currently open tab.
     * @param f - a callback taking the tab URL as argument
     */
    onCurrentURL: (f: Callback<URL>) =>
      chrome.tabs.query(
        { active: true, currentWindow: true },
        ([tab, ..._]) => tab.url && f(new URL(tab.url))
      )
  },

  /** Previously used redirection configurations live in browser storage under the `config` key */
  configs: {
    /** Add config with name `name`
     * @param name - a name for the current configuration
     */
    add: (name: string) => {
      chrome.storage.sync.get(({ configs, ...currentConfig }) => {
        const updatedConfigs = {
          ...(configs && JSON.parse(configs)),
          [name]: currentConfig
        };
        chrome.storage.sync.set({
          ["configs"]: JSON.stringify(updatedConfigs)
        });
      });
    },
    /** Call a function on a list of all config names
     * @param f - a callback taking a list of config names as argument
     */
    onGet: (f: Callback<string[]>) =>
      chrome.storage.sync.get(["configs"], ({ configs }) => {
        const parsedConfigs = JSON.parse(configs);
        f(Object.keys(parsedConfigs));
      })
  },

  /** "Bad" URLs live in browser storage as top-level keys */
  badURLs: {
    /** Store a URL that should be redirected to the target URL.
     * @param url - a bad URL
     */
    add: (url: URL) => {
      const urlKV = { [urlToKey(url)]: url.href };
      chrome.storage.sync.set(urlKV);
    },
    /** Remove a bad URL
     * @param url - a url to remove from storage
     * @param f - a callback to call once removal completes
     */
    remove: (url: URL, f: Callback<void>) =>
      chrome.storage.sync.remove([urlToKey(url)], () => f()),
    /** Check if a URL is bad and pass the result of the test to a callback
     * @param url - a URL to test for badness
     * @param f - a callback taking whether or not the url is bad as argument
     */
    isBad: (url: URL, f: Callback<boolean>) =>
      chrome.storage.sync.get([urlToKey(url)], badURL =>
        f(urlToKey(url) in badURL)
      ),
    /** Call a function on a list of all bad URLs
     * @param f - a callback taking a list of bad URL origins as argument
     */
    onGet: (f: Callback<URL[]>) =>
      chrome.storage.sync.get(({ targetURL, configs, ...badURLs }) => {
        const urls = Object.values(badURLs).map(url => new URL(url));
        f(urls);
      })
  },

  /** The "target" URL lives in browser storage as a value with key `targetURL` */
  targetURL: {
    /** Set the target URL.
     * @param url - the URL the user wants to focus on
     */
    set: (url: URL) => chrome.storage.sync.set({ targetURL: url.href }),
    /** Remove the target URL.
     * @param f - a callback to call once removal completes
     */
    remove: (f: Callback<void>) =>
      chrome.storage.sync.remove(["targetURL"], () => f()),
    /** Call a function on the user's current target URL if one is set.
     * @param f - a callback taking the target URL as argument
     */
    onGet: (f: Callback<URL>) =>
      chrome.storage.sync.get(["targetURL"], ({ targetURL }) => {
        if (!!targetURL) f(new URL(targetURL));
      })
  }
};
