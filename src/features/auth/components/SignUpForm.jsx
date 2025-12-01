import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
// import AnimatedInput from "../../../components/AnimateInput";
// import MotionButton from "../../../components/MotionButton"

import { Button, Input } from "../../../components/ui";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile_number: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(formData);
      toast.success("OTP sent! Verify to continue.");
      navigate("/otp"); // OTP page route
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <Input
        type="text"
        name="full_name"
        placeholder="Full Name"
        value={formData.full_name}
        onChange={handleChange}
      />

      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        type="text"
        name="mobile_number"
        placeholder="Mobile Number"
        value={formData.mobile_number}
        onChange={handleChange}
      />

      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        // className="w-full border border-[#3A0519] px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-[#6A092F] outline-none placeholder:text-[#3A0519]"
      />

      <Button
        type="submit"
        name="submit"
        disabled={loading}
        className="w-full bg-[#3A0519] text-white py-3 rounded-xl text-sm font-medium 
             hover:bg-[#6A092F] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Registering..." : "Create Account"}
      </Button>
    </form>
  );
}
