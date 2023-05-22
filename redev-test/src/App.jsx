import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Register } from "components";
import { MyContextProvider } from "ContextData";

function App() {
  return (
    <div className="wrapper">
      <MyContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </MyContextProvider>
    </div>
  );
}

export default App;
