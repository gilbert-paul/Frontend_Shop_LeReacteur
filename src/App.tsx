import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Header } from "./components/Header";
import { Login } from "./pages/users/Login";
import { Signup } from "./pages/users/Signup";
import { Products } from "./pages/products/Products";
import { Product } from "./pages/products/Product";
import { Cart } from "./pages/cart/Cart";
import { Payment } from "./pages/payment/Payment";
import { Admin } from "./pages/admin/Admin";
import { useAuthContext } from "./contexts/Auth/useAuthContext";

function App() {
  const { auth } = useAuthContext();
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/signup" element={<Signup />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        {auth?.token && <Route path="/payment" element={<Payment />} />}
        {auth?.admin && <Route path="/admin" element={<Admin />} />}
      </Routes>
    </Router>
  );
}

export default App;
