import React from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { LoginPage, RegisterPage, TodoPage } from "pages";

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/todo"
        element={
          <PrivateRoute>
            <TodoPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
