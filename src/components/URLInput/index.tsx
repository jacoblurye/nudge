import * as React from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import browserClient from "../../browserClient";

export interface URLInputProps {
  onSubmit: (url: URL) => void;
}

const URLInput = (props: URLInputProps) => {
  return (
    <Button
      circular
      icon="chain"
      onClick={() => browserClient.onCurrentTab(props.onSubmit)}
    />
  );
};

export default URLInput;
