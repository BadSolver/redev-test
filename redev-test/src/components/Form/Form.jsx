import React from "react";
import "./form.css";

export const Form = ({ placeholder, onChange, name, value, type }) => {
  return (
    <>
      <label className="form">
        <input
          placeholder={placeholder}
          onChange={onChange}
          type={type}
          name={name}
          value={value}
        />
      </label>
    </>
  );
};
