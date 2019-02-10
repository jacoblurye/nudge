import * as React from "react";
import { Label, LabelProps } from "semantic-ui-react";
import { urlToKey } from "../../browserClient";

export interface BadURLProps {
  url: URL;
  onRemove: (e: React.SyntheticEvent, p: LabelProps) => void;
}

const BadURL = (props: BadURLProps) => (
  <Label
    size="tiny"
    removeIcon="delete"
    onRemove={props.onRemove}
    content={urlToKey(props.url)}
  />
);

export default BadURL;
