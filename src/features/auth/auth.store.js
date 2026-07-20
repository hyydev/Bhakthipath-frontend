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
  userId:null,
  _hasHydrated: false,    

  // Login ke baad
  setAuth: ({ accessToken, refreshToken , isVerified, userId}) =>
    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
      isVerified: isVerified ,
      userId,
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
          userId:null,
        }),
        setHasHydrated: (val) => set({ _hasHydrated: val }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);             
      },
        
    }
  )
  );
