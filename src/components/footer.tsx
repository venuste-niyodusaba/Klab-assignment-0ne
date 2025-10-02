import { NavLink } from "react-router-dom";
import { Home, Heart, ShoppingCart, User } from "lucide-react";

function Footer() {
  return (
    <>
      <footer className="bg-gray-100 border-t mt-12 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">kapee.</h2>
            <p className="text-sm text-gray-600 mt-3">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li className="cursor-pointer">Lorem Ipsum, 2046 Lorem Ipsum</li>
              <li className="cursor-pointer">576-245-2478</li>
              <li className="cursor-pointer">info@kapee.com</li>
              <li className="cursor-pointer">Mon - Fri / 9:00 AM - 6:00 PM</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">INFORMATION</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="cursor-pointer">About Us</li>
              <li className="cursor-pointer">Store Location</li>
              <li className="cursor-pointer">Contact Us</li>
              <li className="cursor-pointer">Shipping & Delivery</li>
              <li className="cursor-pointer">Latest News</li>
              <li className="cursor-pointer">Our Sitemap</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">OUR SERVICE</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="cursor-pointer">Privacy Policy</li>
              <li className="cursor-pointer">Terms of Sale</li>
              <li className="cursor-pointer">Customer Service</li>
              <li className="cursor-pointer">Delivery Information</li>
              <li className="cursor-pointer">Payments</li>
              <li className="cursor-pointer">Saved Cards</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">MY ACCOUNT</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="cursor-pointer">My Account</li>
              <li className="cursor-pointer">My Shop</li>
              <li className="cursor-pointer">Checkout</li>
              <li className="cursor-pointer">My Wishlist</li>
              <li className="cursor-pointer">Tracking Order</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">NEWSLETTER</h3>
            <p className="text-sm text-gray-600 mb-3">
              Subscribe to our mailing list to get the new updates!
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full W-[20rem] h-[2rem] text-sm border rounded outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="bg-black h-[2rem] w-[13rem] text-yellow-500 rounded text-sm font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t py-4 text-center text-sm text-gray-500">
          Kapee © 2025 by PressLayouts All Rights Reserved.
        </div>
      </footer>
      <footer className="fixed bottom-0 w-full bg-white border-t flex justify-around py-2 text-gray-600 text-xs md:hidden">
        <NavLink to="/" className="flex flex-col items-center  hover:text-yellow-400">
          <Home className="h-5 w-5" />
          <span>Shop</span>
        </NavLink>
        <NavLink to="/wishlist" className="flex flex-col items-center hover:text-yellow-400">
          <Heart className="h-5 w-5" />
          <span>Wishlist</span>
        </NavLink>
        <NavLink to="/cart" className="flex flex-col items-center  hover:text-yellow-400">
          <ShoppingCart className="h-5 w-5" />
          <span>Cart</span>
        </NavLink>
        <NavLink to="/login" className="flex flex-col items-center  hover:text-yellow-400">
          <User  className="h-5 w-5" />
          <span>Account</span>
        </NavLink>
      </footer>
    </>
  );
}

export default Footer;
