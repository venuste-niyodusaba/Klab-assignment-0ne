import { useState } from "react";
import { useCart, type CartItem } from "./CartContext";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react"; 

const CartPage = () => {
  const { cart, addToCart, removeFromCart,  } = useCart();
  const [coupon, setCoupon] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal >= 400 ? 0 : 5; 
  const total = subtotal + shippingCost;
  

  const handleApplyCoupon = () => {
    if (!coupon.trim()) return;
    alert(`Coupon "${coupon}" applied! (Demo only)`);
    setCoupon("");
  };

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Remove</th>
                  <th className="p-2">Thumbnail</th>
                  <th className="p-2">Product</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item: CartItem) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2 text-center">
                      <button
                        className="text-red-500 font-bold"
                        onClick={() => removeFromCart(item.id)}
                      >
                        {< Trash2 size={30} className=" text-red-500 items-center"/>}
                      </button>
                    </td>
                    <td className="p-2">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                    </td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">Frw {item.price.toFixed(2)}</td>
                    <td className="p-2 flex items-center space-x-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={() => removeFromCart(item.id)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded"
                        onClick={() =>
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                          })
                        }
                      >
                        +
                      </button>
                    </td>
                    <td className="p-2 font-bold">Frw {(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              placeholder="Coupon code"
              className="border p-2 rounded flex-1"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              Apply coupon
            </button>
          </div>
          
          <div className="mt-6 p-4 border rounded space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Frw{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? "Free" : ` Frw ${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2 mt-2">
              <span>Total</span>
              <span>Frw{total.toFixed(2)}</span>
            </div>
            {shippingCost === 0 ? (
              <p className="text-green-600 text-base">Congratulations! You have got free shipping</p>
            ) : (
              <p className="text-sm text-gray-600">
                Spend Frw{(400 - subtotal).toFixed(2)} more to get free shipping
              </p>
            )}

            <Link to="/checkout">
              <button className="mt-2 w-full bg-yellow-400 hover:bg-black text-white py-2 rounded">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
