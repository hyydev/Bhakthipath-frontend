// src/features/auth/store.js
import { create } from "zustand";
import { getUserProfile } from "../../services/authApi";

// Helper: Remove tokens from localStorage
const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Helper: Save tokens to localStorage
const saveTokens = (access, refresh) => {
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
};

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,

  // Save user object & mark authenticated
  setUser: (user) => set({ user, isAuthenticated: true }),

  // Save tokens (only call after successful login)
  setTokens: (access, refresh) => {
    set({ accessToken: access, refreshToken: refresh });
    saveTokens(access, refresh);
  },

  // Logout user and clear everything
  logout: () => {
    set({ user: null, isAuthenticated: false, accessToken: null, refreshToken: null });
    clearTokens();
  },

  // Hydrate store from localStorage (call on app load)
  hydrate: () => {
    const access = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");
    const userStr = localStorage.getItem("user");
    const profileStr = localStorage.getItem("profile");
    let userObj = null;
    let profileObj = null;
    try {
      if (userStr && userStr !== "undefined") userObj = JSON.parse(userStr);
      if (profileStr && profileStr !== "undefined") profileObj = JSON.parse(profileStr);
    } catch (e) {
      userObj = null;
      profileObj = null;
    }
    if (access && refresh) {
      set({
        accessToken: access,
        refreshToken: refresh,
        isAuthenticated: true,
        user: userObj,
        profile: profileObj,
      });
    } else {
      set({
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        user: null,
        profile: null,
      });
    }
  },

  // Clear tokens (use after OTP verify or signup to ensure clean state)
  clearTokens: () => {
    set({ accessToken: null, refreshToken: null, isAuthenticated: false });
    clearTokens();
  },
}));

// Helpers to use store outside React components (e.g., axios interceptors)
export const getAuthStore = useAuthStore.getState;
export const subscribeAuthStore = useAuthStore.subscribe;
