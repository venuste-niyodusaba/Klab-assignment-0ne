import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import LayoutHandling from "./layout";
import Home from "./components/home";
import LoginModal from "./components/login";
import ProductPage from "./components/shooping";
import { CartProvider } from "./components/CartContext";
import Home2 from "./components/home2";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutHandling />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route
              path="login"
              element={<LoginModal onClose={() => window.history.back()} />}
            />
            <Route path="shooping" element={<ProductPage />} />
            <Route path="home2" element={<Home2/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App