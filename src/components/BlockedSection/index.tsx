import * as React from "react";
import { Button, Header, Loader, Icon } from "semantic-ui-react";
import urlToKey from "../../util/urlToKey";
import useCurrentURL from "../../hooks/useCurrentURL";
import AppStateContext from "../AppStateContext";
import BlockedURLModal from "./BlockedURLModal";
import centeringCSS from "../../util/centeringCSS";

/** Blocked URLs are URLs that the user finds distracting. Once the URL is
 * registered as blocked, all pages on the associated domain will redirect to
 * the "Target" url, if one is defined.
 */
const BlockedSection = () => {
  const currentURL = useCurrentURL();

  const { appState, addBlockedURL } = React.useContext(AppStateContext)!;
  const { targetURL, blockedURLs } = appState;

  const addCurrentURL = () => currentURL && addBlockedURL(currentURL);

  if (!currentURL) return <Loader active />;

  const currentIsTarget =
    targetURL && urlToKey(currentURL) === urlToKey(targetURL);
  const currentIsBlocked = blockedURLs.contains(currentURL);

  const thisPage = (
    <div style={{ textDecoration: "underline" }}>{urlToKey(currentURL)}</div>
  );

  return (
    <div
      style={{
        textAlign: "center",
        width: "20em",
        ...centeringCSS
      }}
    >
      {currentIsBlocked ? (
        <>
          <Header as="h5">
            <div>{thisPage}</div>
            will redirect to your target page.
          </Header>
        </>
      ) : currentIsTarget ? (
        <>
          <Header as="h4">You're on your target page.</Header>
          <Icon name="check" color="blue" size="large" />
        </>
      ) : (
        <Button fluid onClick={addCurrentURL}>
          <div>block &amp; redirect</div>
          {thisPage}
        </Button>
      )}

      <BlockedURLModal />
    </div>
  );
};

export default BlockedSection;
