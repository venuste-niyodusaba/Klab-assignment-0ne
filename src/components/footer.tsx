import { NavLink } from "react-router-dom";
import { Home, Heart, ShoppingCart, User } from "lucide-react";

function Footer() {
  return (
    <>
      {/* Desktop / Tablet Footer */}
      <footer className="bg-gray-100 border-t mt-12 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">kapee.</h2>
            <p className="text-sm text-gray-600 mt-3">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>Lorem Ipsum, 2046 Lorem Ipsum</li>
              <li>576-245-2478</li>
              <li>info@kapee.com</li>
              <li>Mon - Fri / 9:00 AM - 6:00 PM</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">INFORMATION</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>About Us</li>
              <li>Store Location</li>
              <li>Contact Us</li>
              <li>Shipping & Delivery</li>
              <li>Latest News</li>
              <li>Our Sitemap</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">OUR SERVICE</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Privacy Policy</li>
              <li>Terms of Sale</li>
              <li>Customer Service</li>
              <li>Delivery Information</li>
              <li>Payments</li>
              <li>Saved Cards</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">MY ACCOUNT</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>My Account</li>
              <li>My Shop</li>
              <li>My Cart</li>
              <li>Checkout</li>
              <li>My Wishlist</li>
              <li>Tracking Order</li>
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
                className="w-full px-3 h-[2rem] text-sm border rounded outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="bg-black h-[2rem] w-[6rem] text-yellow-500 rounded text-sm font-semibold">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <div className="border-t py-4 text-center text-sm text-gray-500">
          Kapee © 2025 by PressLayouts All Rights Reserved.
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <footer className="fixed bottom-0 w-full bg-white border-t flex justify-around py-2 text-gray-600 text-xs md:hidden">
        <NavLink to="/" className="flex flex-col items-center">
          <Home className="h-5 w-5" />
          <span>Shop</span>
        </NavLink>
        <NavLink to="/wishlist" className="flex flex-col items-center">
          <Heart className="h-5 w-5" />
          <span>Wishlist</span>
        </NavLink>
        <NavLink to="/cart" className="flex flex-col items-center">
          <ShoppingCart className="h-5 w-5" />
          <span>Cart</span>
        </NavLink>
        <NavLink to="/account" className="flex flex-col items-center">
          <User className="h-5 w-5" />
          <span>Account</span>
        </NavLink>
      </footer>
    </>
  );
}

export default Footer;
