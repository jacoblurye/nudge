import * as React from "react";
import Layout from "./Layout";
import { Loader } from "semantic-ui-react";
import AppStateContext from "./AppStateContext";
import ChromeClient from "../clients/ChromeClient";
import useAppState from "../hooks/useAppState";

export default function App() {
  const app = useAppState(new ChromeClient());

  return (
    <AppStateContext.Provider value={app}>
      {app.appState.loaded ? <Layout /> : <Loader active />}
    </AppStateContext.Provider>
  );
}
