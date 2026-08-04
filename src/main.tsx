import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element #root not found");
}

declare global {
  interface Window {
    __UNITY_REACT_ROOT__?: ReturnType<typeof ReactDOM.createRoot>;
  }
}

// Avoid React error #299 when the entry module is evaluated twice
const root =
  window.__UNITY_REACT_ROOT__ ?? ReactDOM.createRoot(container);
window.__UNITY_REACT_ROOT__ = root;

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
