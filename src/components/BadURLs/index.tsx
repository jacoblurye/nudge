import * as React from "react";
import { Label, ItemProps } from "semantic-ui-react";
import URLItem from "../URLItem";
import URLInput from "../URLInput";
import { urlToKey } from "../../util";
import { StorageContext } from "../../App";

/** "Bad" URLs are URLs that the user finds distracting. Once the URL is
 * registered as bad, all pages on the associated domain will redirect to
 * the "Target" url, if one is defined.
 */
const BadURLs = () => {
  const { badURLs, removeBadURL, addBadURL } = React.useContext(
    StorageContext
  )!;

  // an arbitrary cutoff to keep things inside the popup boundaries
  const urlItemSize: ItemProps["size"] =
    badURLs.length >= 12 ? "small" : "large";

  console.log(badURLs);

  return (
    <div>
      <Label.Group circular>
        {badURLs.map(url => {
          return (
            <URLItem
              key={urlToKey(url)}
              url={url}
              onRemove={() => removeBadURL(url) /* look into this */}
              size={urlItemSize}
            />
          );
        })}
      </Label.Group>

      <div
        style={badURLs.length ? { position: "relative", bottom: "-1rem" } : {}}
      >
        <URLInput onSubmit={addBadURL} placeholder={`Add a distracting URL`} />
      </div>
    </div>
  );
};

export default BadURLs;
