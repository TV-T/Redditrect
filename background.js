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
    if (!enabled) return;

    const url = new URL(details.url);
    const isRedditUrl = url.hostname.includes('reddit.com');
    const isOldRedditUrl = url.hostname.includes('old.reddit.com');
    const isGallery = url.pathname.includes('/gallery/');
    const isMedia = url.pathname.includes('/media');

    if (isRedditUrl && !isOldRedditUrl && !isGallery && !isMedia) {
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