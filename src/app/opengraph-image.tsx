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
          background: "#fafafa",
          color: "#171717",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 72, letterSpacing: -2 }}>shubh.</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#737373",
          }}
        >
          <span>hacker from khagaria</span>
          <span style={{ color: "#fb6e1c" }}>s/x</span>
        </div>
      </div>
    ),
    size,
  );
}
