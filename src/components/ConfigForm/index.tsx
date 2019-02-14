import * as React from "react";
import { Form, Icon, Segment, Header } from "semantic-ui-react";
import { onFormValue } from "../../util";
import { StorageContext } from "../../App";

const ConfigForm = () => {
  const { configs, saveNewConfig, selectConfig } = React.useContext(
    StorageContext
  )!;

  const [newName, setNewName] = React.useState("");

  const submitName = () => {
    saveNewConfig(newName);
    setNewName("");
  };

  const pushNewConfig = onFormValue(selectConfig);

  const updateNameInput = onFormValue(setNewName);

  return (
    <div>
      <Header attached color="teal">
        Load an Existing Setup
      </Header>
      <Form as={Segment} attached>
        <Form.Dropdown
          fluid
          selection
          onChange={pushNewConfig}
          options={configs.map(value => ({ value, text: value }))}
        />
      </Form>
      <Header attached color="teal">
        Save the Current Setup
      </Header>
      <Form as={Segment} onSubmit={submitName} attached>
        <Form.Input
          value={newName}
          onChange={updateNameInput}
          icon={<Icon link name="save" onClick={submitName} />}
          placeholder="Please enter a name"
        />
      </Form>
    </div>
  );
};

export default ConfigForm;
