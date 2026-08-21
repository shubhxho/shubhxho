const siteUrl = new URL(process.env.SITE_URL ?? "https://shubhxho.com");
const key = process.env.INDEXNOW_KEY;
const validKey = /^[A-Za-z0-9-]{8,128}$/;

if (!key || !validKey.test(key)) {
  throw new Error(
    "Set INDEXNOW_KEY to an 8–128 character key containing letters, numbers, or dashes.",
  );
}

const requestedUrls = process.argv.slice(2);
const urls = (requestedUrls.length > 0 ? requestedUrls : [siteUrl.href]).map(
  (value) => new URL(value, siteUrl),
);

for (const url of urls) {
  if (url.host !== siteUrl.host) {
    throw new Error(`Refusing to submit a URL outside ${siteUrl.host}: ${url.href}`);
  }
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: siteUrl.host,
    key,
    keyLocation: new URL("/indexnow.txt", siteUrl).href,
    urlList: urls.map((url) => url.href),
  }),
});

if (!response.ok && response.status !== 202) {
  const body = await response.text();
  throw new Error(`IndexNow returned ${response.status}: ${body || response.statusText}`);
}

console.log(`IndexNow accepted ${urls.length} URL(s) with status ${response.status}.`);
