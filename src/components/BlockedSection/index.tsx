import * as React from "react";
import { Button, Header, Icon, Item, Label } from "semantic-ui-react";
import urlToKey from "../../util/urlToKey";
import useCurrentURL from "../../hooks/useCurrentURL";
import AppStateContext from "../AppStateContext";
import BlockedURLModal from "../BlockedURLModal";

/** Blocked URLs are URLs that the user finds distracting. Once the URL is
 * registered as blocked, all pages on the associated domain will redirect to
 * the "Target" url, if one is defined.
 */
const BlockedSection = () => {
  const currentURL = useCurrentURL();
  const addCurrentURL = () => currentURL && addBlockedURL(currentURL);

  const { appState, addBlockedURL } = React.useContext(AppStateContext)!;
  const { targetURL, blockedURLs } = appState;

  const currentIsTarget =
    currentURL && targetURL && urlToKey(currentURL) === urlToKey(targetURL);
  const currentIsBlocked = currentURL && blockedURLs.contains(currentURL);

  return (
    <div style={{ width: "250px" }}>
      {currentIsBlocked ? (
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

      <BlockedURLModal />
    </div>
  );
};

export default BlockedSection;
