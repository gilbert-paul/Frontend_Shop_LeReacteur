import { useNavigate } from "react-router-dom";
import { ProductItem } from "../../components/ProductItem";
import { useCartContext } from "../../contexts/Cart/useCartContext";
import { useAuthContext } from "../../contexts/Auth/useAuthContext";

const Cart = ({ isPaymentView }: { isPaymentView?: boolean }) => {
  const { cartState } = useCartContext();
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-secondary p-4 flex flex-col gap-2">
        <div className="text-xl font-bold">Cart:</div>
        <div>Total amount: {cartState.total} €</div>
        {!isPaymentView && (
          <div className="flex gap-2 items-center">
            <button
              className="bg-black text-secondary py-2 px-4 disabled:opacity-40 hover:cursor-pointer hover:opacity-50"
              disabled={!auth?.token || cartState.products.length === 0}
              onClick={() => {
                navigate("/payment");
              }}
            >
              Payment
            </button>
            {!auth?.token && (
              <>
                <span className="italic">
                  You need to be connected to proccess payment
                </span>
                <button
                  className="bg-black text-secondary py-2 px-4 disabled:opacity-40 hover:cursor-pointer hover:opacity-50"
                  onClick={() => {
                    navigate("/users/login");
                  }}
                >
                  Login
                </button>
              </>
            )}
            {auth?.token && cartState.products.length === 0 && (
              <span className="italic">
                You cannot proccess to payment with an empty cart
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="bg-secondary p-4 flex flex-col gap-2">
          <span className="text-xl font-bold">Summary:</span>
          {cartState.products.length === 0 && (
            <div className="italic">There is not product in your cart...</div>
          )}
        </div>
        {cartState.products.length > 0 && (
          <div className="flex gap-4 flex-wrap  mt-2">
            {cartState.products.map((cartProduct) => {
              return (
                <ProductItem
                  key={cartProduct.product._id}
                  product={cartProduct.product}
                ></ProductItem>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export { Cart };
