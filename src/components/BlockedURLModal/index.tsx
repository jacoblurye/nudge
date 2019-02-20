import * as React from "react";
import AppStateContext from "../AppStateContext/index";
import { Modal, Segment, Message, Button, Icon } from "semantic-ui-react";
import URLItem from "./URLItem/index";

const BlockedURLModal = () => {
  const { appState, removeBlockedURL } = React.useContext(AppStateContext)!;
  const { blockedURLs } = appState;

  return (
    <Modal
      trigger={
        <Segment basic fluid style={{ margin: 0 }}>
          <Button as="a" basic fluid size="mini">
            <Icon name="setting" />
            Manage blocked pages
          </Button>
        </Segment>
      }
    >
      <Modal.Header>Manage Blocked Pages</Modal.Header>
      <Modal.Content>
        {blockedURLs.urls.length > 0 ? (
          <Segment.Group>
            {blockedURLs.urls.map(url => (
              <URLItem
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
