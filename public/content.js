/* global chrome */

chrome.storage.sync.get(storage => {
  if (window.location.hostname in storage)
    chrome.storage.sync.get(["targetURL"], ({ targetURL }) => {
      if (!!targetURL) window.location.href = targetURL;
    });
});
