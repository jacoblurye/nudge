import * as React from "react";
import { Button, Header, Item, Label, Loader } from "semantic-ui-react";
import urlToKey from "../../util/urlToKey";
import useCurrentURL from "../../hooks/useCurrentURL";
import AppStateContext from "../AppStateContext";
import BlockedURLModal from "./BlockedURLModal";

/** Blocked URLs are URLs that the user finds distracting. Once the URL is
 * registered as blocked, all pages on the associated domain will redirect to
 * the "Target" url, if one is defined.
 */
const BlockedSection = () => {
  const currentURL = useCurrentURL();
  const addCurrentURL = () => currentURL && addBlockedURL(currentURL);

  const { appState, addBlockedURL } = React.useContext(AppStateContext)!;
  const { targetURL, blockedURLs } = appState;

  if (!currentURL) return <Loader active />;

  const currentIsTarget =
    targetURL && urlToKey(currentURL) === urlToKey(targetURL);
  const currentIsBlocked = blockedURLs.contains(currentURL);

  const thisPage = urlToKey(currentURL);

  return (
    <div>
      {currentIsBlocked ? (
        <>
          <Header as="h5">
            <Item>
              <Label size="large">{thisPage}</Label>
            </Item>
            will redirect to your target page.
          </Header>
        </>
      ) : currentIsTarget ? (
        <Header as="h4">You're on your target page.</Header>
      ) : (
        <Button primary fluid onClick={addCurrentURL}>
          <Item>block &amp; redirect</Item>
          <div>
            <Label color="blue" size="huge">
              {thisPage}
            </Label>
          </div>
        </Button>
      )}

      <BlockedURLModal />
    </div>
  );
};

export default BlockedSection;
