import ChromeClient, { BrowserStorage } from "./ChromeClient";
import { Callback, AppState } from "../types";
import { initState } from "../hooks/useAppState";
import URLCollection from "../util/URLCollection";

// Mock browser storage
let _storage: { [key: string]: string } = {};
const chromeStorage: BrowserStorage = {
  get: (f: Callback<any>) => f(_storage),
  set: (storage: any, f?: () => void) => {
    _storage = storage;
  },
  clear: (f?: () => void) => {
    _storage = {};
    f && f();
  }
};

const loadedInitState = { ...initState, loaded: true };

const wiki = "https://en.wikipedia.org";
const face = "https://www.facebook.com";
const redd = "https://www.reddit.com";

const state1 = {
  ...loadedInitState,
  targetURL: new URL(wiki),
  blockedURLs: new URLCollection([face, redd])
};
const state2 = {
  ...loadedInitState,
  targetURL: undefined,
  blockedURLs: new URLCollection([face])
};

it("Registers loaded and returns initState on first get", () => {
  const client = new ChromeClient(chromeStorage);
  client.get(res => expect(res).toEqual(loadedInitState));
});

it("Updates storage as expected", () => {
  const client = new ChromeClient(chromeStorage);
  client.set(state1);
  client.get(res => expect(res).toEqual(state1));
  client.set(state2);
  client.get(res => expect(res).toEqual(state2));
});
