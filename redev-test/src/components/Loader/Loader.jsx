import React from "react";
import "./style.css";
import { ClipLoader } from "react-spinners";

export const Loader = () => {
  const override = {
    background: "transparent",
  };

  return (
    <div className="loader">
      <ClipLoader cssOverride={override} size={25} color="goldenrod" />
    </div>
  );
};
