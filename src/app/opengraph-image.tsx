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
          background: "#05070b",
          color: "#e8edf5",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 4, color: "#7dffb3", textTransform: "uppercase" }}>
          systems · robotics · ai
        </div>
        <div style={{ fontSize: 84, letterSpacing: -4, fontWeight: 700 }}>shubh gupta</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#8b95a8" }}>
          <span>unusual software from khagaria</span>
          <span style={{ color: "#4db0ff" }}>shubhxho.com</span>
        </div>
      </div>
    ),
    size,
  );
}
