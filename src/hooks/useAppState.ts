import * as React from "react";
import URLCollection from "../util/URLCollection";
import { Client, AppState } from "../types";
import { AppStateProps } from "../components/AppStateContext";

export const initState = {
  loaded: true,
  enabled: true,
  blockedURLs: new URLCollection([]),
  targetURL: undefined
};

export default function useAppState(client: Client): AppStateProps {
  const [appState, setAppState] = React.useState<AppState>(initState);

  React.useEffect(() => {
    client.get((state: AppState) => setAppState({ ...state }));
  }, []);

  const setAndStoreState = (update: {}) => {
    const updatedState = { ...appState, ...update };
    setAppState(updatedState);

    client.set(updatedState);
  };

  const toggleEnabled = () => setAndStoreState({ enabled: !appState.enabled });

  const addTargetURL = (targetURL: URL) => setAndStoreState({ targetURL });

  const clearTargetURL = () => setAndStoreState({ targetURL: undefined });

  const addBlockedURL = (blockedURL: URL) => {
    setAndStoreState({ blockedURLs: appState.blockedURLs.add(blockedURL) });
  };

  const removeBlockedURL = (blockedURL: URL) => {
    setAndStoreState({ blockedURLs: appState.blockedURLs.remove(blockedURL) });
  };

  return {
    appState,
    toggleEnabled,
    addTargetURL,
    clearTargetURL,
    addBlockedURL,
    removeBlockedURL
  };
}
