import * as React from "react";
import Layout from "./Layout";
import AppStateContext from "./AppStateContext";
import ChromeClient from "../clients/ChromeClient";
import useAppState from "../hooks/useAppState";

export default function App() {
  const app = useAppState(new ChromeClient(chrome.storage.sync));

  return (
    <AppStateContext.Provider value={app}>
      {app.appState.loaded && <Layout />}
    </AppStateContext.Provider>
  );
}
