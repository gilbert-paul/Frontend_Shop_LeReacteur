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
  const navigate = useNavigate()

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
        setMessage(message);
        cartDispatch({ type: "resetCart" });
    }
  };

  if(message){
    return <div>
      {message}
      <button onClick={()=>{setMessage('');navigate('/products')}}>See all products</button>
    </div>
  }
  return (
    <div>
      Payment
      {message || (
        <div className="flex">
          <div className="w-full">
            <Cart isPaymentView={true}></Cart>
          </div>
          <div className="w-[20%]">
            <div>Adress:</div>
            <Input
              type="text"
              placeholder="Address"
              name="address"
              onChange={handleAddress}
            />
            <button disabled={!address} onClick={handleSubmit}>Payment</button>
            {!address && typeof address === 'string' && <div>Input is empty... !</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export { Payment };
