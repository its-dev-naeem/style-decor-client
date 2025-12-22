import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes/Routes";
import "./index.css";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <RouterProvider router={router} />
    <Toaster position="top-right" />
  </AuthProvider>
);
