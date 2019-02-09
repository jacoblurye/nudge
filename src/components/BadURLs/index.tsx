import * as React from "react";
import URLInput from "../URLInput";
import { Label, Grid } from "semantic-ui-react";
import BadURL from "../BadURL";
import browserClient from "../../browserClient";

const BadURLs = () => {
  const [badURLs, setBadURLs] = React.useState<URL[]>([]);

  React.useEffect(() => browserClient.onDistractingOrigins(setBadURLs));

  const addURL = (url: URL) => browserClient.insertDistractingURL(url);

  const removeURL = (url: URL) => () => browserClient.removeDistractingURL(url);

  return (
    <div>
      <Label.Group circular>
        {badURLs.map(url => (
          <BadURL key={url.href} url={url} onRemove={removeURL(url)} />
        ))}
      </Label.Group>
      <Grid.Row>
        <URLInput onSubmit={addURL} />
      </Grid.Row>
    </div>
  );
};

export default BadURLs;
