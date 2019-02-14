import React from "react";
import { Accordion, Icon, Segment } from "semantic-ui-react";
import URLItem from "./URLItem";
import AppStateContext from "../AppStateContext";

const BlockedURLAccordion = () => {
  const { appState, removeBadURL } = React.useContext(AppStateContext)!;
  const { badURLs } = appState;

  const [active, setActive] = React.useState<boolean>(false);

  const toggleActive = () => setActive(!active);

  return (
    <Accordion id="accordion" style={{ textAlign: "left" }}>
      <Accordion.Title active={active} onClick={toggleActive}>
        <Icon name="dropdown" />
        Manage blocked pages
      </Accordion.Title>
      <Accordion.Content active={active}>
        {badURLs.length > 0 ? (
          <Segment.Group>
            {badURLs.map(url => (
              <URLItem
                key={url.href}
                url={url}
                removeURL={() => removeBadURL(url)}
              />
            ))}
          </Segment.Group>
        ) : (
          <Segment basic>Add some sites that distract you!</Segment>
        )}
      </Accordion.Content>
    </Accordion>
  );
};

export default BlockedURLAccordion;
