import { Login, Register, Todo } from "components";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  // const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));


  // const updateToken = (newToken) => {
  //   setToken(newToken);
  // };
  return (
    <Routes>
      <Route index element={<Login/>} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/todo"
        element={
          <PrivateRoute >
            <Todo />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
