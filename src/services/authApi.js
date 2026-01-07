import axiosInstance from "./axiosInstance";

// Register new user
export const registerUser = (data) =>
  axiosInstance.post("/user/register/", data);

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

// Get user profile by ID
export const getUserProfile = (id) =>
  axiosInstance.get(`/user/userprofile/${id}/`);

// Get all addresses
export const getUserAddresses = () =>
  axiosInstance.get("/user/useraddresses/");

// Add new address
export const addUserAddress = (data) =>
  axiosInstance.post("/user/useraddresses/", data);

// Update address
export const updateUserAddress = (addressId, data) =>
  axiosInstance.put(`/user/useraddresses/${addressId}/`, data);

// Delete address
export const deleteUserAddress = (addressId) =>
  axiosInstance.delete(`/user/useraddresses/${addressId}/`);

// Set default address
export const setDefaultAddress = (addressId) =>
  axiosInstance.post(`/user/set-default-address/${addressId}/`);

// Get user orders
export const getOrders = () =>
  axiosInstance.get("/orders/my/");

// Logout (if backend supports)
export const logoutUser = (refreshToken) =>
  axiosInstance.post("/auth/logout/",{
    refresh_token: refreshToken,
  });
