import * as React from "react";
import AppStateContext from "../AppStateContext";
import { Modal, Segment, Message, Button, Icon } from "semantic-ui-react";
import BlockedURLItem from "./BlockedURLItem";
import centeringCSS from "../../util/centeringCSS";

const BlockedURLModal = () => {
  const { appState, removeBlockedURL } = React.useContext(AppStateContext)!;
  const { blockedURLs } = appState;

  return (
    <Modal
      trigger={
        <Button
          as="a"
          basic
          fluid
          size="mini"
          style={{
            position: "absolute",
            bottom: ".1rem",
            width: "20em",
            ...centeringCSS
          }}
        >
          <Icon name="setting" />
          Manage blocked pages
        </Button>
      }
    >
      <Modal.Header>Manage Blocked Pages</Modal.Header>
      <Modal.Content>
        {blockedURLs.urls.length > 0 ? (
          <Segment.Group>
            {blockedURLs.urls.map(url => (
              <BlockedURLItem
                key={url.href}
                url={url}
                removeURL={() => removeBlockedURL(url)}
              />
            ))}
          </Segment.Group>
        ) : (
          <Message>
            <Message.Header>You have no blocked pages.</Message.Header>
            <Message.Content>
              Block distracting pages as you visit them.
            </Message.Content>
          </Message>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default BlockedURLModal;
