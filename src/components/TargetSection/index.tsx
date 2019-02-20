import * as React from "react";
import TargetURLInput from "../TargetURLInput";
import AppStateContext from "../AppStateContext";
import TargetURLItem from "../TargetURLItem";

/** The Target URL is the URL that the user wants to focus on.
 * All "blocked" URLs will redirect to the target URL.
 */
const TargetSection = () => {
  const { appState } = React.useContext(AppStateContext)!;

  const { targetURL } = appState;

  return targetURL ? (
    <TargetURLItem targetURL={targetURL} />
  ) : (
    <TargetURLInput placeholder="Your Target Page" size="huge" />
  );
};

export default TargetSection;
