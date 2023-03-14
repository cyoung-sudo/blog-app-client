import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Routing
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routesConfig from "./routing/routesConfig";

// Create router
const router = createBrowserRouter(routesConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
);