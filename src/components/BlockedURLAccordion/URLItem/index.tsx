import * as React from "react";
import { Segment } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";

interface URLItemProps {
  url: URL;
  removeURL: () => void;
}

const URLItem = (props: URLItemProps) => {
  return (
    <Segment>
      <Grid size="tiny" columns={2} verticalAlign="middle">
        <Grid.Column
          floated="left"
          width={12}
          textAlign="left"
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
          }}
        >
          <Header as="h5">{props.url.hostname}</Header>
        </Grid.Column>
        <Grid.Column size="mini" width={4}>
          <Icon link name="x" onClick={props.removeURL} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default URLItem;
