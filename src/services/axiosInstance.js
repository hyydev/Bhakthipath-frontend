import axios from "axios";
import { getAuthStore } from "../features/auth/store";

const baseURL = "http://localhost:8000/api"; // backend API base URL

const axiosInstance = axios.create({ baseURL });

// Request interceptor → attach access token
axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = getAuthStore.getState();
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// Response interceptor → handle 401, refresh token
axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    const { refreshToken, logout, setTokens } = getAuthStore.getState();

    if (err.response?.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(`${baseURL}/auth/refresh/`, { refresh: refreshToken });
        setTokens(response.data.access, refreshToken);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return axiosInstance(originalRequest);
      } catch {
        logout();
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
