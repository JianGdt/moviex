import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create<ComponentProps.AuthStoreState>((set) => ({
	user: null,
	isSigningUp: false,
	isCheckingAuth: true,
	isLoggingOut: false,
	isLoggingIn: false,
    signup: async (credentials) => {
        set({ isSigningUp: true });
        try {
          const response = await axios.post("/api/v1/auth/signup", credentials);
          set({ user: response.data.user, isSigningUp: false });
          console.log('response', response.data.user);
          toast.success("Account created successfully");
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message || "Signup failed");
          } else if (error instanceof Error) {
            toast.error(error.message || "An unexpected error occurred");
          } else {
            toast.error("An unknown error occurred");
          }
          set({ isSigningUp: false, user: null });
        }
      },
      login: async (credentials) => {
        set({ isLoggingIn: true });
        try {
          const response = await axios.post("/api/v1/auth/login", credentials);
          set({ user: response.data.user, isLoggingIn: false });
          console.log('response', response.data.user);
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message || "Login failed");
          } else if (error instanceof Error) {
            toast.error(error.message || "An unexpected error occurred");
          } else {
            toast.error("An unknown error occurred");
          }
          set({ isLoggingIn: false, user: null });
        }
      },
      logout: async () => {
        set({ isLoggingOut: true });
        try {
          await axios.post("/api/v1/auth/logout");
          set({ user: null, isLoggingOut: false });
          toast.success("Logged out successfully");
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message || "Logout failed");
          } else if (error instanceof Error) {
            toast.error(error.message || "An unexpected error occurred");
          } else {
            toast.error("An unknown error occurred");
          }
          set({ isLoggingOut: false });
        }
      },
	
authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Auth check failed");
      } else if (error instanceof Error) {
        toast.error(error.message || "An unexpected error occurred");
      } else {
        toast.error("An unknown error occurred");
      }
      set({ isCheckingAuth: false, user: null });
    }
  },
}));