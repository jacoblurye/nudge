import * as React from "react";
import { Form, Grid, Icon, Input, InputProps, Label } from "semantic-ui-react";
import AppStateContext from "../AppStateContext";
import useCurrentURL from "../../hooks/useCurrentURL";
import buildURL from "./util/buildURL";

const TargetURLInput = (inputProps: InputProps) => {
  const { appState, addTargetURL } = React.useContext(AppStateContext)!;

  const [inputValue, setInputValue] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleInputChange = (
    _: React.SyntheticEvent,
    { value }: InputProps
  ) => {
    setErrorMessage("");
    setInputValue(value);
  };

  const checkForSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleURLSubmit();
    }
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
    <div style={{ textAlign: "center" }}>
      <Input
        fluid
        as={Grid.Column}
        value={inputValue}
        onKeyDown={checkForSubmit}
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
  );
};

export default TargetURLInput;
