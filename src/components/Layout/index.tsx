import * as React from "react";
import { Divider, Grid, Header, Checkbox } from "semantic-ui-react";
import BlockedSection from "../../components/BlockedSection";
import TargetSection from "../../components/TargetSection";
import AppStateContext from "../AppStateContext";

const Layout = () => {
  const { appState, toggleEnabled } = React.useContext(AppStateContext)!;

  return (
    <Grid padded columns={2}>
      <Grid.Row verticalAlign="middle">
        <Grid.Column>
          <Header size="medium">Nudge</Header>
        </Grid.Column>
        <Grid.Column floated="right">
          <Checkbox
            toggle
            style={{ float: "right" }}
            checked={appState.enabled}
            onChange={toggleEnabled}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <TargetSection />
      </Grid.Row>
      <Divider />
      <Grid.Row centered>
        <BlockedSection />
      </Grid.Row>
    </Grid>
  );
};

export default Layout;
