import { Login, Register, Todo } from "components";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
    }
  }, []);
  const updateToken = (newToken) => {
    setToken(newToken);
  };
  return (
    <Routes>
      <Route path="/" element={<Login updateToken={updateToken} />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/todo"
        element={token ? <Todo /> : <Navigate to={"/register"} />}
      />
    </Routes>
  );
};
