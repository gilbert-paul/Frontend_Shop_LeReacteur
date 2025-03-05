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
import { Footer } from "./components/Footer";

function App() {
  const { auth } = useAuthContext();
  return (
    <Router>
      <Header />
      <div className="bg-black pt-6 absolute top-20 right-0 left-0 min-h-[calc(100%-80px)] flex flex-col justify-between">
        <div className="px-6 pb-6">
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
        </div>
      <Footer />
      </div>

    </Router>
  );
}

export default App;
