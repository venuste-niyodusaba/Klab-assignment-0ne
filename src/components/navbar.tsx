import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Copy,
  FolderOpen,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { useCart } from "./CartContext";


function NavbarPage() {
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="w-full z-50 relative">
      {/* Promo Bar */}
      {visible && (
        <div className="bg-black text-white w-full flex justify-center items-center px-6 py-2 text-sm relative">
          <p>SUMMER SALE, Get 40% Off for all products.</p>
          <button className="ml-4 bg-yellow-400 text-black px-3 py-1 font-semibold rounded">
            Click Here
          </button>
          <button
            onClick={() => setVisible(false)}
            className="absolute right-6 text-xl font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Top Info Bar */}
      <div className="bg-yellow-400 hidden md:flex justify-between items-center px-6 py-2 text-sm text-black">
        <div className="flex gap-6">
          <select className="bg-yellow-400 outline-none">
            <option>ENGLISH</option>
            <option>US</option>
          </select>
          <select className="bg-yellow-400 outline-none">
            <option>$ DOLLAR (US)</option>
            <option>FR Rwandan</option>
          </select>
        </div>
        <div className="flex gap-6">
          <span>WELCOME TO OUR STORE!</span>
          <NavLink to="/blog" className="flex items-center gap-1">
            <FolderOpen size={12} /> BLOG
          </NavLink>
          <NavLink to="/faq" className="flex items-center gap-1">
            <Copy size={12} /> FAQ
          </NavLink>
          <NavLink to="/contact" className="flex items-center gap-1">
            <Mail size={12} /> CONTACT US
          </NavLink>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full flex justify-between items-center px-6 py-3 bg-yellow-400">
        {/* Logo */}
        <Link to="/">
          
        </Link>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-6 text-black">
          <Link to="/account">
            <User size={22} />
          </Link>
          <Link to="/wishlist" className="relative">
            <Heart size={22} />
            <span className="absolute -top-2 -right-2 bg-white text-xs text-yellow-600 font-bold rounded-full px-1">
              0
            </span>
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-white text-xs text-yellow-600 font-bold rounded-full px-1">
              {totalItems}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Search Bar (Always Visible) */}
      <div className="bg-white px-6 py-2 border-b">
        <div className="flex items-center w-full max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search for products, categories, brands, sku..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button className="bg-yellow-400 px-4 py-2 rounded-r-md text-black font-bold">
            <Search />
          </button>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex w-full border-b bg-white px-6">
        <div className="flex items-center gap-10 px-6 py-3 font-semibold text-sm">
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/shop">SHOP</NavLink>
          <NavLink to="/pages">PAGES</NavLink>
          <NavLink to="/blog">BLOG</NavLink>
          <NavLink to="/elements">ELEMENTS</NavLink>
          <NavLink to="/buy">BUY NOW</NavLink>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <ul className="flex flex-col p-4 gap-4 font-semibold text-sm">
            <NavLink to="/" onClick={() => setMobileOpen(false)}>
              HOME
            </NavLink>
            <NavLink to="/shop" onClick={() => setMobileOpen(false)}>
              SHOP
            </NavLink>
            <NavLink to="/pages" onClick={() => setMobileOpen(false)}>
              PAGES
            </NavLink>
            <NavLink to="/blog" onClick={() => setMobileOpen(false)}>
              BLOG
            </NavLink>
            <NavLink to="/elements" onClick={() => setMobileOpen(false)}>
              ELEMENTS
            </NavLink>
            <NavLink to="/buy" onClick={() => setMobileOpen(false)}>
              BUY NOW
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavbarPage;
