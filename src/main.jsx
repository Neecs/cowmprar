import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CowContextProvider } from "./context/CowContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CowContextProvider>
        <App />
      </CowContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
