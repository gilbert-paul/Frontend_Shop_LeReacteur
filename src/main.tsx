import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/Auth/AuthContext.tsx";
import { CartProvider } from "./contexts/Cart/CartContext.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query/queryClient.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
