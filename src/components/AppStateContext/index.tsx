import * as React from "react";
import urlToKey from "../../util/urlToKey";
import { AppState, Callback } from "../../types";
import { Client } from "../../client/types";

interface AppStateProps {
  appState: AppState;
  toggleEnabled: () => void;
  addTargetURL: Callback<URL>;
  clearTargetURL: () => void;
  addBadURL: Callback<URL>;
  removeBadURL: Callback<URL>;
}

export const initState = {
  loaded: false,
  enabled: true,
  badURLs: [],
  targetURL: undefined
};

export function makeAppStateProps(storage: Client): AppStateProps {
  const [appState, setAppState] = React.useState<AppState>(initState);

  React.useEffect(
    () => storage.get(appState => setAppState({ ...appState, loaded: true })),
    []
  );

  const setAndStoreState = (update: {}) => {
    const updatedState = { ...appState, ...update };
    setAppState(updatedState);

    storage.set(updatedState);
  };

  const toggleEnabled = () => setAndStoreState({ enabled: !appState.enabled });

  const addTargetURL = (targetURL: URL) => setAndStoreState({ targetURL });

  const clearTargetURL = () => setAndStoreState({ targetURL: undefined });

  const addBadURL = (badURL: URL) => {
    const urlKey = urlToKey(badURL);
    if (!appState.badURLs.find(url => urlToKey(url) === urlKey)) {
      setAndStoreState({ badURLs: [badURL, ...appState.badURLs] });
    }
  };

  const removeBadURL = (badURL: URL) => {
    const urlKey = urlToKey(badURL);
    const loc = appState.badURLs.findIndex(url => urlToKey(url) === urlKey);
    if (loc > -1) {
      const below = appState.badURLs.slice(0, loc);
      const above = appState.badURLs.slice(loc + 1);
      setAndStoreState({ badURLs: [...below, ...above] });
    }
  };

  return {
    appState,
    toggleEnabled,
    addTargetURL,
    clearTargetURL,
    addBadURL,
    removeBadURL
  };
}

const AppStateContext = React.createContext<AppStateProps | undefined>(
  undefined
);

export default AppStateContext;
