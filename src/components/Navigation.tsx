import { FaHome, FaGift, FaUserPlus, FaUserLock } from "react-icons/fa";
import {
  FaCartShopping,
  FaCircleDollarToSlot,
  FaUnlockKeyhole,
  FaUserXmark,
} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/Auth/useAuthContext";

const Navigation = ({
  className,
  isListView,
  onClick
}: {
  className: string;
  isListView?: boolean;
  onClick?:()=>void
}) => {
  const { auth, removeAuth } = useAuthContext();
  const navigate = useNavigate();
  return (
    <nav className={className}>
      <Link
        className={`flex  hover:cursor-pointer ${
          isListView
            ? "flex-row gap-2 items-center justify-start hover:text-primary"
            : "flex-col justify-center items-center hover:text-secondary"
        }`}
        onClick={onClick} to="/"
      >
        <FaHome />
        Home
      </Link>
      <Link
        className={`flex  hover:cursor-pointer ${
          isListView
            ? "flex-row gap-2 items-center justify-start hover:text-primary"
            : "flex-col justify-center items-center hover:text-secondary"
        }`}
        onClick={onClick} to="/products"
      >
        <FaGift />
        Products
      </Link>
      <Link
        className={`flex  hover:cursor-pointer ${
          isListView
            ? "flex-row gap-2 items-center justify-start hover:text-primary"
            : "flex-col justify-center items-center hover:text-secondary"
        }`}
        onClick={onClick} to="/cart"
      >
        <FaCartShopping /> <span>Cart </span>
      </Link>
      {auth?.token && (
        <Link
          className={`flex  hover:cursor-pointer ${
            isListView
              ? "flex-row gap-2 items-center justify-start hover:text-primary"
              : "flex-col justify-center items-center hover:text-secondary"
          }`}
          onClick={onClick} to="/payment"
        >
          <FaCircleDollarToSlot />
          <span>Payment</span>
        </Link>
      )}
      {auth?.admin && (
        <Link
          className={`flex  hover:cursor-pointer ${
            isListView
              ? "flex-row gap-2 items-center justify-start hover:text-primary"
              : "flex-col justify-center items-center hover:text-secondary"
          }`}
          onClick={onClick} to="/admin"
        >
          <FaUnlockKeyhole />
          <span>Admin</span>
        </Link>
      )}
      {!auth?.token ? (
        <>
          <Link
            className={`flex  hover:cursor-pointer ${
              isListView
                ? "flex-row gap-2 items-center justify-start hover:text-primary"
                : "flex-col justify-center items-center hover:text-secondary"
            }`}
            onClick={onClick} to="/users/signup"
          >
            <FaUserPlus />
            Sign Up
          </Link>
          <Link
            className={`flex  hover:cursor-pointer ${
              isListView
                ? "flex-row gap-2 items-center justify-start hover:text-primary"
                : "flex-col justify-center items-center hover:text-secondary"
            }`}
            onClick={onClick} to="/users/login"
          >
            <FaUserLock /> Login
          </Link>
        </>
      ) : (
        <button
          className={`flex  hover:cursor-pointer ${
            isListView
              ? "flex-row gap-2 items-center justify-start hover:text-primary"
              : "flex-col justify-center items-center hover:text-secondary"
          }`}
          onClick={() => {
            removeAuth();
            navigate("/");
          }}
        >
          <FaUserXmark />
          <span>Disconnect</span>
        </button>
      )}
    </nav>
  );
};

export { Navigation };
