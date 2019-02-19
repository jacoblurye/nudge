import * as React from "react";
import { AppState, Callback } from "../../types";

export interface AppStateProps {
  appState: AppState;
  toggleEnabled: () => void;
  addTargetURL: Callback<URL>;
  clearTargetURL: () => void;
  addBadURL: Callback<URL>;
  removeBadURL: Callback<URL>;
}

const AppStateContext = React.createContext<AppStateProps | undefined>(
  undefined
);

export default AppStateContext;
