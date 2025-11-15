import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,

  setUser: (user) => set({ user, isAuthenticated: true }),
  setTokens: (access, refresh) => set({ accessToken: access, refreshToken: refresh }),
  logout: () => set({ user: null, isAuthenticated: false, accessToken: null, refreshToken: null }),
}));

// helper to access store outside react components
export const getAuthStore = () => useAuthStore.getState();
