import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CowContextProvider } from "./context/CowContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <CowContextProvider>
          <App />
        </CowContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
