import { useNavigate } from "react-router-dom";
import { IProduct } from "../interfaces/IProduct";
import { useCartContext } from "../contexts/Cart/useCartContext";

const ProductItem = ({
  product,
  isCartView,
}: {
  product: IProduct;
  isCartView?: boolean;
}) => {
  const navigate = useNavigate();
  const { cartState, cartDispatch } = useCartContext();

  const hasThisProductInCart = cartState.products.find(
    (cartProduct) => cartProduct.product._id === product._id
  );
  return (
    <div className="border" style={{width:'calc(100% / 5 - 64px / 5)'}}>
      Title : {product.title}
      {!isCartView && <div>Quantity: {product.stock}</div>}
      Price:{product.price}
      <img src={product.thumbnail} alt="product_image" />
      <div>
        <div>Add to cart :</div>
        <div>
          <button
            className="disabled:opacity-50"
            disabled={!hasThisProductInCart}
            onClick={() => cartDispatch({type:'removeProduct', payload:{product:product}})}
          >
            -
          </button>
          <span>
            {hasThisProductInCart ? hasThisProductInCart.quantity : 0}
          </span>
          <button
            className="disabled:opacity-50"
            disabled={hasThisProductInCart?.quantity === product.stock}
            onClick={() => cartDispatch({type:'addProduct', payload:{product:product}})}
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          navigate(`/products/${product._id}`);
        }}
      >
        More details
      </button>
    </div>
  );
};

export { ProductItem };
