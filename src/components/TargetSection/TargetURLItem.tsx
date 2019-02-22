import * as React from "react";
import { Segment, Grid, Header, Icon } from "semantic-ui-react";
import AppStateContext from "../AppStateContext";

export interface TargetURLItemProps {
  targetURL: URL;
}

const TargetURLItem = ({ targetURL }: TargetURLItemProps) => {
  const { clearTargetURL } = React.useContext(AppStateContext)!;

  return (
    <Segment color="blue">
      <Grid size="tiny" columns={2} verticalAlign="middle" textAlign="center">
        <Grid.Column
          floated="left"
          width={13}
          textAlign="left"
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
          }}
        >
          <Header>{targetURL.hostname}</Header>
        </Grid.Column>
        <Grid.Column size="mini" width={3}>
          <Icon link name="edit" onClick={clearTargetURL} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default TargetURLItem;
