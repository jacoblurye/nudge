import * as React from "react";
import { urlToKey } from "../util";
import browser from "../browser";
import { Callback } from "../types";

export interface BadURLState {
  badURLs: URL[];
  removeBadURL: Callback<URL>;
  addBadURL: Callback<URL>;
  refreshBadURLs: () => void;
}

export default (): BadURLState => {
  const [badURLs, setBadURLs] = React.useState<URL[]>([]);

  const refreshBadURLs = () => browser.badURLs.onGet(setBadURLs);

  React.useEffect(refreshBadURLs, [badURLs.toString()]);

  const removeBadURL = (url: URL) => {
    const filteredURLs = badURLs.filter(u => urlToKey(u) !== urlToKey(url));
    browser.badURLs.remove(url, () => setBadURLs(filteredURLs));
  };

  const addBadURL = (url: URL) => {
    if (!badURLs.find(u => urlToKey(u) === urlToKey(url))) {
      setBadURLs([...badURLs, url]);
      browser.badURLs.add(url);
    }
  };

  return { badURLs, removeBadURL, addBadURL, refreshBadURLs };
};
