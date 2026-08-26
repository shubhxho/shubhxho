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
        <div style={{ fontSize: 72, fontWeight: 700 }}>shubh gupta</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#666666" }}>
          <span>robots · systems · unusual software</span>
          <span>shubhxho.com</span>
        </div>
      </div>
    ),
    size,
  );
}
