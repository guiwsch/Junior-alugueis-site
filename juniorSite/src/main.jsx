import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApartmentProvider } from "./Contexts/ApartmentContext.jsx";
import { AuthProvider } from "./Contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ApartmentProvider>
        <App />
      </ApartmentProvider>
    </AuthProvider>
  </StrictMode>
);
