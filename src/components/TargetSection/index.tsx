import * as React from "react";
import { Segment, Header, Grid, Icon } from "semantic-ui-react";
import TargetURLInput from "../TargetURLInput";
import AppStateContext from "../AppStateContext";
import TargetURLItem from "../TargetURLItem";

const TargetSection = () => {
  const { appState } = React.useContext(AppStateContext)!;

  const { targetURL } = appState;

  return targetURL ? (
    <TargetURLItem targetURL={targetURL} />
  ) : (
    <TargetURLInput placeholder="My Target Page" size="huge" />
  );
};

export default TargetSection;
