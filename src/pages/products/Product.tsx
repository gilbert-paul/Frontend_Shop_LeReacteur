import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import useProductQuery from "../../actions/querys/useProductQuery";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaStarHalfStroke, FaStar } from "react-icons/fa6";
import { useCartContext } from "../../contexts/Cart/useCartContext";

const Product = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useProductQuery(id?.toString() || "");
  const { cartState, cartDispatch } = useCartContext();

  const navigate = useNavigate();

  const hasThisProductInCart = cartState.products.find(
    (cartProduct) => cartProduct.product._id === data?._id
  );
  if (isLoading || !data) {
    return <Loader />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4 bg-white">
      <div className="flex flex-col lg:flex-row">
        <div className="w-60 self-center border border-secondary m-4">
          <img
            className="object-contain w-full"
            src={data.thumbnail}
            alt="productImage"
          />
        </div>
        <div className="flex flex-col gap-4 p-4">
          <span className="text-2xl">{data.title}</span>
          <div className="flex gap-4">
            <span className="flex gap-0.5 items-center">
              {[Math.round(data.rating * 10) / 10].map((rate) => {
                if (rate % 1 === 0) {
                  return [...Array(5)].map((_, i) => {
                    if (rate > i) {
                      return (
                        <FaStar
                          color="gold"
                          key={i}
                          stroke="black"
                          strokeWidth={6}
                        />
                      );
                    } else {
                      return (
                        <FaStar
                          color="black"
                          key={i}
                          stroke="black"
                          strokeWidth={6}
                        />
                      );
                    }
                  });
                } else {
                  return (
                    <>
                      {[...Array(5)].map((_, i) => {
                        if (rate >= i + 1) {
                          return (
                            <FaStar
                              key={i}
                              color="gold"
                              stroke="black"
                              strokeWidth={6}
                            />
                          );
                        }
                      })}
                      <FaStarHalfStroke
                        color="gold"
                        key={0}
                        stroke="black"
                        strokeWidth={6}
                      />
                      {[...Array(5)].map((_, i) => {
                        if (rate <= i) {
                          return (
                            <FaStar
                              stroke="black"
                              strokeWidth={6}
                              key={i}
                              color="white"
                            />
                          );
                        }
                      })}
                    </>
                  );
                }
              })}
              - {data.rating}
            </span>
            <span>{data.reviews.length} reviews</span>
          </div>
          <div>
            <span className="text-grey text-xl uppercase flex items-center gap-2">
              <span className="line-through text-md">
                {Math.round(
                  ((data.price * data.discountPercentage) / 100 + data.price) *
                    100
                ) / 100}{" "}
                €
              </span>
              <span className="font-bold">{data.price} €</span>
            </span>
          </div>
          <div className="text-grey italic">{data.description}</div>
          <div>{data.shippingInformation}</div>
          <div className="flex gap-2">
            <span className="text-secondary font-bold">Brand:</span>
            {data.brand}
          </div>
          <div className="flex gap-4">
            {data.tags.map((tag) => {
              return <span className="border border-grey p-1">{tag}</span>;
            })}
          </div>
          <div>
            <div className="flex gap-1 w-fit border border-grey items-center">
              <div className="p-2 bg-secondary border-r border-r-grey">
                Quantity in my cart:
              </div>
              <div
                className={`bg-white rounded-full w-8 h-8 flex justify-center items-center hover:text-secondary ${
                  hasThisProductInCart && "hover:cursor-pointer"
                }`}
                onClick={() => {
                  if (hasThisProductInCart) {
                    cartDispatch({
                      type: "removeProduct",
                      payload: { product: data },
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
                  hasThisProductInCart?.quantity !== data.stock &&
                  "hover:cursor-pointer"
                }`}
                onClick={() => {
                  if (hasThisProductInCart?.quantity !== data.stock) {
                    cartDispatch({
                      type: "addProduct",
                      payload: { product: data },
                    });
                  }
                }}
              >
                {hasThisProductInCart?.quantity !== data.stock ? (
                  <FaPlus size={12} />
                ) : (
                  <FaPlus size={12} opacity={0.2} className="text-grey" />
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2 w-fit border border-grey items-center">
            <div
              className="p-2 hover:bg-secondary hover:cursor-pointer"
              onClick={() => {
                navigate("/cart");
              }}
            >
              See my cart
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <span className="text-primary text-xl text-bold">Reviews:</span>
        <div className="flex flex-col gap-2">
          {data.reviews.map((review) => {
            return (
              <div className="border border-primary p-2">
                <span className="flex gap-0.5 items-center">
                  {[Math.round(review.rating * 10) / 10].map((rate) => {
                    if (rate % 1 === 0) {
                      return [...Array(5)].map((_, i) => {
                        if (rate > i) {
                          return (
                            <FaStar
                              color="gold"
                              key={i}
                              stroke="black"
                              strokeWidth={6}
                            />
                          );
                        } else {
                          return (
                            <FaStar
                              color="white"
                              key={i}
                              stroke="black"
                              strokeWidth={6}
                            />
                          );
                        }
                      });
                    } else {
                      return (
                        <>
                          {[...Array(5)].map((_, i) => {
                            if (rate > i) {
                              return (
                                <FaStar
                                  key={i}
                                  color="gold"
                                  stroke="black"
                                  strokeWidth={6}
                                />
                              );
                            }
                          })}
                          <FaStarHalfStroke
                            color="gold"
                            key={0}
                            stroke="black"
                            strokeWidth={6}
                          />
                          {[...Array(5)].map((_, i) => {
                            if (rate <= i) {
                              return (
                                <FaStar
                                  key={i}
                                  color="gold"
                                  stroke="black"
                                  strokeWidth={6}
                                />
                              );
                            }
                          })}
                        </>
                      );
                    }
                  })}
                  - {review.rating}
                </span>
                <div>
                  <span className="flex gap-2">
                    <span className="text-grey italic">Author:</span>
                    {review.reviewerName}
                  </span>
                  <span className="flex gap-2">
                    <span className="text-grey italic">Description:</span>
                    {review.comment}
                  </span>
                  <span className="flex gap-2 justify-self-end">
                    <span className="text-grey italic">Date:</span>
                    {new Date(review.date).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { Product };
