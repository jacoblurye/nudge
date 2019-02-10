export const urlToKey = (url: URL) => url.host;

export const onFormValue = <V, T extends { value: V }>(
  setter: (newValue: V) => void
) => (_: React.SyntheticEvent, { value }: T) => setter(value);
