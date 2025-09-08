import { useState } from "react";
import { Link } from "react-router-dom";

import phone from "../assets/images/phone.png";
import slider2 from "../assets/images/slider2.png";
import banner3 from "../assets/images/banner3.jpg";
import banner4 from "../assets/images/banner4.jpg";
import watch from "../assets/images/watch.jpg";
import watchBack from "../assets/images/watchback.jpg";

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
    
      <div>
        <img
          src={watch}
          alt="Hilfiger Watch"
          className="rounded-lg shadow-md w-full"
        />
        <div className="flex gap-4 mt-4">
          <img
            src={watch}
            alt="Front View"
            className="w-20 h-20 border rounded cursor-pointer hover:ring-2 hover:ring-orange-400"
          />
          <img
            src={watchBack}
            alt="Back View"
            className="w-20 h-20 border rounded cursor-pointer hover:ring-2 hover:ring-orange-400"
          />
          <img
            src={phone}
            alt="Other Angle"
            className="w-20 h-20 border rounded cursor-pointer hover:ring-2 hover:ring-orange-400"
          />
        </div>
      </div>

      {/* RIGHT SIDE: Product Info */}
      <div>
        <h2 className="text-2xl font-bold">Hilfiger Men’s Watch</h2>
        <p className="text-green-600 font-semibold mt-2">In Stock</p>

        <div className="text-3xl font-bold text-gray-900 mt-4">$35</div>

        <ul className="list-disc pl-5 mt-4 text-gray-600 space-y-1">
          <li>Adjustable bracelet</li>
          <li>Mineral crystal face</li>
          <li>Quartz movement</li>
          <li>Buckle closure</li>
          <li>Stainless steel/leather</li>
          <li>Day and date function</li>
        </ul>

        {/* Quantity Selector */}
        <div className="flex items-center mt-6 gap-4">
          <button
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded text-white font-semibold shadow-md transition-colors duration-300">
            ADD TO CART
          </button>

          <Link to="/shooping">
            <button className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded text-white font-semibold shadow-md transition-colors duration-300">
              BUY NOW
            </button>
          </Link>
        </div>

        {/* Extra Info */}
        <div className="mt-6 text-gray-500 text-sm">
          <p>30 Day Return Policy</p>
          <p> Free Delivery</p>
          <p> Cash on Delivery Available</p>
        </div>
      </div>
    </div>
  );
}
