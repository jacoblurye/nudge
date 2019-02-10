import * as React from "react";
import { Grid } from "semantic-ui-react";
import browser from "../../browser";
import URLInput from "../URLInput";
import URLItem from "../URLItem";

const TargetUrl = () => {
  const [targetURL, setTargetURL] = React.useState<URL | undefined>(undefined);

  React.useEffect(() => {
    browser.targetURL.onGet(setTargetURL);
  }, []);

  const removeURL = () => {
    browser.targetURL.remove(() => setTargetURL(undefined));
  };

  const addURL = (url: URL) => {
    browser.targetURL.set(url);
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
