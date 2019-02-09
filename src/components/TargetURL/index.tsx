import * as React from "react";
import { Grid, Input } from "semantic-ui-react";

const TargetUrl = () => {
  return (
    <Grid.Row>
      <Input as={Grid.Column} placeholder="Add a target URL" color="blue" />
    </Grid.Row>
  );
};

export default TargetUrl;
