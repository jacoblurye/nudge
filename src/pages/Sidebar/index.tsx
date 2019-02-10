import * as React from "react";
import {
  Button,
  Input,
  Menu,
  Rail,
  Segment,
  Sidebar as SemanticSidebar,
  Message
} from "semantic-ui-react";

export interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = (props: SidebarProps) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const toggleSidebar = () => setVisible(!visible);

  return (
    <SemanticSidebar.Pushable as={Segment}>
      <SemanticSidebar
        as={Menu}
        animation="slide along"
        direction="right"
        icon="labeled"
        vertical
        visible={visible}
        width="wide"
      >
        <Message>Under Construction :~)</Message>
      </SemanticSidebar>
      <SemanticSidebar.Pusher>
        {props.children}
        <Rail attached internal position="right">
          <Button icon="bars" onClick={toggleSidebar} floated="right" />
        </Rail>
      </SemanticSidebar.Pusher>
    </SemanticSidebar.Pushable>
  );
};

export default Sidebar;
