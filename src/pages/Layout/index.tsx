import * as React from "react";
import { Divider, Grid } from "semantic-ui-react";
import BadUrls from "../../components/BadURLs/index";
import TargetUrl from "../../components/TargetURL/index";
import Sidebar from "../Sidebar";

const Layout = () => (
  <div style={{ width: "700px" }}>
    <Sidebar>
      <Grid stretched centered columns={2} style={{ height: "300px" }}>
        <Grid.Row stretched>
          <Grid.Column width={8} verticalAlign="middle" stretched>
            <BadUrls />
          </Grid.Column>
          <Grid.Column width={8} verticalAlign="middle" stretched>
            <TargetUrl />
          </Grid.Column>
          <Divider vertical>to</Divider>
        </Grid.Row>
      </Grid>
    </Sidebar>
  </div>
);

export default Layout;
