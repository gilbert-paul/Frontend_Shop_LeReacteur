import { useCartContext } from "../contexts/Cart/useCartContext";
import { FaHamburger } from "react-icons/fa";

import { useState } from "react";
import { Navigation } from "./Navigation";

const Header = () => {
  const { cartState } = useCartContext();

  const [menuIsVisible, setMenuIsVisible] = useState(false);

  return (
    <div className="h-20 bg-primary flex items-center justify-end px-6 w-full fixed top-0 z-50 border-b-4 border-b-secondary">
      <div className="px-4 py-3 border border-grey mr-auto">
        Total in your cart:{" "}
        <span className="font-bold">{cartState.total} €</span>
      </div>
      <Navigation className="hidden md:flex gap-4 justify-center items-center" />
      <div className="flex md:hidden gap-4 justify-center items-center relative">
        <button
        className="py-2 hover:cursor-pointer"
          onClick={() => {
            setMenuIsVisible((prev) => !prev);
          }}
        >
          <FaHamburger />
        </button>
        {menuIsVisible && (
          <div className="bg-secondary absolute p-4 right-0 top-full">
            <Navigation onClick={()=>{setMenuIsVisible(false)}} className="flex-col gap-4 justify-center items-center" isListView={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export { Header };
