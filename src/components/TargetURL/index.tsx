import * as React from "react";
import { Grid } from "semantic-ui-react";
import URLInput from "../URLInput";
import URLItem from "../URLItem";
import { StorageContext } from "../../App";

const TargetUrl = () => {
  const { targetURL, removeTargetURL, addTargetURL } = React.useContext(
    StorageContext
  )!;

  return targetURL ? (
    <Grid.Row>
      <URLItem
        url={targetURL}
        onRemove={removeTargetURL}
        size="huge"
        color="teal"
        circular
      />
    </Grid.Row>
  ) : (
    <URLInput onSubmit={addTargetURL} placeholder="Set a target URL" />
  );
};

export default TargetUrl;
