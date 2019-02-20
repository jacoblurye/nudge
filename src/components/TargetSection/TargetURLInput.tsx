import * as React from "react";
import { Form, Grid, Icon, Input, InputProps, Label } from "semantic-ui-react";
import AppStateContext from "../AppStateContext";
import useCurrentURL from "../../hooks/useCurrentURL";
import buildURL from "./util/buildURL";

const TargetURLInput = (inputProps: InputProps) => {
  const { appState, addTargetURL } = React.useContext(AppStateContext)!;

  const [inputValue, setInputValue] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleInputChange = ({ value }: InputProps) => {
    setErrorMessage("");
    setInputValue(value);
  };

  const handleURLSubmit = () => {
    try {
      const url = buildURL(inputValue, appState.blockedURLs);
      addTargetURL(url);
    } catch (err) {
      setErrorMessage(err);
    }
  };

  const currentURL = useCurrentURL();

  return (
    <Form onSubmit={handleURLSubmit}>
      <div>
        <Input
          as={Grid.Column}
          value={inputValue}
          onChange={handleInputChange}
          icon={
            <Icon
              link
              name="chain"
              onClick={() => currentURL && setInputValue(currentURL.href)}
            />
          }
          {...inputProps}
        />
        {errorMessage && (
          <Label pointing="above" color="purple">
            {errorMessage}
          </Label>
        )}
      </div>
    </Form>
  );
};

export default TargetURLInput;
