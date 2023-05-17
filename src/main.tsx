import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./feature_auth/page/Login";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
