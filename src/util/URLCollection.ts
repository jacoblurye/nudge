import uniqBy from "lodash/uniqBy";
import zipObject from "lodash/zipObject";
import urlToKey from "./urlToKey";

export default class URLCollection {
  urls: URL[];
  keys: string[];

  constructor(hrefs: string[]) {
    const unfilteredURLs = hrefs.map(href => new URL(href));
    this.urls = uniqBy(unfilteredURLs, urlToKey);
    this.keys = this.urls.map(url => urlToKey(url));
  }

  contains(url: URL) {
    const key = urlToKey(url);
    return !!this.keys.find(k => k === key);
  }

  add(url: URL) {
    if (!this.contains(url)) {
      this.urls = [url, ...this.urls];
      this.keys = [urlToKey(url), ...this.keys];
    }
    return this;
  }

  remove(url: URL) {
    const key = urlToKey(url);
    const loc = this.keys.findIndex(k => k === key);
    if (loc > -1) {
      this.urls.splice(loc, 1);
      this.keys.splice(loc, 1);
    }
    return this;
  }

  toObject() {
    return zipObject(this.keys, this.urls.map(url => url.href));
  }
}
