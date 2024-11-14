import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
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

    if (userStore.isAuthenticated) {
      if (userStore?.userInterests?.length === 0) {
        console.log("Fetching user data...");
        await userStore.fetchUserData();
      }
    }

    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
      return next({ path: "/login", query: { redirect: to.fullPath } });
    }

    next();
  });

  return Router;
});
