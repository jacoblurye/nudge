import * as React from "react";
import Layout from "../Layout";
import { Loader } from "semantic-ui-react";
import AppStateContext, { makeAppStateProps } from "../AppStateContext";
import ChromeClient from "../../client/ChromeClient";

export default function App() {
  const appStateProps = makeAppStateProps(new ChromeClient());

  return (
    <AppStateContext.Provider value={appStateProps}>
      {appStateProps.appState.loaded ? <Layout /> : <Loader active />}
    </AppStateContext.Provider>
  );
}
