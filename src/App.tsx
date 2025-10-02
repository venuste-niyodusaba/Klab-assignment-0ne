import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";

import LayoutHandling from "./layout";
import Home from "./components/home";
import LoginModal from "./components/login";
import RegisterModal from "./components/registe"; // fixed typo
import CartPage from "./components/CartPage";
import WishlistPage from "./components/WishlistPage";
import CheckoutPage from "./components/CheckoutPage";
import Shop from "./components/Shop";
import Blog from "./components/Blogs";
import Elements from "./components/Elements";
import ForgotPassword from "./components/forgetpassword";

import DashBoardLayout from "./dashboard/dashboardlayout";
import DashBoard from "./dashboard/dashboard";
import { Product } from "./dashboard/product";
import Orders from "./dashboard/orders";
import Customer from "./dashboard/customer";
import Discount from "./dashboard/discount";
import Report from "./dashboard/report";
import Setting from "./dashboard/setting";
import Help from "./dashboard/help";

import { CartProvider } from "./components/CartContext";
import { WishlistProvider } from "./components/WishlistContext";
import { AuthProvider } from "./components/AuthContext";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Routes>
              {/* Public & Main Layout Routes */}
              <Route path="/" element={<LayoutHandling />}>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="login" element={<LoginModal />} />
                <Route path="register" element={<RegisterModal />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="help" element={<Help />} />
                <Route
                  path="checkout"
                  element={
                    <RequireAuth>
                      <CheckoutPage />
                    </RequireAuth>
                  }
                />
                <Route path="shop" element={<Shop />} />
                <Route path="blog" element={<Blog />} />
                <Route path="elements" element={<Elements />} />
              </Route>

              {/* Dashboard Routes */}
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <DashBoardLayout />
                  </RequireAuth>
                }
              >
                <Route index element={<DashBoard />} />
                <Route path="products" element={<Product />} />
                <Route path="orders" element={<Orders />} />
                <Route path="customers" element={<Customer />} />
                <Route path="discounts" element={<Discount />} />
                <Route path="reports" element={<Report />} />
                <Route path="settings" element={<Setting />} />
                <Route path="help" element={<Help />} />
              </Route>

              {/* Catch-all route for 404 */}
              <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
