export interface Redirection {
  from: URL;
  to: URL;
}

export type Callback<T> = (arg: T) => void;
