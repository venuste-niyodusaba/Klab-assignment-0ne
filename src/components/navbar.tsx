import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Search, Heart, ShoppingCart,User, } from "lucide-react";

function NavbarPage() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="w-full z-50 relative">
      {visible && (
        <div className="bg-black text-white w-full flex justify-center items-center px-6 py-4 text-sm relative">
          <p>SUMMER SALE, Get 40% Off for all products.</p>
          <button className="ml-4 bg-yellow-400 text-white px-3 py-1 font-semibold rounded">
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
      <div className="bg-yellow-400 w-full flex justify-between items-center px-6 py-2 text-sm text-black">
        <div className="flex gap-6">
          <span>ENGLISH ⌄</span>
          <span>$ DOLLAR (US) ⌄ </span>
        </div>
        <div className="flex gap-6">
          <span>WELCOME TO OUR STORE!</span>
          <NavLink to="/blog">BLOG</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
          <NavLink to="/contact">CONTACT US</NavLink>
        </div>
      </div>
      <div className="w-full border-b flex justify-between items-center px-6 py-4">
        <h1 className="text-3xl font-bold text-gray-800">kapee.</h1>
        <div className="flex items-center w-1/2">
          <input
            type="text"
            placeholder="Search for products, categories, brands, sku..."
            className="flex-1 border h-12 w-10   focus:outline-none"
          />
          <select className="border px-2 py-3">
            <option>All Categories</option>
            <option>Accessories</option>
            <option>Bags and Backpacks</option>
            <option>Men</option>
            <option>Shoes</option>
            <option>Women</option>
          </select>
          <button className="bg-black px-4 py-3 rounded-r-md flex items-center justify-center hover:bg-yellow-400">
            <Search className="h-7 w-7 text-yellow-300" />
          </button>
        </div>
        <div className="flex items-center gap-6 text-sm "><User size={32} color="#fbe704" strokeWidth={2.75}/>
          <span>
            HELLO,{" "}
            <NavLink to="/login" className="font-bold">
              SIGN IN
            </NavLink>
          </span>
          <span><Heart size={16} className=" hover:boder-text-yellow-300"/>0</span>
          <span><ShoppingCart size={16}/> 0</span>
        </div>
      </div>
      <div className="w-full border-b bg-white flex items-center px-6 relative z-50">
        <div className="flex items-center gap-10 px-6 py-3 font-semibold text-sm flex-1 relative">
          <NavLink to="/">HOME</NavLink>
          <div className="relative group">
            <NavLink to="/shop">SHOP ⌄</NavLink>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg border mt-2 rounded w-40 z-50">
              <NavLink to="/shop/men" className="block px-4 py-2 hover:bg-gray-100">
                Men
              </NavLink>
              <NavLink to="/shop/women" className="block px-4 py-2 hover:bg-gray-100">
                Women
              </NavLink>
              <NavLink
                to="/shop/accessories"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Accessories
              </NavLink>
            </div>
          </div>
          <div className="relative group">
            <NavLink to="/pages">PAGES ⌄</NavLink>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg border mt-2 rounded w-40 z-50">
              <NavLink to="/about" className="block px-4 py-2 hover:bg-gray-100">
                About Us
              </NavLink>
              <NavLink
                to="/services"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Services
              </NavLink>
              <NavLink
                to="/contact"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Contact
              </NavLink>
            </div>
          </div>
          <NavLink to="/blog">BLOG</NavLink>
          <div className="relative group">
            <NavLink to="/elements">ELEMENTS ⌄</NavLink>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg border mt-2 rounded w-40 z-50">
              <NavLink
                to="/elements/buttons"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Buttons
              </NavLink>
              <NavLink
                to="/elements/forms"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Forms
              </NavLink>
              <NavLink
                to="/elements/cards"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Cards
              </NavLink>
            </div>
          </div>
          <NavLink to="/buy">BUY NOW</NavLink>
        </div>
      </div>
    </div>
  );
}

export default NavbarPage;
