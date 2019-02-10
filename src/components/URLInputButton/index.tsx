import * as React from "react";
import { Button } from "semantic-ui-react";
import browserClient from "../../browserClient";

export interface URLInputProps {
  onSubmit: (url: URL) => void;
}

const URLInputButton = (props: URLInputProps) => {
  return (
    <Button
      secondary
      icon="chain"
      content="add this page"
      onClick={() => browserClient.onCurrentTab(props.onSubmit)}
    />
  );
};

export default URLInputButton;
