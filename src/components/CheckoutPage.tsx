import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { Notify } from "notiflix";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user, token, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const initialFormState = {
    firstName: user?.name.split(" ")[0] || "",
    lastName: user?.name.split(" ")[1] || "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: user?.email || "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      firstName: user?.name.split(" ")[0] || prev.firstName,
      lastName: user?.name.split(" ")[1] || prev.lastName,
      email: user?.email || prev.email,
    }));
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    logout();
    Notify.info("Logged out successfully.", { position: "center-top" });
    navigate("/");
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      Notify.failure("Please log in to place an order.", { position: "center-top" });
      navigate("/login");
      return;
    }

    const requiredFields = ["firstName", "lastName", "address", "city", "state", "zip", "phone", "email"];
    const emptyFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData].trim()
    );

    if (emptyFields.length > 0) {
      setError("Please fill in all required fields (*) before placing your order.");
      return;
    }

    try {
      
      await axios.post(
        "http://localhost:5175/api/orders/from-cart",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Notify.success("Order placed successfully! Thank you for your purchase.", {
        position: "center-top",
      });

      clearCart();
      setFormData(initialFormState);
      setError("");
      navigate("/");
    } catch (err: any) {
      Notify.failure(err.response?.data?.message || "Failed to place order.", {
        position: "center-top",
      });
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 500;
  const total = subtotal + shipping;

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-500 hover:text-red-700"
          >
            <LogOut size={20} /> Logout
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Billing Form */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Billing details</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name *"
                className="border p-2 w-full rounded"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name *"
                className="border p-2 w-full rounded"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <input
              type="text"
              name="company"
              placeholder="Company name (optional)"
              className="border p-2 w-full rounded"
              value={formData.company}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Street address *"
              className="border p-2 w-full rounded"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="apartment"
              placeholder="Apartment, suite, etc. (optional)"
              className="border p-2 w-full rounded"
              value={formData.apartment}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="Town / City *"
              className="border p-2 w-full rounded"
              value={formData.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State *"
              className="border p-2 w-full rounded"
              value={formData.state}
              onChange={handleChange}
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code *"
              className="border p-2 w-full rounded"
              value={formData.zip}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone *"
              className="border p-2 w-full rounded"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email address *"
              className="border p-2 w-full rounded"
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              name="notes"
              placeholder="Order notes (optional)"
              className="border p-2 w-full rounded"
              value={formData.notes}
              onChange={handleChange}
            />
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Your order</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-2 mb-2">
              <span>{item.name} × {item.quantity}</span>
              <span>Frw {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Frw {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Frw {shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2 mt-2">
            <span>Total</span>
            <span>Frw {total.toFixed(2)}</span>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            Sorry, it seems that there are no available payment methods.
            Please contact us if you require assistance or wish to make alternate arrangements.
          </p>

          <button
            className="mt-4 w-full bg-yellow-400 hover:bg-black text-white py-2 rounded"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
