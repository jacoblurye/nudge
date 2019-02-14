import * as React from "react";
import browser from "../browser";
import { Callback } from "../types";

export interface ConfigState {
  configs: string[];
  saveNewConfig: Callback<string>;
  selectConfig: Callback<string>;
  refreshConfigs: () => void;
}

export default (refreshURLs: () => void): ConfigState => {
  const [configs, setConfigs] = React.useState<string[]>([]);

  const refreshConfigs = () => browser.configs.onGet(setConfigs);

  React.useEffect(refreshConfigs, [configs.toString()]);

  const saveNewConfig = (name: string) => {
    browser.configs.add(name, refreshConfigs);
  };

  const selectConfig = (name: string) => {
    browser.configs.push(name, () => {
      refreshURLs();
      refreshConfigs();
    });
  };

  return { configs, saveNewConfig, selectConfig, refreshConfigs };
};
