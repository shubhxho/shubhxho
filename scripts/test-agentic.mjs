import assert from "node:assert/strict";
import { spawn } from "node:child_process";

const port = 3137;
const origin = `http://127.0.0.1:${port}`;
const profileUrls = [
  "github.com/shubhxho",
  "kaggle.com/shubhxho",
  "huggingface.co/shubhxho",
  "x.com/shubhgupta",
  "linkedin.com/in/shubhxho",
  "instagram.com/shubhxho",
];

const server = spawn("./node_modules/.bin/next", ["start", "-p", String(port)], {
  stdio: ["ignore", "pipe", "pipe"],
});

let output = "";
server.stdout.on("data", (chunk) => {
  output += chunk;
});
server.stderr.on("data", (chunk) => {
  output += chunk;
});

async function waitForServer() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(origin, { signal: AbortSignal.timeout(500) });
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Next server did not start.\n${output}`);
}

function textFromHtml(html) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function assertProfileLinks(text, label) {
  for (const url of profileUrls) {
    assert.match(text, new RegExp(url.replaceAll(".", "\\.")), `${label} must include ${url}`);
  }
}

async function get(path, options) {
  return fetch(`${origin}${path}`, options);
}

async function expectMarkdown(path, pattern) {
  const response = await get(path);
  assert.equal(response.status, 200, `${path} must be public`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/markdown/, `${path} must be markdown`);
  const body = await response.text();
  assert.match(body, pattern, `${path} must match expected markdown`);
  return body;
}

try {
  await waitForServer();

  const homepage = await get("/");
  const homepageHtml = await homepage.text();
  assert.equal(homepage.status, 200);
  assert.match(homepage.headers.get("content-type") ?? "", /^text\/html/);
  assert.match(homepage.headers.get("vary") ?? "", /\baccept\b/i);
  assert.match(homepageHtml, /<h1[^>]*>Shubh Gupta/);
  assert.match(homepageHtml, /<h2[^>]*>History<\/h2>/);
  assert.match(homepageHtml, /working on<\/h2>/);
  assert.match(homepageHtml, /<h2[^>]*>Essays<\/h2>/);
  assert.match(homepageHtml, /<h2[^>]*>Blog<\/h2>/);
  assert.match(homepageHtml, /<h2[^>]*>Daily<\/h2>/);
  assert.match(homepageHtml, /<h2[^>]*>Gallery<\/h2>/);
  assert.match(homepageHtml, /<h2[^>]*>Gratitude<\/h2>/);
  assert.ok(textFromHtml(homepageHtml).length > 500, "homepage must have 500+ characters without JavaScript");
  assertProfileLinks(homepageHtml, "homepage");
  assert.match(homepageHtml, /application\/ld\+json/);
  assert.match(homepageHtml, /llms\.txt/);
  assert.match(homepageHtml, /llms-full\.txt/);
  assert.match(homepageHtml, /"subjectOf"/);

  const markdownHomepage = await get("/", { headers: { Accept: "text/markdown" } });
  assert.equal(markdownHomepage.status, 200);
  assert.match(markdownHomepage.headers.get("content-type") ?? "", /^text\/markdown/);
  assert.match(markdownHomepage.headers.get("vary") ?? "", /\baccept\b/i);
  assert.match(await markdownHomepage.text(), /^# Shubh Gupta/m);

  const excludedMarkdown = await get("/", {
    headers: { Accept: "text/markdown;q=0, text/html" },
  });
  assert.match(excludedMarkdown.headers.get("content-type") ?? "", /^text\/html/);

  const htmlNotFound = await get("/not-a-real-page");
  assert.equal(htmlNotFound.status, 404);
  assert.match(await htmlNotFound.text(), /Page not found/);

  const markdownNotFound = await get("/not-a-real-page", {
    headers: { Accept: "text/markdown" },
  });
  assert.equal(markdownNotFound.status, 404);
  assert.match(markdownNotFound.headers.get("content-type") ?? "", /^text\/markdown/);
  const notFoundMarkdown = await markdownNotFound.text();
  assert.match(notFoundMarkdown, /^# 404: Page not found/m);
  assert.match(notFoundMarkdown, /## Agent discovery/);
  assert.match(notFoundMarkdown, /llms\.txt/);
  assert.match(notFoundMarkdown, /llms-full\.txt/);
  assert.match(notFoundMarkdown, /profile\.md/);
  assert.match(notFoundMarkdown, /## Official profiles/);
  assertProfileLinks(notFoundMarkdown, "404 markdown");

  for (const path of ["/about", "/contact", "/privacy", "/readme", "/blog", "/essays", "/daily", "/gallery", "/history", "/people"]) {
    const response = await get(path);
    const html = await response.text();
    assert.equal(response.status, 200, `${path} must be public`);
    assert.ok(textFromHtml(html).length > 200, `${path} must contain readable content`);
  }

  const expectedEndpoints = [
    "/feed.xml",
    "/humans.txt",
    "/llms.txt",
    "/llms-full.txt",
    "/manifest.webmanifest",
    "/profile.md",
    "/robots.txt",
    "/sitemap.xml",
    "/icon",
    "/apple-icon",
    "/opengraph-image",
    "/twitter-image",
  ];
  for (const path of expectedEndpoints) {
    const response = await get(path);
    assert.equal(response.status, 200, `${path} must be public`);
  }

  const llms = await expectMarkdown("/llms.txt", /^# Shubh Gupta/m);
  assert.match(llms, /## Agent workflow/);
  assert.match(llms, /llms-full\.txt/);
  assert.match(llms, /people\.md/);
  assert.match(llms, /## shubhxho/);
  assert.match(llms, /essays\.md/);
  assert.match(llms, /blog\.md/);
  assert.match(llms, /daily\.md/);
  assert.match(llms, /## Markdown endpoints/);
  assertProfileLinks(llms, "llms.txt");

  const llmsFull = await expectMarkdown("/llms-full.txt", /^# Shubh Gupta/m);
  assert.match(llmsFull, /llms\.txt/);
  assert.match(llmsFull, /## Agent workflow/);
  assert.match(llmsFull, /## Markdown endpoints/);
  assert.match(llmsFull, /## People/);
  assert.match(llmsFull, /## Essays/);
  assert.match(llmsFull, /## Blog/);
  assert.match(llmsFull, /## Pages/);
  assert.match(llmsFull, /## Daily/);
  assert.match(llmsFull, /Hack Club/);
  assertProfileLinks(llmsFull, "llms-full.txt");

  const llmsHeaders = await get("/llms.txt");
  assert.match(llmsHeaders.headers.get("link") ?? "", /llms-full\.txt/);
  const llmsFullHeaders = await get("/llms-full.txt");
  assert.match(llmsFullHeaders.headers.get("link") ?? "", /llms\.txt/);

  await expectMarkdown("/profile.md", /^# Shubh Gupta/m);
  await expectMarkdown("/about.md", /^# About Shubh Gupta/m);
  await expectMarkdown("/contact.md", /^# Contact Shubh Gupta/m);
  await expectMarkdown("/privacy.md", /^# Privacy/m);
  await expectMarkdown("/readme.md", /^# README/m);
  await expectMarkdown("/blog.md", /^# Blog/m);
  await expectMarkdown("/blog/wolfpdf.md", /^# Wolfenstein inside a PDF/m);
  await expectMarkdown("/essays.md", /^# Essays/m);
  await expectMarkdown("/essays/from-khagaria.md", /^# From Khagaria/m);
  await expectMarkdown("/people.md", /^# Gratitude/m);
  await expectMarkdown("/people/hackclub.md", /^# Hack Club/m);
  await expectMarkdown("/people/hermes-mail.md", /^# Hermes Mail/m);
  await expectMarkdown("/daily.md", /^# Daily/m);
  await expectMarkdown("/daily/2026-08-29.md", /^# Agent discovery and site links/m);
  await expectMarkdown("/daily/2026-08-30.md", /^# Essays on their own page/m);
  await expectMarkdown("/daily/2026-08-31.md", /^# A README for the site/m);

  const dailyEntry = await get("/daily/2026-08-29");
  assert.equal(dailyEntry.status, 200, "/daily/2026-08-29 must be public");
  assert.match(await dailyEntry.text(), /Agent discovery and site links/);

  const dailyEssaysEntry = await get("/daily/2026-08-30");
  assert.equal(dailyEssaysEntry.status, 200, "/daily/2026-08-30 must be public");
  assert.match(await dailyEssaysEntry.text(), /Essays on their own page/);

  const dailyReadmeEntry = await get("/daily/2026-08-31");
  assert.equal(dailyReadmeEntry.status, 200, "/daily/2026-08-31 must be public");
  assert.match(await dailyReadmeEntry.text(), /A README for the site/);

  const humans = await (await get("/humans.txt")).text();
  assert.match(humans, /shubhxho/);
  assert.match(humans, /llms\.txt/);

  const feed = await (await get("/feed.xml")).text();
  assert.match(feed, /^<\?xml version="1.0"/);
  assert.match(feed, /<rss version="2.0"/);

  const sitemap = await (await get("/sitemap.xml")).text();
  for (const path of ["/about", "/contact", "/privacy", "/readme", "/gallery", "/history", "/blog", "/essays", "/daily", "/people"]) {
    assert.match(sitemap, new RegExp(`https://shubhxho\\.com${path}`));
  }
  assert.match(sitemap, /https:\/\/shubhxho\.com\/essays\/from-khagaria/);
  assert.match(sitemap, /https:\/\/shubhxho\.com\/essays\/from-khagaria/);
  assert.match(sitemap, /https:\/\/shubhxho\.com\/daily/);
  assert.match(sitemap, /https:\/\/shubhxho\.com\/daily\/2026-08-18/);
  assert.match(sitemap, /https:\/\/shubhxho\.com\/daily\/2026-08-29/);
  assert.match(sitemap, /https:\/\/shubhxho\.com\/daily\/2026-08-30/);
  assert.match(sitemap, /https:\/\/shubhxho\.com\/daily\/2026-08-31/);
  assert.match(sitemap, /https:\/\/shubhxho\.com\/people\/hermes-mail/);

  const essayEntry = await get("/essays/from-khagaria");
  assert.equal(essayEntry.status, 200, "/essays/from-khagaria must be public");
  assert.match(await essayEntry.text(), /From Khagaria/);

  const blogEntry = await get("/blog/wolfpdf");
  assert.equal(blogEntry.status, 200, "/blog/wolfpdf must be public");
  assert.match(await blogEntry.text(), /Wolfenstein inside a PDF/);

  const essayRedirect = await get("/blog/from-khagaria", { redirect: "manual" });
  assert.equal(essayRedirect.status, 308, "/blog/from-khagaria must redirect to /essays/from-khagaria");
  assert.match(essayRedirect.headers.get("location") ?? "", /\/essays\/from-khagaria$/);

  const personEntry = await get("/people/hackclub");
  assert.equal(personEntry.status, 200, "/people/hackclub must be public");
  assert.match(await personEntry.text(), /Hack Club/);

  const hermesEntry = await get("/people/hermes-mail");
  assert.equal(hermesEntry.status, 200, "/people/hermes-mail must be public");
  assert.match(await hermesEntry.text(), /Hermes Mail/);

  const gratitudeRedirect = await get("/gratitude", { redirect: "manual" });
  assert.equal(gratitudeRedirect.status, 308, "/gratitude must redirect to /people");
  assert.match(gratitudeRedirect.headers.get("location") ?? "", /\/people$/);

  const gratitudeMarkdownRedirect = await get("/gratitude.md", { redirect: "manual" });
  assert.equal(gratitudeMarkdownRedirect.status, 308, "/gratitude.md must redirect to /people.md");
  assert.match(gratitudeMarkdownRedirect.headers.get("location") ?? "", /\/people\.md$/);

  const indexNow = await get("/indexnow.txt");
  assert.equal(indexNow.status, 404, "IndexNow must remain unavailable without a configured key");

  console.log("Agent-readiness endpoint tests passed.");
} finally {
  server.kill("SIGTERM");
}
