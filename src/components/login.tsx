import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Notify } from "notiflix";
import { X, Eye, EyeOff } from "lucide-react";
import { useAuth } from "./AuthContext";

interface FormData {
  email: string;
  password?: string;
  otp?: string;
  rememberMe?: boolean;
}

function LoginModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"password" | "otp">("password");
  const [emailForOtp, setEmailForOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const handleClose = () => setIsOpen(false);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && resendTimer > 0) {
      interval = setInterval(() => setResendTimer(prev => prev - 1), 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [resendTimer, step]);
  const onPasswordSubmit = async (data: FormData) => {
    try {
      const res = await axios.post("https://kappee-backend-repo-10.onrender.com/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      Notify.success(res.data.message || "OTP sent to your email");
      setEmailForOtp(data.email);
      setStep("otp");
      setResendTimer(60);
      setCanResend(false);
    } catch (error: any) {
      Notify.failure(error.response?.data?.message || "Login failed");
    }
  };
  const onOtpSubmit = async (data: FormData) => {
    try {
      const res = await axios.post("https://kappee-backend-repo-10.onrender.com/api/auth/login-verify", {
        email: emailForOtp,
        otp: data.otp,
      });

      login(res.data.user, res.data.token);
      Notify.success("Login successful!");
      reset();
      handleClose();

      if (res.data.user.role === "admin") navigate("/dashboard");
      else navigate("/");
    } catch (error: any) {
      Notify.failure(error.response?.data?.message || "OTP verification failed");
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post("https://kappee-backend-repo-10.onrender.com/api/auth/login", { email: emailForOtp });
      Notify.success("OTP resent to your email");
      setResendTimer(60);
      setCanResend(false);
    } catch (error: any) {
      Notify.failure(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[700px] rounded shadow-lg flex relative">
        <div className="bg-yellow-400 w-1/3 p-6 flex flex-col justify-center text-black">
          <h2 className="text-2xl font-bold mb-4">
            {step === "password" ? "LOGIN" : "Enter OTP"}
          </h2>
          <p className="text-sm leading-relaxed">
            {step === "password"
              ? "Access your Orders, Wishlist, and Recommendations."
              : "Enter the OTP sent to your email."}
          </p>
        </div>

        <div className="flex-1 p-8 relative">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-600 hover:text-black"
          >
            <X size={20} />
          </button>

          <form
            className="space-y-4"
            onSubmit={handleSubmit(step === "password" ? onPasswordSubmit : onOtpSubmit)}
          >
            {step === "password" && (
              <>
                <input
                  type="email"
                  placeholder="Enter your Email"
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
              </>
            )}

            {step === "otp" && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-yellow-400"
                  {...register("otp", { required: true })}
                />
                <button
                  type="button"
                  disabled={!canResend}
                  onClick={handleResendOtp}
                  className={`text-black font-semibold mt-2 ${!canResend ? "opacity-50 cursor-not-allowed" : "hover:underline"}`}
                >
                  {canResend ? "Resend OTP" : `Resend OTP in ${resendTimer}s`}
                </button>
              </>
            )}

            {step === "password" && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-yellow-500"
                    {...register("rememberMe")}
                  />
                  <span className="text-yellow-600 font-medium">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-yellow-600 hover:underline"
                >
                  Lost your password?
                </button>
              </div>
            )}

            <div className="mb-4 gap-2 flex flex-col">
              <button
                type="submit"
                className="w-full bg-gray-800 text-yellow-400 font-semibold py-2 rounded hover:bg-black transition"
              >
                {step === "password" ? "LOG IN" : "VERIFY OTP"}
              </button>

              {step === "password" && (
                <p className="text-sm text-gray-600 mt-2">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-yellow-500 font-semibold">
                    Create one
                  </Link>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
