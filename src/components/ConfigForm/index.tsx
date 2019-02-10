import * as React from "react";
import { Form, Icon, Segment, Header } from "semantic-ui-react";
import { onFormValue } from "../../util";
import browser from "../../browser";

const ConfigForm = () => {
  const [names, setNames] = React.useState<string[]>([]);
  const [newName, setNewName] = React.useState<string>("");

  React.useEffect(
    () =>
      browser.configs.onGet(existingNames => {
        setNames(existingNames);
      }),
    []
  );

  const updateName = onFormValue(setNewName);

  const saveNewConfig = () => {
    browser.configs.add(newName);
    setNewName("");
  };

  return (
    <div>
      <Header attached color="teal">
        Load an Existing Setup
      </Header>
      <Form as={Segment} onSubmit={console.log} attached>
        <Form.Dropdown
          clearable
          fluid
          selection
          onChange={console.log}
          options={names.map(value => ({ value, text: value }))}
        />
      </Form>
      <Header attached color="teal">
        Save the Current Setup
      </Header>
      <Form as={Segment} onSubmit={saveNewConfig} attached>
        <Form.Input
          value={newName}
          onChange={updateName}
          icon={<Icon link name="save" onClick={saveNewConfig} />}
          placeholder="Please enter a name"
        />
      </Form>
    </div>
  );
};

export default ConfigForm;
