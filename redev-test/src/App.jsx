import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login, Register } from "components";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
