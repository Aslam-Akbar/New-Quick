import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";

// Import all global CSS files
import "./assets/css/variables.css";
import "./assets/css/home.css";
import "./assets/css/style.css";
import "./assets/css/header.css";
import "./assets/css/footer.css";
import "./assets/css/pages.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
