import { ImageResponse } from "next/og";

export const alt = "shubh gupta";
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
          background: "#f6f4ef",
          color: "#171717",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 72, letterSpacing: -2 }}>shubhxho</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#5c5c5c",
          }}
        >
          <span>engineer · hacker · builder</span>
          <span style={{ color: "#0f6e56" }}>shubh.</span>
        </div>
      </div>
    ),
    size,
  );
}
