import * as React from "react";
import { Grid, Card } from "semantic-ui-react";
import browserClient from "../../browserClient";
import URLInput from "../URLInput";
import URLItem from "../URLItem";

const TargetUrl = () => {
  const [targetURL, setTargetURL] = React.useState<URL | undefined>(undefined);

  React.useEffect(() => {
    browserClient.onTargetURL(setTargetURL);
  }, []);

  const removeURL = () => {
    browserClient.removeTargetURL(() => setTargetURL(undefined));
  };

  const addURL = (url: URL) => {
    browserClient.setTargetURL(url);
    setTargetURL(url);
  };

  return targetURL ? (
    <Grid.Row>
      <URLItem
        url={targetURL}
        onRemove={removeURL}
        size="huge"
        color="teal"
        circular
      />
    </Grid.Row>
  ) : (
    <URLInput onSubmit={addURL} placeholder="Set a target URL" />
  );
};

export default TargetUrl;
