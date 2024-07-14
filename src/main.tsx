import React from "react";
import ReactDOM from "react-dom/client";
import { initStore } from "@/store/methods";
import "@/index.css";
import App from "@/App";

initStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
