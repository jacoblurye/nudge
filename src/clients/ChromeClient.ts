import mapValues from "lodash/mapValues";
import { AppState, Callback, Client } from "../types";
import { initState } from "../hooks/useAppState";
import URLCollection from "../util/URLCollection";

interface Storage {
  enabled: boolean;
  targetURL: string | undefined;
  [blockedURL: string]: any;
}

export interface BrowserStorage {
  get: Callback<Callback<any>>;
  set: (val: any, f?: () => void) => void;
  clear: Callback<() => void>;
}

export default class ChromeClient implements Client {
  private chromeStorage: BrowserStorage;
  constructor(chromeStorage: BrowserStorage) {
    this.chromeStorage = chromeStorage;
  }

  private stateToStorage(state: AppState): Storage {
    const enabled = state.enabled;
    const targetURL = state.targetURL ? state.targetURL.href : undefined;
    const blockedURLs = state.blockedURLs.toObject();
    return { enabled, targetURL, ...blockedURLs };
  }

  set(state: AppState) {
    const storage = this.stateToStorage(state);
    this.chromeStorage.clear(() => this.chromeStorage.set(storage));
  }

  private storageToState({
    loaded,
    enabled,
    targetURL,
    ...blockedURLs
  }: Storage): AppState {
    const boxedTargetURL = targetURL ? new URL(targetURL) : undefined;
    const boxedBlockedURLs = new URLCollection(
      Object.values<string>(blockedURLs)
    );

    return {
      loaded: true,
      enabled,
      targetURL: boxedTargetURL,
      blockedURLs: boxedBlockedURLs
    };
  }

  get(f: Callback<AppState>) {
    this.chromeStorage.get(state => {
      // state hasn't been set yet (is an empty object),
      // so we initialize it and set loaded to true
      if (Object.entries(state).length === 0) {
        this.set(initState);
        f({ ...initState, loaded: true });
        return;
      } else {
        const storageState = mapValues(state, value => {
          try {
            return JSON.parse(value);
          } catch {
            return value;
          }
        });
        f(this.storageToState(storageState as Storage));
      }
    });
  }
}
