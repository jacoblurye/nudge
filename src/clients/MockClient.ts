import { AppState, Client, Callback } from "../types";
import { initState } from "../components/AppStateContext";

export default class MockClient implements Client {
  state: AppState;

  constructor(initial: AppState = initState) {
    this.state = initial;
  }

  set(state: AppState) {
    this.state = state;
  }

  get(f: Callback<AppState>) {
    return f(this.state);
  }
}
