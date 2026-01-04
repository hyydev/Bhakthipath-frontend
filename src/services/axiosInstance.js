// src/services/axiosInstance.js
import axios from "axios";
import { getAuthStore } from "../features/auth/store";

const baseURL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({ baseURL });

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => (error ? prom.reject(error) : prom.resolve(token)));
  failedQueue = [];
};

// Request interceptor — attach access token
axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = getAuthStore();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor — handle 401 & refresh
axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    const { refreshToken, setTokens, logout } = getAuthStore();

    if (err.response?.status === 401 && refreshToken && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return axiosInstance(originalRequest);
          })
          .catch((e) => Promise.reject(e));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(`${baseURL}/auth/refresh/`, {
          refresh_token: refreshToken,
        });

        const newAccess = response.data?.data?.access_token;
        if (!newAccess) throw new Error("Refresh token failed");

        setTokens(newAccess, refreshToken);

        processQueue(null, newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return axiosInstance(originalRequest);
      } catch (e) {
        processQueue(e, null);
        logout();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
