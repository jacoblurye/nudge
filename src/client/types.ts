import { Callback, AppState } from "../types";

export interface Client {
  set: Callback<AppState>;
  get: Callback<Callback<AppState>>;
}
