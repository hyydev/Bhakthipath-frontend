import api from "../../../services/axios";

// API calls related to authentication

export const registerUser = (data) => api.post("/user/register/", data);

export const verifyOTP = (data) => api.post("/auth/verify-otp/", data);

export const loginUser = (data) => api.post("/auth/login/", data);

export const refreshToken = (refreshToken) =>
  api.post("/auth/token/refresh/", { refresh: refreshToken });

export const logoutUser = (data) => api.post("/auth/logout/",data);

export const forgetPassword = (data) =>
  api.post("/auth/forget-password/", data);

export const resetPassword = (data) => api.post("/auth/reset-password/", data);

export const verifyResetOTP = (data) =>
  api.post("/auth/verify-reset-otp/", data);
