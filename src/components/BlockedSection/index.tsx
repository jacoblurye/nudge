import * as React from "react";
import { Button, Header, Icon, Item, Label } from "semantic-ui-react";
import urlToKey from "../../util/urlToKey";
import useCurrentURL from "../../hooks/useCurrentURL";
import AppStateContext from "../AppStateContext";
import BlockedURLAccordion from "../BlockedURLAccordion";

/** "Bad" URLs are URLs that the user finds distracting. Once the URL is
 * registered as bad, all pages on the associated domain will redirect to
 * the "Target" url, if one is defined.
 */
const BlockedSection = () => {
  const currentURL = useCurrentURL();
  const addCurrentURL = () => currentURL && addBadURL(currentURL);

  const { appState, addBadURL } = React.useContext(AppStateContext)!;
  const { targetURL, badURLs } = appState;

  const currentIsTarget =
    currentURL && targetURL && urlToKey(currentURL) === urlToKey(targetURL);
  const currentIsBad =
    currentURL && badURLs.find(u => urlToKey(u) === urlToKey(currentURL));

  return (
    <div style={{ width: "250px" }}>
      {currentIsBad ? (
        <>
          <Header as="h5">
            <Item>
              <Label size="large">{urlToKey(currentURL!)}</Label>
            </Item>
            will redirect to your target page.
          </Header>
        </>
      ) : (
        <Button
          primary
          onClick={addCurrentURL}
          size="large"
          disabled={currentIsTarget}
        >
          <Icon name="arrow up" />
          Redirect this page to your target
        </Button>
      )}

      <BlockedURLAccordion />
    </div>
  );
};

export default BlockedSection;
