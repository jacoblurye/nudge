import mapValues from "lodash/mapValues";
import { AppState, Callback, Client } from "../types";
import { initState } from "../hooks/useAppState";
import URLCollection from "../util/URLCollection";

interface Storage {
  enabled: boolean;
  targetURL: string | undefined;
  [blockedURL: string]: any;
}

export default class ChromeClient implements Client {
  _stateToStorage(state: AppState): Storage {
    const enabled = state.enabled;
    const targetURL = state.targetURL ? state.targetURL.href : undefined;
    const blockedURLs = state.blockedURLs.toObject();
    return { enabled, targetURL, ...blockedURLs };
  }

  set(state: AppState) {
    const storage = this._stateToStorage(state);
    chrome.storage.sync.clear(() => chrome.storage.sync.set(storage));
  }

  _storageToState({
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
    chrome.storage.sync.get(state => {
      // state hasn't been set yet, so initialize it
      if (!state) {
        this.set(initState);
        f(initState);
      }
      const storageState = mapValues(state, value => {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      });
      f(this._storageToState(storageState as Storage));
    });
  }
}
