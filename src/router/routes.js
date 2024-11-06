const routes = [
  { path: "/", component: () => import("pages/Splash/Onboard-1.vue") },
  ,
  { path: "/login", component: () => import("pages/Auth/Log-in.vue") },
  { path: "/signup", component: () => import("pages/Auth/Sign-up.vue") },
  {
    path: "/interests",
    component: () => import("pages/Onboard/Interests-page.vue"),
  },
  {
    path: "/profession",
    component: () => import("pages/Onboard/Profession-page.vue"),
  },
  {
    path: "/looking",
    component: () => import("pages/Onboard/Looking-page.vue"),
  },
  {
    path: "/distance",
    component: () => import("pages/Onboard/Distance-page.vue"),
  },
  {
    path: "/images",
    component: () => import("pages/Onboard/Images-page.vue"),
  },
  {
    path: "/about",
    component: () => import("pages/content/About-me.vue"),
  },
  {
    path: "/changepassword",
    name: "Change Password",
    component: () => import("pages/Profile/Change-password.vue"),
  },
  {
    path: "/notifications",
    name: "Motifications",
    component: () => import("pages/Profile/Notifications-page.vue"),
  },
  {
    path: "/terms",
    name: "Terms",
    component: () => import("pages/Profile/Terms-page.vue"),
  },
  {
    path: "/privacy",
    name: "Privacy policy",
    component: () => import("pages/Profile/Privacy-Policy.vue"),
  },
  {
    path: "/aboutus",
    name: "About Us",
    component: () => import("pages/Profile/About-us.vue"),
  },
  {
    path: "/contact",
    name: "Contact Us",
    component: () => import("pages/Profile/Support-page.vue"),
  },
  {
    path: "/premium",
    name: "Premium Page",
    component: () => import("pages/Payments/Premium-page.vue"),
  },
  {
    path: "/payment",
    name: "Payment Page",
    component: () => import("pages/Payments/Payment-Options.vue"),
  },
  {
    path: "/billings",
    name: "Billings Page",
    component: () => import("pages/Payments/Billings-page.vue"),
  },
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
      {
        path: "/chat",
        name: "Chat main",
        component: () => import("pages/Chat/Chat-main.vue"),
      },
      {
        path: "/profile",
        name: "Profile main",
        component: () => import("pages/Profile/Profile-page.vue"),
      },
    ],
  },

  {
    path: "/",
    name: "chat page",
    component: () => import("layouts/ChatLayout.vue"),
    children: [
      {
        path: "/message",
        name: "message page",
        component: () => import("pages/Chat/Message-page.vue"),
      },
    ],
  },

  {
    path: "/",
    name: "likes page",
    component: () => import("layouts/LikesLayout.vue"),
    children: [
      {
        path: "/likes",
        name: "Likes got page",
        component: () => import("pages/Likes/Likes-got.vue"),
      },
      {
        path: "/likesent",
        name: "Likes sent page",
        component: () => import("pages/Likes/Likes-sent.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "profile edit page",
    component: () => import("layouts/ProfileLayout.vue"),
    children: [
      {
        path: "/personal",
        name: "Edit personal details",
        component: () => import("pages/Profile/Edit-Profile.vue"),
      },
      {
        path: "/editinterests",
        name: "Edit interests",
        component: () => import("pages/Profile/Interests-edit.vue"),
      },
      {
        path: "/editprofession",
        name: "Edit Profession",
        component: () => import("pages/Profile/Profession-edit.vue"),
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
