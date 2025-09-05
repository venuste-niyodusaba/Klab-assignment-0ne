import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";

function LoginModal({ onClose }: { onClose: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[700px] rounded shadow-lg flex relative">
        <div className="bg-yellow-400 w-1/3 p-6 flex flex-col justify-center text-black">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <p className="text-sm leading-relaxed">
            Get access to your Orders, Wishlist and Recommendations.
          </p>
        </div>
        <div className="flex-1 p-8 relative">
          <button
            onClick={onClose}   
            className="absolute right-4 top-4 text-gray-600 hover:text-black"
          >
            <X size={20} />
          </button>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Enter Username/Email address"
              className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 h-full px-3 bg-gray-800 text-white flex items-center justify-center"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-yellow-500" />
                <span className="text-yellow-600 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-yellow-600 hover:underline">
                Lost your password?
              </a>
            </div>

            <button className="w-full bg-gray-800 text-yellow-400 font-semibold py-2 rounded hover:bg-black transition">
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
