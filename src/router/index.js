import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import AuthSession from "app/Storage/AuthSession";
import { useUserStore } from "src/stores/useUserStore";

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();

    // Check if user is authenticated before proceeding
    if (userStore.isAuthenticated) {
      // If userInterests are not already loaded, fetch the data
      if (userStore.userInterests.length === 0) {
        console.log("Fetching user data...");
        await userStore.fetchUserData(); // Wait until the data is fetched
      }

      // Now that the data is fetched, check if the user has interests
      // if (userStore.userInterests.length > 0 && to.path !== "/home") {
      //   return next({ path: "/home" });
      // }
    }

    // If the route requires authentication but the user isn't authenticated, redirect to login
    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
      return next({ path: "/login", query: { redirect: to.fullPath } });
    }

    // Proceed with the route if none of the above conditions are met
    next();
  });

  return Router;
});
