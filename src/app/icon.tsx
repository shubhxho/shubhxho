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
          background: "#fafafa",
          color: "#171717",
          fontSize: 320,
          fontStyle: "italic",
          letterSpacing: -24,
        }}
      >
        s
      </div>
    ),
    size,
  );
}
