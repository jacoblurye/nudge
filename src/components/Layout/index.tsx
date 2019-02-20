import * as React from "react";
import {
  Divider,
  Grid,
  Header,
  Checkbox,
  Dimmer,
  Transition,
  Icon
} from "semantic-ui-react";
import BlockedSection from "../../components/BlockedSection";
import TargetSection from "../../components/TargetSection";
import AppStateContext from "../AppStateContext";

const Layout = () => {
  const { appState, toggleEnabled } = React.useContext(AppStateContext)!;

  return (
    <div>
      <Grid padded columns={2} style={{ width: "400px" }}>
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
      </Grid>
      <Grid as={Dimmer.Dimmable} padded columns={2} style={{ width: "400px" }}>
        <Grid.Row centered>
          <TargetSection />
        </Grid.Row>
        <Divider />
        <Grid.Row centered>
          <BlockedSection />
        </Grid.Row>
        <Transition visible={!appState.enabled}>
          <Dimmer active={!appState.enabled}>
            <Icon name="moon" />
            Nudge is disabled
          </Dimmer>
        </Transition>
      </Grid>
    </div>
  );
};

export default Layout;
