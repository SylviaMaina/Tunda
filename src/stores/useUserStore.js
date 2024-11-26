import { defineStore } from "pinia";
import { apiClient } from "app/Storage/api";
import AuthSession from "app/Storage/AuthSession";
import { Notify } from "quasar";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInterests: [],
    user: null, // Default as null for clarity
  }),
  actions: {
    async fetchUserData() {
      if (!this.isAuthenticated) {
        console.log("User is not authenticated");
        return;
      }

      try {
        const response = await apiClient.get("/users/me/");
        this.user = response.data?.results || null;
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        Notify.create({
          type: "negative",
          message: "Failed to load user data. Please try again later.",
        });
      }
    },
  },
  getters: {
    isAuthenticated: () => AuthSession.isLoggedIn(),
  },
});
