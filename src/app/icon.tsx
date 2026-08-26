import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07080c",
          color: "#5ec8ff",
          fontSize: 280,
          fontWeight: 500,
          letterSpacing: -24,
        }}
      >
        s
      </div>
    ),
    size,
  );
}
