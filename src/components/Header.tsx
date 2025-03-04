import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/Auth/useAuthContext";
import { useCartContext } from "../contexts/Cart/useCartContext";

const Header = () => {
  const { auth, removeAuth } = useAuthContext();
  const {cartState} = useCartContext()

  return (
    <div>
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart - total amount : {cartState.total} €</Link>
        {auth?.token && <Link to="/payment">Payment</Link>}
        {auth?.admin && <Link to="/admin">Admin</Link>}
        {!auth?.token ? (
          <>
            <Link to="/users/signup">Sign Up</Link>
            <Link to="/users/login">Login</Link>
          </>
        ) : (
          <button onClick={removeAuth}>Disconnect</button>
        )}
      </nav>
    </div>
  );
};

export { Header };
