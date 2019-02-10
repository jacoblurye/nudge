import * as React from "react";
import URLInputButton from "../URLInputButton";
import { Label, Grid } from "semantic-ui-react";
import BadURL from "../BadURL";
import browserClient, { urlToKey } from "../../browserClient";

/** "Bad" URLs are URLs that the user finds distracting. Once the URL is
 * registered as bad, all pages on the associated domain will redirect to
 * the "Target" url, if one is defined.
 */
const BadURLs = () => {
  const [badURLs, setBadURLs] = React.useState<URL[]>([]);

  React.useEffect(() => {
    browserClient.onBadURLs(setBadURLs);
  }, [badURLs.toString()]);

  const removeURL = (url: URL) => () => {
    const filteredURLs = badURLs.filter(u => urlToKey(u) !== urlToKey(url));
    browserClient.removeBadURL(url, () => setBadURLs(filteredURLs));
  };

  const addURL = (url: URL) => {
    if (!badURLs.find(u => urlToKey(u) === urlToKey(url))) {
      setBadURLs([...badURLs, url]);
      browserClient.insertBadURL(url);
    }
  };

  return (
    <div>
      <Grid.Row>
        <Label.Group circular>
          {badURLs.map(url => {
            return (
              <BadURL key={urlToKey(url)} url={url} onRemove={removeURL(url)} />
            );
          })}
        </Label.Group>
      </Grid.Row>

      <Grid.Row>
        <URLInputButton onSubmit={addURL} />
      </Grid.Row>
    </div>
  );
};

export default BadURLs;
