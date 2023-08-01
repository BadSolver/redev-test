import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ redirectPath = "/register", children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={redirectPath} />;
  }

  return children;
};
