import axiosInstance from "../../services/axiosInstance";

// Register new user
export const registerUser = (data) => axiosInstance.post("/user/register/", data);

// Verify OTP
export const verifyOTP = (data) => axiosInstance.post("/auth/verify-otp/", data);

// Login user
export const loginUser = (data) => axiosInstance.post("/auth/login/", data);

// Fetch user profile (optional)
// export const fetchProfile = () => axiosInstance.get("/user/userprofile/");
