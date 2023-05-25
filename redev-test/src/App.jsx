import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login, Register, Todo } from "components";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
