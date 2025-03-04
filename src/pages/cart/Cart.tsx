import { useNavigate } from "react-router-dom";
import { ProductItem } from "../../components/ProductItem";
import { useCartContext } from "../../contexts/Cart/useCartContext";
import { useAuthContext } from "../../contexts/Auth/useAuthContext";

const Cart = ({isPaymentView}:{isPaymentView?:boolean}) => {
  const { cartState } = useCartContext();
  const {auth} = useAuthContext()
  const navigate = useNavigate()
  return (
    <div>
      <div>Cart :</div>
      <div>Total amount: {cartState.total}</div>
      {!isPaymentView &&
      <button disabled={!auth?.token} onClick={()=>{navigate('/payment')}}>
        Payment {auth?.token ? null : ' - You need to be connected'}
      </button>
      }
      <div>
        {cartState.products.map((cartProduct) => {
          return <div key={cartProduct.product._id}>{cartProduct.product.title} - {cartProduct.quantity}
          <div><ProductItem product={cartProduct.product} isCartView={true}></ProductItem></div></div>;
        })}
      </div>
    </div>
  );
};

export { Cart };
