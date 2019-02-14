import * as React from "react";
import useTargetURL, { TargetURLState } from "./hooks/useTargetURL";
import useBadURLs, { BadURLState } from "./hooks/useBadURLs";
import useConfig, { ConfigState } from "./hooks/useConfig";
import Layout from "./pages/Layout";

export const StorageContext = React.createContext<
  TargetURLState & BadURLState & ConfigState | undefined
>(undefined);

export default () => {
  const badURLsHook = useBadURLs();
  const targetURLHook = useTargetURL();
  const configHook = useConfig(() => {
    badURLsHook.refreshBadURLs();
    targetURLHook.refreshTargetURL();
  });

  return (
    <StorageContext.Provider
      value={{ ...badURLsHook, ...targetURLHook, ...configHook }}
    >
      <Layout />
    </StorageContext.Provider>
  );
};
