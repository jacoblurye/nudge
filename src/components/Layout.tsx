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
import BlockedSection from "../components/BlockedSection";
import TargetSection from "../components/TargetSection";
import AppStateContext from "./AppStateContext";

const Layout = () => {
  const { appState, toggleEnabled } = React.useContext(AppStateContext)!;

  return (
    <div style={{ width: "350px" }}>
      <Grid padded columns={2}>
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <Header size="large" className="title">
              Nudge me to
            </Header>
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
      <Grid as={Dimmer.Dimmable} columns={1} centered padded>
        <Grid.Row style={{ height: "6em" }}>
          <Grid.Column>
            <TargetSection />
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row style={{ height: "9em" }}>
          <Grid.Column>
            <BlockedSection />
          </Grid.Column>
        </Grid.Row>
        <Transition visible={appState.enabled === false}>
          <Dimmer active={appState.enabled === false}>
            <Icon name="moon" />
            <span className="title">Nudge</span> is disabled
          </Dimmer>
        </Transition>
      </Grid>
    </div>
  );
};

export default Layout;
