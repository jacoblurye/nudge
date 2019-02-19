import { AppState, Callback, Client } from "../types";
import { initState } from "../hooks/useAppState";
import URLCollection from "../util/URLCollection";

interface Storage {
  enabled: boolean;
  targetURL: string | undefined;
  [badURL: string]: any;
}

export default class ChromeClient implements Client {
  _stateToStorage(state: AppState): Storage {
    const enabled = state.enabled;
    const targetURL = state.targetURL ? state.targetURL.href : undefined;
    const badURLs = state.badURLs.toObject();
    return { enabled, targetURL, ...badURLs };
  }

  set(state: AppState) {
    const storage = this._stateToStorage(state);
    chrome.storage.sync.set({ state: JSON.stringify(storage) });
  }

  _storageToState({
    loaded,
    enabled,
    targetURL,
    ...badURLs
  }: Storage): AppState {
    const boxedTargetURL = targetURL ? new URL(targetURL) : undefined;
    const boxedBadURLs = new URLCollection(Object.values<string>(badURLs));

    return {
      loaded: true,
      enabled,
      targetURL: boxedTargetURL,
      badURLs: boxedBadURLs
    };
  }

  get(f: Callback<AppState>) {
    chrome.storage.sync.get(["state"], ({ state }) => {
      // state hasn't been set yet, so initialize it
      if (!state) {
        this.set(initState);
        f(initState);
      }
      const storageState = JSON.parse(state);
      f(this._storageToState(storageState));
    });
  }
}
