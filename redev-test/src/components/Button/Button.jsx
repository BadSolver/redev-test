import React from "react";
import "./button.css";

export const Button = ({ onClick, text }) => {
  return (
    <div>
      <button type="submit" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};
