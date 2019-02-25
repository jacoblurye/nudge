import { Client } from "../../types";
import { initState } from "../../hooks/useAppState";
import URLCollection from "../../util/URLCollection";

const wiki = "https://en.wikipedia.org";
const face = "https://www.facebook.com";
const redd = "https://www.reddit.com";

const loadedInitState = { ...initState, loaded: true };

const state1 = {
  ...loadedInitState,
  targetURL: new URL(wiki),
  blockedURLs: new URLCollection([face, redd])
};

const state2 = {
  ...loadedInitState,
  targetURL: undefined,
  blockedURLs: new URLCollection([face])
};

export default (client: Client) => {
  it("Registers loaded and returns initState on first get", () => {
    client.get(res => expect(res).toEqual(loadedInitState));
  });

  it("Updates storage as expected", () => {
    client.set(state1);
    client.get(res => expect(res).toEqual(state1));
    client.set(state2);
    client.get(res => expect(res).toEqual(state2));
  });
};
