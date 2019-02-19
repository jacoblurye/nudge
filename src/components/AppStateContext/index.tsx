import * as React from "react";
import { AppState, Callback } from "../../types";
import { Client } from "../../client/types";
import URLCollection from "../../util/URLCollection";

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
  badURLs: new URLCollection([]),
  targetURL: undefined
};

export function makeAppStateProps(storage: Client): AppStateProps {
  const [appState, setAppState] = React.useState<AppState>(initState);

  React.useEffect(
    () => storage.get(appState => setAppState({ ...appState })),
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
    setAndStoreState({ badURLs: appState.badURLs.add(badURL) });
  };

  const removeBadURL = (badURL: URL) => {
    setAndStoreState({ badURLs: appState.badURLs.remove(badURL) });
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
