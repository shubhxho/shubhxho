import assert from "node:assert/strict";
import { spawn } from "node:child_process";

const port = 3137;
const origin = `http://127.0.0.1:${port}`;
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

async function get(path, options) {
  return fetch(`${origin}${path}`, options);
}

try {
  await waitForServer();

  const homepage = await get("/");
  const homepageHtml = await homepage.text();
  assert.equal(homepage.status, 200);
  assert.match(homepage.headers.get("content-type") ?? "", /^text\/html/);
  assert.match(homepage.headers.get("vary") ?? "", /\baccept\b/i);
  assert.match(homepageHtml, /<h1[^>]*>Shubh Gupta/);
  assert.match(homepageHtml, /<h2[^>]*>Timeline<\/h2>/);
  assert.ok(textFromHtml(homepageHtml).length > 500, "homepage must have 500+ characters without JavaScript");

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
  assert.match(await htmlNotFound.text(), /SITEMAP[\s\S]*LLMS\.TXT/);

  const markdownNotFound = await get("/not-a-real-page", {
    headers: { Accept: "text/markdown" },
  });
  assert.equal(markdownNotFound.status, 404);
  assert.match(markdownNotFound.headers.get("content-type") ?? "", /^text\/markdown/);
  assert.match(await markdownNotFound.text(), /^# 404: Page not found/m);

  for (const path of ["/about", "/contact", "/privacy"]) {
    const response = await get(path);
    const html = await response.text();
    assert.equal(response.status, 200, `${path} must be public`);
    assert.ok(textFromHtml(html).length > 500, `${path} must contain 500+ characters`);
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

  const llms = await (await get("/llms.txt")).text();
  assert.match(llms, /## When to use this profile/);
  assert.match(llms, /agent workflow/);

  const sitemap = await (await get("/sitemap.xml")).text();
  for (const path of ["/about", "/contact", "/privacy"]) {
    assert.match(sitemap, new RegExp(`https://shubhxho\\.com${path}`));
  }

  const indexNow = await get("/indexnow.txt");
  assert.equal(indexNow.status, 404, "IndexNow must remain unavailable without a configured key");

  console.log("Agent-readiness endpoint tests passed.");
} finally {
  server.kill("SIGTERM");
}
