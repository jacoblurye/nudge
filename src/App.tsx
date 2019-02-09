import React from "react";
import { Grid, Divider } from "semantic-ui-react";
import BadUrls from "./components/BadURLs/index";
import TargetUrl from "./components/TargetURL/index";

const App: React.SFC = () => (
  <main style={{ width: "500px", height: "100px" }}>
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
  </main>
);

export default App;
