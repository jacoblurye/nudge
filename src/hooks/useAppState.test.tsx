import * as React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import useAppState, { initState } from "./useAppState";
import SimpleClient from "../clients/SimpleClient";
import { AppStateProps } from "../components/AppStateContext";
import { AppState } from "../types";
import URLCollection from "../util/URLCollection";

interface TestHookProps {
  useHook: (state: AppStateProps) => void;
  initialState?: AppState;
}

/**
 * A component to run the hook through the component lifecycle and
 * transparently surface its updated state as a stringified object.
 *
 * TODO: Is there a better way to test a hook? Is testing a hook directly
 * a misuse of the hooks API?
 */
const TestHook = ({ useHook, initialState }: TestHookProps) => {
  const hook = useAppState(new SimpleClient(initialState));

  React.useEffect(() => {
    useHook(hook);
  }, []);

  const appState = {
    ...hook.appState,
    blockedURLs: hook.appState.blockedURLs.urls
  };

  return <>{JSON.stringify(appState)}</>;
};

const updateAppState = (
  update: (state: AppStateProps) => void,
  initialState?: AppState
) => {
  const container = document.createElement("div");
  act(() => {
    ReactDOM.render(
      <TestHook useHook={update} initialState={initialState} />,
      container
    );
  });

  const parsedState = JSON.parse(container.innerHTML);
  return {
    ...parsedState,
    blockedURLs: new URLCollection(parsedState.blockedURLs)
  };
};

const url = new URL("http://test.com");

it("Renders without complaining", () => {
  updateAppState(state => expect(state.appState).toEqual(initState));
});

it("Adds the target URL as expected", () => {
  const { targetURL } = updateAppState(hook => hook.addTargetURL(url));
  expect(targetURL).toEqual(url.href);
});

it("Removes the target URL as expected", () => {
  const { targetURL } = updateAppState(hook => hook.clearTargetURL(), {
    ...initState,
    targetURL: url
  });
  expect(targetURL).toBeUndefined;
});

it("Adds a blocked URL as expected", () => {
  const { blockedURLs } = updateAppState(hook => hook.addBlockedURL(url));
  expect(blockedURLs.contains(url)).toBe(true);
});

it("Removes a blocked URL as expected", () => {
  const { blockedURLs } = updateAppState(hook => hook.removeBlockedURL(url), {
    ...initState,
    blockedURLs: new URLCollection([url.href])
  });
  expect(blockedURLs.contains(url)).toBe(false);
});

it("Toggles whether the app is enabled", () => {
  const { enabled } = updateAppState(hook => hook.toggleEnabled());
  expect(enabled).toBe(false);
});
