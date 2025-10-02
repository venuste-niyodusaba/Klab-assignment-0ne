import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingCart, User, LogOut, Copy, FolderOpen, Mail, Menu, X } from "lucide-react";
import { useCart, type CartItem } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { useAuth } from "./AuthContext";

const NavbarPage = () => {
  const [visible, setVisible] = useState(true); 
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cart, clearCart } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "auto";
  }, [cartOpen]);

  const handleLogout = () => {
    logout();
    clearCart();
    navigate("/");
  };

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/shop", label: "SHOP" },
    { path: "/pages", label: "PAGES" },
    { path: "/blog", label: "BLOG" },
    { path: "/elements", label: "ELEMENTS" },
    { path: "/shopping", label: "BUY NOW" },
  ];

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "FRW" }).format(price);

  return (
    <div className="w-full z-50 relative">
      {/* Top Banner */}
      {visible && (
        <div className="bg-black text-white w-full flex justify-center items-center px-6 py-2 text-sm relative">
          <p>SUMMER SALE, Get 40% Off for all products.</p>
          <button className="ml-4 bg-yellow-400 text-black px-3 py-1 font-semibold rounded">Click Here</button>
          <button onClick={() => setVisible(false)} aria-label="Close Banner" className="absolute right-6 text-xl font-bold">
            ×
          </button>
        </div>
      )}

      {/* Top Info */}
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
          <NavLink to="/blog" className="flex items-center gap-1"><FolderOpen size={12} /> BLOG</NavLink>
          <NavLink to="/faq" className="flex items-center gap-1"><Copy size={12} /> FAQ</NavLink>
          <NavLink to="/help" className="flex items-center gap-1"><Mail size={12} /> CONTACT US</NavLink>
        </div>
      </div>

      {/* User / Mobile */}
      <div className="w-full flex justify-between items-center px-6 py-2 bg-yellow-400">
        <div className="hidden md:flex items-center gap-6 flex-grow justify-end text-black">
          {user ? (
            <button onClick={handleLogout} className="flex items-center gap-1">
              <LogOut size={22} /> Logout
            </button>
          ) : (
            <Link to="/login" className="flex items-center gap-1"><User size={22} /> LOGIN</Link>
          )}

          <Link to="/wishlist" className="relative flex items-center gap-1">
            <Heart size={22} />
            <span className="absolute -top-2 -right-2 bg-white text-xs text-yellow-600 font-bold rounded-full px-1">
              {wishlist.length}
            </span>
          </Link>

          <button
            className="relative flex items-center gap-1"
            onClick={() => (user ? setCartOpen(true) : navigate("/login"))}
            aria-label="Open Cart"
          >
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-white text-xs text-yellow-600 font-bold rounded-full px-1">
              {totalItems}
            </span>
          </button>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Mobile Menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Search */}
      <div className="bg-white px-6 py-2 border-b">
        <div className="flex w-full max-w-4xl mx-auto justify-start items-center">
          <input
            type="text"
            placeholder="Search for products, categories, brands, sku..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button className="bg-yellow-400 px-4 py-2 rounded-r-md text-black font-bold"><Search /></button>
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex w-full border-b bg-white">
        <div className="flex items-center gap-10 px-6 py-3 font-semibold text-sm">
          {navLinks.map((link, idx) => (
            <NavLink key={idx} to={link.path} className={({ isActive }) => (isActive ? "text-yellow-400" : "")}>
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <ul className="flex flex-col p-4 gap-4 font-semibold text-sm">
            {navLinks.map((link, idx) => (
              <NavLink key={idx} to={link.path} onClick={() => setMobileOpen(false)}>
                {link.label}
              </NavLink>
            ))}
          </ul>
        </div>
      )}

      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">My Cart</h2>
          <button onClick={() => setCartOpen(false)}>×</button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[70%]">
          {cart.length === 0 ? (
            <p className="text-sm text-gray-500">{user ? "Your cart is empty." : "Login to see your cart."}</p>
          ) : (
            cart.map((item: CartItem) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-bold text-sm">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && user && (
          <div className="absolute bottom-0 w-full p-4 border-t bg-white">
            <div className="flex justify-between font-bold mb-2">
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {subtotal < 200 && (
              <p className="text-sm text-gray-500 mb-2">
                Spend {formatPrice(200 - subtotal)} to get free shipping
              </p>
            )}
            <Link to="/cart" onClick={() => setCartOpen(false)}>
              <button className="w-full bg-black text-white py-2 rounded mb-2">View Cart</button>
            </Link>
            <Link to="/checkout" onClick={() => setCartOpen(false)}>
              <button className="w-full bg-yellow-400 text-black py-2 rounded">Checkout</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarPage;
