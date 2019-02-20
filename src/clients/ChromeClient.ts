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
    chrome.storage.sync.set({ state: JSON.stringify(storage) });
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
