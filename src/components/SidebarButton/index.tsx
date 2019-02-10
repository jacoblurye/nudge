import * as React from "react";
import { Rail, Button, ButtonProps } from "semantic-ui-react";

export interface SidebarButtonProps {
  handleClick: () => void;
  icon: ButtonProps["icon"];
}

const SidebarButton = (props: SidebarButtonProps) => (
  <Rail
    attached
    internal
    position="right"
    style={{
      width: "10px" /* otherwise, the rail covers other UI elements */
    }}
  >
    <Button
      circular
      icon={props.icon}
      onClick={props.handleClick}
      floated="right"
    />
  </Rail>
);

export default SidebarButton;
