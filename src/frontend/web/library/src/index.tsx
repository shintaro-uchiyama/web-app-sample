import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App";
import "~/index.css";
import "~/locales/i18n";
import { worker } from "~/mocks/browser";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
