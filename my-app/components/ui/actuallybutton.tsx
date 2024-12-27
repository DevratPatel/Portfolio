import React from "react";

export function ActuallyBtn() {
  return (
    <div
      style={{
        width: "118px",
        height: "32px",
        background: "rgba(175.40, 175.40, 175.40, 0.20)",
        borderRadius: 23,
        backdropFilter: "blur(2.50px)",
        textAlign: "center",
        marginTop: "12px",
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: 18,
          fontFamily: "DM Sans",
          fontWeight: "200",
          wordWrap: "break-word",
          marginTop: "2px",
        }}
      >
        Actually...
      </div>
    </div>
  );
}
