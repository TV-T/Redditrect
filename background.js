browser.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = new URL(details.url);
    if (url.hostname.includes('reddit.com') && !url.hostname.includes('old.reddit.com')) {
      const oldRedditUrl = new URL(`https://old.reddit.com${url.pathname}`);
      return { redirectUrl: oldRedditUrl.toString() };
    }
  },
  { urls: ["*://*.reddit.com/*"] },
  ["blocking"]
);