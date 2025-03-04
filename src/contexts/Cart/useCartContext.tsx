import { useContext } from "react";
import { CartContext } from "./CartContext";

const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within an CartProvider");
  }

  return context;
};

export { useCartContext };
