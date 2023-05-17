import React from "react";

export default function Loader() {
  return (
    <>
      <div className="mx-auto my-4"
        style={{
          width: "100px",
          height: "100px",
          border: "10px solid #332d2d",
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin 1s ease-in-out infinite",
        }}
      ></div>
      <div className="mx-auto my-4">Loading, please wait ... &nbsp;</div>
    </>
  );
}
