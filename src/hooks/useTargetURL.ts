import * as React from "react";
import browser from "../browser";
import { Callback } from "../types";

export interface TargetURLState {
  targetURL?: URL;
  removeTargetURL: () => void;
  addTargetURL: Callback<URL>;
  refreshTargetURL: () => void;
}

export default (): TargetURLState => {
  const [targetURL, setTargetURL] = React.useState<URL | undefined>(undefined);

  const refreshTargetURL = () => browser.targetURL.onGet(setTargetURL);

  React.useEffect(refreshTargetURL, [targetURL && targetURL.href]);

  const removeTargetURL = () =>
    browser.targetURL.remove(() => {
      setTargetURL(undefined);
      refreshTargetURL();
    });

  const addTargetURL = (url: URL) => {
    browser.targetURL.set(url, () => setTargetURL(url));
  };

  return { targetURL, removeTargetURL, addTargetURL, refreshTargetURL };
};
