import React from "react";
import "./button.css";

export const Button = ({ onClick, text, type }) => {
  return (
    <div>
      <button type={type} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};
