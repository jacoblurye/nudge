import * as React from "react";
import { Form, Grid, Icon, Input, InputProps, Label } from "semantic-ui-react";
import browser from "../../browser";
import { Callback } from "../../types";

export interface URLInputProps extends InputProps {
  onSubmit: Callback<URL>;
}

const URLInput = ({ onSubmit, ...inputProps }: URLInputProps) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleInputChange = (
    _: React.SyntheticEvent,
    { value }: InputProps
  ) => {
    setErrorMessage("");
    setInputValue(value);
  };

  const handleLinkClick = () =>
    browser.tabs.onCurrentURL(url => setInputValue(url.href));

  const handleURLSubmit = () => {
    try {
      const url = new URL(inputValue);
      onSubmit(url);
      setInputValue("");
    } catch {
      setErrorMessage("Please enter a valid URL!");
    }
  };

  return (
    <Form onSubmit={handleURLSubmit}>
      <Input
        as={Grid.Column}
        value={inputValue}
        onChange={handleInputChange}
        icon={
          <Icon name="chain" inverted circular link onClick={handleLinkClick} />
        }
        {...inputProps}
      />
      {errorMessage && (
        <Label pointing="above" color="purple">
          {errorMessage}
        </Label>
      )}
    </Form>
  );
};

export default URLInput;
