import axios from "axios";
import { getAuthStore } from "../features/auth/store";

const baseURL = "http://localhost:8000/";

const axiosInstance = axios.create({ baseURL });

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = getAuthStore();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    const { refreshToken, setTokens, logout } = getAuthStore();

    if (err.response?.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(`${baseURL}/auth/refresh/`, {
          refresh: refreshToken,
        });

        setTokens(response.data.access, refreshToken);

        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

        return axiosInstance(originalRequest);
      } catch (e) {
        logout();
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
