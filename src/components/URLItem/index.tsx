import * as React from "react";
import { Label, LabelProps, ItemProps } from "semantic-ui-react";
import { urlToKey } from "../../browserClient";

export interface URLItemProps extends ItemProps {
  url: URL;
  onRemove: (e: React.SyntheticEvent, p: LabelProps) => void;
}

const URLItem = ({ url, onRemove, ...itemProps }: URLItemProps) => (
  <Label
    removeIcon="delete"
    onRemove={onRemove}
    content={urlToKey(url)}
    {...itemProps}
  />
);

export default URLItem;
