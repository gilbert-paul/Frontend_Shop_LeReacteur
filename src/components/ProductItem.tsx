import { useNavigate } from "react-router-dom";
import { IProduct } from "../interfaces/IProduct";
import { useCartContext } from "../contexts/Cart/useCartContext";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { useBreakpoints } from "../hooks/useBreakPoints";
import { useMemo } from "react";

const ProductItem = ({ product }: { product: IProduct }) => {
  const navigate = useNavigate();
  const { cartState, cartDispatch } = useCartContext();

  const breakpoints = {
    xxs: 420,
    xs: 560,
    sm: 768,
    lg: 2400,
  };
  const size = useBreakpoints(breakpoints);

  const hasThisProductInCart = cartState.products.find(
    (cartProduct) => cartProduct.product._id === product._id
  );

  const width = useMemo(() => {
    if (size === "xxs") {
      return "100%";
    }
    if (size === "xs") {
      return "calc(100% / 2 - 16px / 2)";
    }
    if (size === "sm") {
      return "calc(100% / 3 - 32px / 3)";
    }
    if (size === "lg") {
      return "calc(100% / 5 - 64px / 5)";
    }
  }, [size]);

  return (
    <div
      className="p-4 group flex flex-col justify-between bg-white"
      style={{ width: width }}
    >
      <div className="border bg-white border-secondary overflow-hidden relative">
        <img
          className="bg-white object-contain group-hover:scale-200 transition-all duration-300"
          src={product.thumbnail}
          alt="product_image"
        />
        <span className="absolute z-10 text-center text-white text-xs left-2 top-2 bg-black p-1">
          SALE {product.discountPercentage}%
        </span>
        <div className="absolute hidden group-hover:flex z-20 gap-2 w-full justify-center bottom-4 transition-all duration-300">
          <div
            className={`bg-white rounded-full w-8 h-8 flex justify-center items-center hover:text-secondary ${
              hasThisProductInCart && "group-hover:cursor-pointer"
            }`}
            onClick={() => {
              if (hasThisProductInCart) {
                cartDispatch({
                  type: "removeProduct",
                  payload: { product: product },
                });
              }
            }}
          >
            {hasThisProductInCart ? (
              <FaMinus size={12} />
            ) : (
              <FaMinus size={12} opacity={0.2} className="text-grey" />
            )}
          </div>
          <div
            className="bg-white rounded-full w-8 h-8 flex justify-center font-bold items-center text-secondary
            "
          >
            <span>
              {hasThisProductInCart ? hasThisProductInCart.quantity : 0}
            </span>
          </div>
          <div
            className={`bg-white rounded-full w-8 h-8 flex justify-center items-center hover:text-secondary ${
              hasThisProductInCart?.quantity !== product.stock &&
              "group-hover:cursor-pointer"
            }`}
            onClick={() => {
              if (hasThisProductInCart?.quantity !== product.stock) {
                cartDispatch({
                  type: "addProduct",
                  payload: { product: product },
                });
              }
            }}
          >
            {hasThisProductInCart?.quantity !== product.stock ? (
              <FaPlus size={12} />
            ) : (
              <FaPlus size={12} opacity={0.2} className="text-grey" />
            )}
          </div>
        </div>
        <div className="group-hover:bg-black opacity-40 w-full h-full top-0 absolute transition-all duration-300"></div>
      </div>
      <div>
        <div className="flex flex-col items-center">
          <span className="group-hover:text-secondary text-center uppercase font-bold text-md">
            {product.title}
          </span>
          <span className="text-grey uppercase flex items-center gap-1">
            <span className="line-through text-sm">
              {Math.round(
                ((product.price * product.discountPercentage) / 100 +
                  product.price) *
                  100
              ) / 100}{" "}
              €
            </span>
            <span className="font-bold text-sm">{product.price} €</span>
          </span>
        </div>
        <div className="flex justify-center items-center flex-col gap-2 p-2 md:text-xs lg:text-base">
          <span className="italic">Cart quantity:</span>

          <div className="flex z-20 gap-2 w-full justify-center bottom-4 transition-all duration-300">
            {size !== 'lg' && <div
              className={`bg-white rounded-full w-8 h-8 flex justify-center items-center hover:text-secondary ${
                hasThisProductInCart && "group-hover:cursor-pointer"
              }`}
              onClick={() => {
                if (hasThisProductInCart) {
                  cartDispatch({
                    type: "removeProduct",
                    payload: { product: product },
                  });
                }
              }}
            >
              {hasThisProductInCart ? (
                <FaMinus size={12} />
              ) : (
                <FaMinus size={12} opacity={0.2} className="text-grey" />
              )}
            </div>}
            <div
              className="bg-white rounded-full w-8 h-8 flex justify-center font-bold items-center text-secondary
            "
            >
              <span>
                {hasThisProductInCart ? hasThisProductInCart.quantity : 0}
              </span>
            </div>
            {size !== 'lg' && <div
              className={`bg-white rounded-full w-8 h-8 flex justify-center items-center hover:text-secondary ${
                hasThisProductInCart?.quantity !== product.stock &&
                "group-hover:cursor-pointer"
              }`}
              onClick={() => {
                if (hasThisProductInCart?.quantity !== product.stock) {
                  cartDispatch({
                    type: "addProduct",
                    payload: { product: product },
                  });
                }
              }}
            >
              {hasThisProductInCart?.quantity !== product.stock ? (
                <FaPlus size={12} />
              ) : (
                <FaPlus size={12} opacity={0.2} className="text-grey" />
              )}
            </div>}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            className="bg-secondary p-2 hover:cursor-pointer"
            onClick={() => {
              navigate(`/products/${product._id}`);
            }}
          >
            More details
          </button>
        </div>
      </div>
    </div>
  );
};

export { ProductItem };
