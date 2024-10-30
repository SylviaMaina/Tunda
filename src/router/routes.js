const routes = [
  { path: "/", component: () => import("pages/Splash/Onboard-1.vue") },
  ,
  { path: "/login", component: () => import("pages/Auth/Log-in.vue") },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
