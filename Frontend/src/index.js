import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import DataProvider from "./context/auth.js";
import "antd/dist/reset.css";
import { CartProvider } from "./context/Cart.js";

const root = createRoot(document.getElementById("root"));
root.render(
  <DataProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </DataProvider>
);
