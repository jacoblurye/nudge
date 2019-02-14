import * as React from "react";
import { Form, Grid, Icon, Input, InputProps, Label } from "semantic-ui-react";
import AppStateContext from "../AppStateContext";
import urlToKey from "../../util/urlToKey";
import useCurrentURL from "../../hooks/useCurrentURL";

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
      const url = inputValue.startsWith("http")
        ? new URL(inputValue)
        : new URL(`http://${inputValue}`);

      const urlKey = urlToKey(url);
      if (appState.badURLs.find(u => urlToKey(u) === urlKey)) {
        setErrorMessage("You can't target a page that you've blocked!");
      } else {
        addTargetURL(url);
      }
    } catch {
      setErrorMessage("Please enter a valid URL!");
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
