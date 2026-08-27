import { ImageResponse } from "next/og";

export const alt = "shubhxho";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#111111",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700 }}>Shubh Gupta</div>
        <div style={{ fontSize: 72, lineHeight: 1.05, maxWidth: 900, fontWeight: 700 }}>
          Hi. I make things.
        </div>
        <div style={{ fontSize: 24, color: "#555555" }}>
          robots · systems · writing · from Khagaria
        </div>
      </div>
    ),
    size,
  );
}
