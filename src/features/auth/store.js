// src/features/auth/store.js
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,

  // Save user object & mark authenticated
  setUser: (user) => set({ user, isAuthenticated: true }),

  // Save tokens
  setTokens: (access, refresh) => {
    set({ accessToken: access, refreshToken: refresh });
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  },

  // Logout
  logout: () => {
    set({ user: null, isAuthenticated: false, accessToken: null, refreshToken: null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  // Hydrate store from localStorage
  hydrate: () => {
    const access = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");
    if (access && refresh) {
      set({ accessToken: access, refreshToken: refresh, isAuthenticated: true });
    }
  },
}));

// helpers to use store outside React components (e.g., axios interceptors)
export const getAuthStore = useAuthStore.getState;
export const subscribeAuthStore = useAuthStore.subscribe;
