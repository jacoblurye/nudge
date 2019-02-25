import testClient from "../__testutils__/testClient";
import ChromeClient, { BrowserStorage } from "../ChromeClient";
import { Callback } from "../../types";

let _storage: { [key: string]: string } = {};
const mockStorage: BrowserStorage = {
  get: (f: Callback<any>) => f(_storage),
  set: (storage: any, f?: () => void) => {
    _storage = storage;
  },
  clear: (f?: () => void) => {
    _storage = {};
    f && f();
  }
};

describe("ChromeClient", () => {
  testClient(new ChromeClient(mockStorage));
});
