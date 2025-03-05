import { ChangeEvent, useState } from "react";
import { Input } from "../../components/Input";
import { useAuthContext } from "../../contexts/Auth/useAuthContext";
import { useCartContext } from "../../contexts/Cart/useCartContext";
import { Cart } from "../cart/Cart";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../../query/queryClient";
import { ICartProduct } from "../../interfaces/ICart";

const Payment = () => {
  const { cartState, cartDispatch } = useCartContext();
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  const [address, setAddress] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const createOrderMutation = useMutation<
    void,
    Error,
    {
      cart: { products: ICartProduct[]; total: number };
      address: string;
      authToken: string;
    }
  >({
    mutationFn: async ({ cart, address, authToken }) => {
      await axios.post(
        `${import.meta.env.VITE_APP_BACK_URL}/orders`,
        {
          products: cart.products,
          adress: address,
          price: cart.total,
        },
        { headers: { Authorization: "Bearer " + authToken } }
      );
      setMessage("Your payment is waiting from an admin verification !");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleAddress = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setAddress(value);
  };

  const handleSubmit = () => {
    if (auth?.token && address && cartState.products.length > 0) {
      createOrderMutation.mutate({
        cart: cartState,
        address: address,
        authToken: auth.token,
      });
      setMessage("proccess");
      cartDispatch({ type: "resetCart" });
    }
  };

  if (message) {
    return (
      <div className="text-primary flex justify-center items-center flex-col gap-4">
        {message}
        <button
          className="text-black bg-primary border-1 py-3 px-4 hover:cursor-pointer hover:bg-gold hover:opacity-80"
          onClick={() => {
            navigate("/products");
          }}
        >
          See all products
        </button>
      </div>
    );
  }
  return (
    <div className="">
      {message || (
        <div className="flex flex-col-reverse gap-4 xl:flex-row">
          <div className="xl:w-[75%]">
            <Cart isPaymentView={true}></Cart>
          </div>
          <div className="flex flex-col gap-4 justify-start items-start xl:items-center bg-secondary p-4">
            <div className="w-full font-bold">Add your address payment:</div>
            <Input
              type="text"
              placeholder="Address"
              name="address"
              onChange={handleAddress}
              className="border-b-black"
            />
            <button
              className="bg-primary border-1 py-2.5 px-4 hover:cursor-pointer hover:bg-primary hover:opacity-80 disabled:opacity-50"
              disabled={!address || cartState.products.length === 0}
              onClick={handleSubmit}
            >
              Payment
            </button>
            {!address &&
              typeof address === "string" &&
              cartState.products.length > 0 && (
                <span className="text-red-600">
                  Address input cannot be empty...
                </span>
              )}
            {cartState.products.length === 0 && message !== "proccess" && (
              <span className="text-red-600">You need products to pay...</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export { Payment };
