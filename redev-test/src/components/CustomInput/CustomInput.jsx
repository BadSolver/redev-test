import React from "react";
import "./style.css";

export const CustomInput = ({ placeholder, onChange, value, type }) => {
  return (
    <input
      className="form"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};
