import axiosInstance from "./axiosInstance";

// Register new user
export const registerUser = (data) =>
  axiosInstance.post("/auth/register/", data);

// Verify OTP
export const verifyOTP = (data) =>
  axiosInstance.post("/auth/verify-otp/", data);

// Login user
export const loginUser = (data) =>
  axiosInstance.post("/auth/login/", data);

// Forgot password (if implemented)
export const forgotPassword = (data) =>
  axiosInstance.post("/auth/forgot-password/", data);

// Reset password (if implemented)
export const resetPassword = (data) =>
  axiosInstance.post("/auth/reset-password/", data);

// Get current user profile
export const getProfile = () =>
  axiosInstance.get("/user/profile/");

// Get user orders
export const getOrders = () =>
  axiosInstance.get("/orders/my/");

// Logout (if backend supports)
export const logoutUser = () =>
  axiosInstance.post("/auth/logout/");
