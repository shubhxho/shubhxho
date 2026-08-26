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
          background: "#07080c",
          color: "#e8eaef",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 4, color: "#ffb454", textTransform: "uppercase" }}>
          live signal
        </div>
        <div style={{ fontSize: 96, letterSpacing: -4, fontWeight: 500 }}>shubhxho</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#8b919e",
          }}
        >
          <span>robots · systems · unusual software</span>
          <span style={{ color: "#5ec8ff" }}>khagaria</span>
        </div>
      </div>
    ),
    size,
  );
}
