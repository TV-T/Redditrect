let enabled = true;

const getIcon = (enabled) => {
  if (enabled) return {
    path: {
      "16": "icons/redditrect-16.png",
      "32": "icons/redditrect-32.png",
      "64": "icons/redditrect-64.png",
    },
  };
  return {
    path: {
      "16": "icons/redditrect-16-grey.png",
      "32": "icons/redditrect-32-grey.png",
      "64": "icons/redditrect-64-grey.png",
    },
  };
};

browser.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (!enabled) return details.url;

    const url = new URL(details.url);
    if (url.hostname.includes('reddit.com') && !url.hostname.includes('old.reddit.com')) {
      const oldRedditUrl = new URL(`https://old.reddit.com${url.pathname}`);
      return { redirectUrl: oldRedditUrl.toString() };
    }
  },
  { urls: ["*://*.reddit.com/*"] },
  ["blocking"]
);

browser.browserAction.onClicked.addListener(
  () => {
    enabled = !enabled;
    browser.browserAction.setIcon(getIcon(enabled));
  }
);