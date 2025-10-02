import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { Notify } from "notiflix";

interface FormData {
  email: string;
  otp?: string;
  newPassword?: string;
}

function ForgotPassword() {
  const [step, setStep] = useState<"request" | "verify">("request");
  const [emailForOtp, setEmailForOtp] = useState("");
  const { register, handleSubmit, reset } = useForm<FormData>();
  const navigate = useNavigate();

  const requestOtp = async (data: FormData) => {
    try {
      const res = await axios.post("https://kappee-backend-repo-10.onrender.com/api/password/request-reset", {
        email: data.email,
      });
      Notify.success(res.data.message || "OTP sent to your email");
      setEmailForOtp(data.email);
      setStep("verify");
    } catch (error: any) {
      Notify.failure(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtp = async (data: FormData) => {
    try {
      const res = await axios.post("https://kappee-backend-repo-10.onrender.com/api/password/reset-password", {
        email: emailForOtp,
        otp: data.otp,
        newPassword: data.newPassword,
      });
      Notify.success(res.data.message || "Password reset successful!");
      reset();
      setStep("request");
      navigate("/login"); 
    } catch (error: any) {
      Notify.failure(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      {step === "request" && (
        <>
          <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
          <form onSubmit={handleSubmit(requestOtp)} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-yellow-400"
              {...register("email", { required: true })}
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 text-white font-semibold py-2 rounded hover:bg-black transition"
            >
              Send OTP
            </button>
          </form>
        </>
      )}

      {step === "verify" && (
        <>
          <h2 className="text-xl font-bold mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit(verifyOtp)} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-yellow-400"
              {...register("otp", { required: true })}
            />
            <input
              type="password"
              placeholder="Enter New Password"
              className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-yellow-400"
              {...register("newPassword", { required: true, minLength: 6 })}
            />
            <button
              type="submit"
              className="w-full bg-gray-800 text-yellow-400 font-semibold py-2 rounded hover:bg-black transition"
            >
              Reset Password
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
