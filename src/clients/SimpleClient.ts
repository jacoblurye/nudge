import { AppState, Client, Callback } from "../types";
import { initState } from "../hooks/useAppState";

export default class SimpleClient implements Client {
  state: AppState;
  constructor(initial: AppState = { ...initState, loaded: true }) {
    this.state = initial;
  }

  set(state: AppState) {
    this.state = state;
  }

  get(f: Callback<AppState>) {
    return f(this.state);
  }
}
