import { ChangeEvent, useState } from "react";
import { ProductItem } from "../../components/ProductItem";
import { Input } from "../../components/Input";
import useProductsQuery from "../../actions/querys/useProductsQuery";
import { Loader } from "../../components/Loader";
import { useDebounce } from "../../hooks/useDebounce";
import { FaCircleXmark } from "react-icons/fa6";

const Products = () => {
  const [search, setSearch] = useState("");

  const searchWithDelay = useDebounce(search, 500);
  const { data, isLoading, error } = useProductsQuery(searchWithDelay);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!data || (data.length === 0 && search.length > 1)) {
      if (e.currentTarget.value.length > search.length) {
        return;
      }
    }
    const value = e.currentTarget.value;
    setSearch(value);
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <div className="flex gap-4 items-center pb-2">
        <Input
          type="text"
          name="search"
          onChange={handleSearch}
          value={search || ""}
          autoFocus
          placeholder="Search..."
          className="text-white placeholder:text-white bg-black"
        ></Input>
        <FaCircleXmark
          color="white"
          className="hover:cursor-pointer"
          onClick={() => {
            setSearch("");
          }}
        ></FaCircleXmark>
      </div>
      <div className="flex gap-4 flex-wrap py-4">
        {!data || data.length === 0 ? (
          <div className="text-primary">
            There is not product here with this search...
          </div>
        ) : (
          data.map((product) => {
            return <ProductItem key={product._id} product={product} />;
          })
        )}
      </div>
    </div>
  );
};

export { Products };
