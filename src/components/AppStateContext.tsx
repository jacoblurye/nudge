import * as React from "react";
import { AppState, Callback } from "../types";

export interface AppStateProps {
  appState: AppState;
  toggleEnabled: () => void;
  addTargetURL: Callback<URL>;
  clearTargetURL: () => void;
  addBlockedURL: Callback<URL>;
  removeBlockedURL: Callback<URL>;
}

const AppStateContext = React.createContext<AppStateProps | undefined>(
  undefined
);

export default AppStateContext;
