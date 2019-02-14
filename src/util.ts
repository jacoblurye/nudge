import { FormFieldProps } from "semantic-ui-react";

export const urlToKey = (url: URL) => url.host;

// TODO: this isn't great...
export const onFormValue = <T extends FormFieldProps>(
  setter: (newValue: string) => void
) => (_: React.SyntheticEvent, { value }: T) => setter(value.toString());
