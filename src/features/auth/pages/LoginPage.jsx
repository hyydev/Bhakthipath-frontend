import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SignUpImageCarousal from "../components/SignUpImageCarousal";
import { loginUser } from "../api";
import MotionButton from "../../../components/MotionButton";
import AnimatedInput from "../../../components/AnimateInput";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email_or_mobile_number: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser(formData);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Invalid Credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffefe2] p-4">
      
      {/* OUTER CARD */}
      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-2xl 
                      overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[85vh]">

        {/* LEFT SECTION */}
        <div className="relative bg-white px-12 py-14 flex flex-col justify-center">

          <h1 className="text-5xl text-[#520724] font-extrabold">
            Welcome Back
          </h1>

          <p className="text-[#3A0519] mt-3 text-lg">
            Login to continue your spiritual journey.
          </p>

          <form onSubmit={handleSubmit} className="mt-12 space-y-5">

            <AnimatedInput
              type="email_or_mobile_number"
              name="email_or_mobile_number"
              placeholder="Email or Mobile Number"
              value={formData.email_or_mobile_number}
              onChange={handleChange}
              className="w-full border border-[#3A0519] px-4 py-3 rounded-xl 
                         text-sm focus:ring-2 focus:ring-[#6A092F] outline-none"
            />

            <AnimatedInput
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-[#3A0519] px-4 py-3 rounded-xl 
                         text-sm focus:ring-2 focus:ring-[#6A092F] outline-none"
            />

            <MotionButton
              type="submit"
              className="w-full bg-[#3A0519] text-white py-3 rounded-xl 
                         text-sm font-medium hover:bg-[#6A092F] transition"
            >
              Login
            </MotionButton>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            New here?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </span>
          </p>
        </div>

        {/* RIGHT SIDE IMAGE CAROUSEL */}
        <div className="relative bg-black overflow-hidden">
          <SignUpImageCarousal />
        </div>
      </div>
    </div>
  );
}
