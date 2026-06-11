import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(

  persist(
  (set) => ({
  // State
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isVerified: false,

  // Login ke baad
  setAuth: ({ accessToken, refreshToken , isVerified}) =>
    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
      isVerified: isVerified 
    }),

  // Refresh token API ke baad
  setTokens: ({ accessToken, refreshToken }) =>
    set((state) => ({
      accessToken: accessToken ?? state.accessToken,
      refreshToken: refreshToken ?? state.refreshToken,
      isAuthenticated: true,
      isVerified: true,
    })),

     // Logout
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isVerified: false,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
  );
