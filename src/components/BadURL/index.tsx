import * as React from "react";
import { Label, LabelProps } from "semantic-ui-react";

export interface BadURLProps {
  url: URL;
  onRemove: (e: React.SyntheticEvent, p: LabelProps) => void;
}

const BadURL = (props: BadURLProps) => (
  <Label
    size="tiny"
    removeIcon="delete"
    onRemove={props.onRemove}
    content={props.url.hostname}
  />
);

export default BadURL;
