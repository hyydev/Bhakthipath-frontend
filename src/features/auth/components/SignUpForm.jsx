import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

  <input
    type="text"
    name="full_name"
    placeholder="Full Name"
    value={formData.full_name}
    onChange={handleChange}
    className="w-full border border-gray-300 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-black outline-none"
  />

  <input
    type="email"
    name="email"
    placeholder="Email"
    value={formData.email}
    onChange={handleChange}
    className="w-full border border-gray-300 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-black outline-none"
  />

  <input
    type="text"
    name="mobile_number"
    placeholder="Mobile Number"
    value={formData.mobile_number}
    onChange={handleChange}
    className="w-full border border-gray-300 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-black outline-none"
  />

  <input
    type="password"
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    className="w-full border border-gray-300 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-black outline-none"
  />

  <button
    type="submit"
    name="submit"
    disabled={loading}
    className="w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
  >
    {loading ? "Registering..." : "Create Account"}
  </button>
</form>


  );
}
