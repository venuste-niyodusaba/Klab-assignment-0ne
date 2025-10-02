import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Notify } from "notiflix";
import { X, Eye, EyeOff } from "lucide-react";

function RegisterModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  interface FormData {
    name: string; 
    email: string;
    password: string;
    confirmPassword: string;
    role?: string;
  }

  const { register, handleSubmit, reset } = useForm<FormData>();

  const onRegister = async (data: FormData) => {
    try {
      if (data.password !== data.confirmPassword) {
        Notify.failure("Passwords do not match!");
        return;
      }

      const response = await axios.post("https://kappee-backend-repo-10.onrender.com/api/auth/signup", {
        name: data.name, 
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: data.role || "user",
      });

      Notify.success(response.data.message || "Registration successful!");

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      reset();
      handleClose();
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      Notify.failure(error.response?.data?.message || "Registration failed.");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate("/login");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[700px] rounded shadow-lg flex relative">
       
        <div className="bg-yellow-400 w-1/3 p-6 flex flex-col justify-center text-black">
          <h2 className="text-2xl font-bold mb-4">REGISTER HERE</h2>
          <p className="text-sm leading-relaxed">
            Create an account and get access to your Orders, Wishlist and Recommendations.
          </p>
        </div>
        <div className="flex-1 p-8 relative">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-600 hover:text-black"
          >
            <X size={20} />
          </button>

          <form className="space-y-4" onSubmit={handleSubmit(onRegister)}>
          
            <input
              type="text"
              placeholder="Enter Full Name"
              className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-yellow-400"
              {...register("name", { required: true })}
            />
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-yellow-400"
              {...register("email", { required: true })}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-yellow-400"
                {...register("password", { required: true })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 h-full px-3 bg-gray-800 text-white flex items-center justify-center"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-yellow-400"
                {...register("confirmPassword", { required: true })}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-0 top-0 h-full px-3 bg-gray-800 text-white flex items-center justify-center"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="mb-4 gap-2 flex flex-col">
              <button
                type="submit"
                className="w-full bg-gray-800 text-yellow-400 font-semibold py-2 rounded hover:bg-black transition"
              >
                REGISTER
              </button>

              <p className="text-sm text-gray-600 mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-yellow-500 font-semibold">
                  Back to login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
