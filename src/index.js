import React from "react";
import ReactDOM from "react-dom/client";
// import "./styles/global.scss";
import "./styles/input.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { ConfigProvider } from "./context/ConfigProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ConfigProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ConfigProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
