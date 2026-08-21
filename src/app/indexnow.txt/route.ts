const validKey = /^[A-Za-z0-9-]{8,128}$/;

export const dynamic = "force-dynamic";

export function GET() {
  const key = process.env.INDEXNOW_KEY;

  if (!key || !validKey.test(key)) {
    return new Response("Not configured\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(`${key}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
