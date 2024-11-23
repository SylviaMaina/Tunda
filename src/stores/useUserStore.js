import { defineStore } from "pinia";
import { apiClient } from "app/Storage/api";
import AuthSession from "app/Storage/AuthSession";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInterests: [],
    user: "",
  }),
  actions: {
    async fetchUserData() {
      if (!this.isAuthenticated) return;

      try {
        const response = await apiClient.get("/users/me/");
        this.user = response.data?.results || [];
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    },
  },
  getters: {
    isAuthenticated: () => AuthSession.isLoggedIn(true),
  },
});
