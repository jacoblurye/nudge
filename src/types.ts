export type Callback<T> = (arg: T) => void;

export interface AppState {
  loaded: boolean;
  enabled: boolean;
  targetURL: URL | undefined;
  badURLs: URL[];
}
