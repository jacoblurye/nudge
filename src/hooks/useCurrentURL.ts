import * as React from "react";

export default () => {
  const [currentURL, setCurrentURL] = React.useState<URL | undefined>(
    undefined
  );

  React.useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs && tabs[0] && tabs[0].url) {
        setCurrentURL(new URL(tabs[0].url));
      }
    });
  }, []);

  return currentURL;
};
