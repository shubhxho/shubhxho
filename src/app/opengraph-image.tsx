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
          background: "#fafafa",
          color: "#111111",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700 }}>shubhxho</div>
        <div style={{ fontSize: 64, lineHeight: 1.1, maxWidth: 900, fontWeight: 700 }}>
          Hi. I make things.
        </div>
        <div style={{ fontSize: 24, color: "#666666" }}>
          robotics · systems · writing · from khagaria
        </div>
      </div>
    ),
    size,
  );
}
