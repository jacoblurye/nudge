import * as React from "react";
import { Label, Grid } from "semantic-ui-react";
import URLItem from "../URLItem";
import browserClient, { urlToKey } from "../../browserClient";
import URLInput from "../URLInput";

/** "Bad" URLs are URLs that the user finds distracting. Once the URL is
 * registered as bad, all pages on the associated domain will redirect to
 * the "Target" url, if one is defined.
 */
const BadURLs = () => {
  const [badURLs, setBadURLs] = React.useState<URL[]>([]);

  React.useEffect(() => {
    browserClient.onBadURLs(setBadURLs);
  }, []);

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
      <Label.Group circular>
        {badURLs.map(url => {
          return (
            <URLItem
              key={urlToKey(url)}
              url={url}
              onRemove={removeURL(url)}
              size="tiny"
            />
          );
        })}
      </Label.Group>

      <URLInput onSubmit={addURL} placeholder="Add a distracting URL" />
    </div>
  );
};

export default BadURLs;
