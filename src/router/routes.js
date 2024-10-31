const routes = [
  { path: "/", component: () => import("pages/Splash/Onboard-1.vue") },
  ,
  { path: "/login", component: () => import("pages/Auth/Log-in.vue") },

  {
    path: "/",
    name: "home",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("pages/content/Home-Page.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
