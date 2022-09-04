import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App";
import "~/index.css";
import { initialize } from "~/features/dark-mode";

initialize();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
