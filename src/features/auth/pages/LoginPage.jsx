import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SignUpImageCarousal from "../components/SignUpImageCarousal";
import { loginUser } from "../api";
import MotionButton from "../../../components/MotionButton";
import AnimatedInput from "../../../components/AnimateInput";
import { Heading, Button, Input } from "../../../components/ui/";

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-white/80 dark:bg-[#0A1628]/80 backdrop-blur-md animate-fade-in">
        {/* LEFT SECTION */}
        <div className="relative px-12 py-10 flex flex-col bg-transparent">
          <Heading level={1} className="mb-6 animate-slide-up">
            <span
              className="
                  bg-gradient-to-r 
                  from-blue-600 
                  to-indigo-600 
                  dark:from-amber-300 
                  dark:via-amber-400 
                  dark:to-amber-600 
                  bg-clip-text 
                  text-transparent
                  font-body
                "
            >
              Welcome Back
            </span>
          </Heading>
          <p className="mt-3 text-lg text-[#3A0519] dark:text-gray-300 animate-slide-up">
            Login to continue your spiritual journey.
          </p>
          <button className="w-full border border-[#3A0519] dark:border-[#93C5FD] py-2 rounded-xl mt-10 flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-[#1a2332] transition animate-fade-in">
            <img
              src="https://www.google.com/favicon.ico"
              className="w-5 h-5"
              alt="Google"
            />
            <span className="text-white">Log in with Google</span>
          </button>
          <div className="flex items-center gap-4 mt-6 mb-3 animate-fade-in">
            <div className="h-[1px] bg-[#3A0519] dark:bg-[#93C5FD] flex-1"></div>
            <span className="text-[#3A0519] dark:text-[#93C5FD] text-sm">
              or
            </span>
            <div className="h-[1px] bg-[#3A0519] dark:bg-[#93C5FD] flex-1"></div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-4 space-y-5 animate-fade-in"
          >
            <Input
              type="text"
              name="email_or_mobile_number"
              placeholder="Email or Mobile Number"
              value={formData.email_or_mobile_number}
              onChange={handleChange}
              className="w-full border border-[#3A0519] dark:border-[#93C5FD] px-4 py-3 rounded-xl text-sm focus:ring-2  outline-none font-body"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-[#3A0519] dark:border-[#93C5FD] px-4 py-3 rounded-xl text-sm focus:ring-2  outline-none font-body"
            />
            <Button
              type="submit"
              className="w-full bg-[#3A0519] text-white py-3 rounded-xl text-sm font-medium 
                           hover:bg-[#6A092F] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Login
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400 animate-fade-in">
            New here?{" "}
            <span
              className="text-blue-600 dark:text-blue-400 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </span>
          </p>
        </div>
        {/* RIGHT SIDE IMAGE CAROUSEL */}
        <div className="relative overflow-hidden bg-black/70">
          <SignUpImageCarousal />
        </div>
      </div>
    </div>
  );
}
