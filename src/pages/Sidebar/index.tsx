import * as React from "react";
import ConfigForm from "../../components/ConfigForm";
import { Sidebar as SemanticSidebar } from "semantic-ui-react";
import SidebarButton from "../../components/SidebarButton";

export interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = (props: SidebarProps) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const toggleSidebar = () => setVisible(!visible);

  return (
    <SemanticSidebar.Pushable>
      <SemanticSidebar
        animation="overlay"
        direction="right"
        icon="labeled"
        visible={visible}
        style={{ overflow: "hidden" }}
      >
        <ConfigForm />
        <SidebarButton icon="right angle" handleClick={toggleSidebar} />
      </SemanticSidebar>
      <SemanticSidebar.Pusher>
        {props.children}
        <SidebarButton icon="left angle" handleClick={toggleSidebar} />
      </SemanticSidebar.Pusher>
    </SemanticSidebar.Pushable>
  );
};

export default Sidebar;
