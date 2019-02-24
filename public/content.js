/* global chrome */

chrome.storage.sync.get(storage => {
  if (window.location.hostname in storage && storage.enabled === true)
    chrome.storage.sync.get(["targetURL"], ({ targetURL }) => {
      if (!!targetURL) window.location.href = targetURL;
    });
});
