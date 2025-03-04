import { ReactNode, createContext, useReducer } from "react";
import { IProduct } from "../../interfaces/IProduct";
import { ICartContext, ICartProduct } from "../../interfaces/ICart";
import { ICartReducerAction } from "../../interfaces/ICartReducerAction";

const CartContext = createContext<ICartContext | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const cartReducer = (state: {products:ICartProduct[], total:number}, action: ICartReducerAction): {products:ICartProduct[], total:number} => {
    const { type, payload } = action;
    console.log(payload);
    switch (type) {
      case "addProduct":
        if(payload){
          return addProduct(payload.product, state);
        } else {return state}
      case "removeProduct":
        if(payload){
          return removeProduct(payload.product, state);
        } else {return state}
      case 'resetCart':
        return {products:[],total:0}
      default:
        return state;
    }
  };

  const [cartState, cartDispatch] = useReducer(cartReducer, { products: [], total: 0 });

  function addProduct(
    product: IProduct,
    state: { products: ICartProduct[]; total: number }
  ) {
    if (
      state.products.some(
        (cartProduct) => cartProduct.product._id === product._id
      )
    ) {
      return {
        products: state.products.map((cartProduct) => {
          if (
            cartProduct.product._id === product._id &&
            product.stock > cartProduct.quantity
          ) {
            return { ...cartProduct, quantity: cartProduct.quantity + 1 };
          } else {
            return cartProduct;
          }
        }),
        total: state.total + product.price,
      };
    } else {
      return {
        products: [...state.products, { product: product, quantity: 1 }],
        total: Math.round((state.total + product.price) * 100) / 100,
      };
    }
  }
  function removeProduct(
    product: IProduct,
    state: { products: ICartProduct[]; total: number }
  ) {
    if (
      state.products.some(
        (cartProduct) => cartProduct.product._id === product._id
      )
    ) {
      return {
        products: state.products
          .map((cartProduct) => {
            if (cartProduct.product._id === product._id) {
              if (cartProduct.quantity > 1) {
                return { ...cartProduct, quantity: cartProduct.quantity - 1 };
              } else {
                return undefined;
              }
            } else {
              return cartProduct;
            }
          })
          .filter((cartProduct) => cartProduct !== undefined),
        total: Math.round((state.total - product.price) * 100) / 100,
      };
    } else {
      return { products: [], total: 0 }
    }
  }

  return (
    <CartContext.Provider
      value={{ cartDispatch, cartState }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
