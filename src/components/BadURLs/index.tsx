import * as React from "react";
import { Label } from "semantic-ui-react";
import URLItem from "../URLItem";
import browser from "../../browser";
import URLInput from "../URLInput";
import { urlToKey } from "../../util";

/** "Bad" URLs are URLs that the user finds distracting. Once the URL is
 * registered as bad, all pages on the associated domain will redirect to
 * the "Target" url, if one is defined.
 */
const BadURLs = () => {
  const [badURLs, setBadURLs] = React.useState<URL[]>([]);

  React.useEffect(() => {
    browser.badURLs.onGet(setBadURLs);
  }, []);

  const removeURL = (url: URL) => () => {
    const filteredURLs = badURLs.filter(u => urlToKey(u) !== urlToKey(url));
    browser.badURLs.remove(url, () => setBadURLs(filteredURLs));
  };

  const addURL = (url: URL) => {
    if (!badURLs.find(u => urlToKey(u) === urlToKey(url))) {
      setBadURLs([...badURLs, url]);
      browser.badURLs.add(url);
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
