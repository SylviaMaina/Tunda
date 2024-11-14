const routes = [
  { path: "/", component: () => import("pages/Splash/Onboard-1.vue") },
  ,
  { path: "/login", component: () => import("pages/Auth/Log-in.vue") },
  { path: "/signup", component: () => import("pages/Auth/Sign-up.vue") },
  {
    path: "/interests",
    component: () => import("pages/Onboard/Interests-page.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profession",
    component: () => import("pages/Onboard/Profession-page.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/bio",
    component: () => import("pages/Onboard/About-you.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/looking",
    component: () => import("pages/Onboard/Looking-page.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/distance",
    component: () => import("pages/Onboard/Distance-page.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/images",
    component: () => import("pages/Onboard/Images-page.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/about/:userId",
    component: () => import("pages/content/About-me.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/changepassword",
    name: "Change Password",
    component: () => import("pages/Profile/Change-password.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/editbio",
    name: "Edit bio",
    component: () => import("pages/Profile/Edit-bio.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/notifications",
    name: "Motifications",
    component: () => import("pages/Profile/Notifications-page.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/terms",
    name: "Terms",
    component: () => import("pages/Profile/Terms-page.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/privacy",
    name: "Privacy policy",
    component: () => import("pages/Profile/Privacy-Policy.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/aboutus",
    name: "About Us",
    component: () => import("pages/Profile/About-us.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/contact",
    name: "Contact Us",
    component: () => import("pages/Profile/Support-page.vue"),
    meta: { requiresAuth: true },
  },
  ,
  {
    path: "/image",
    name: "Images ",
    component: () => import("pages/Profile/Image-page.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/premium",
    name: "Premium Page",
    component: () => import("pages/Payments/Premium-page.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/payment",
    name: "Payment Page",
    component: () => import("pages/Payments/Payment-Options.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/billings",
    name: "Billings Page",
    component: () => import("pages/Payments/Billings-page.vue"),
    meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
      },
      {
        path: "/chat",
        name: "Chat main",
        component: () => import("pages/Chat/Chat-main.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/profile",
        name: "Profile main",
        component: () => import("pages/Profile/Profile-page.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/start/:id",
        name: "start chat",
        component: () => import("pages/Chat/Start-chat.vue"),
        children: [],
      },
    ],
  },
  {
    path: "/messages/:id",
    name: "message page",
    component: () => import("pages/Chat/Message-page.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    name: "chat page",
    component: () => import("layouts/ChatLayout.vue"),
    children: [],
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
        meta: { requiresAuth: true },
      },
      {
        path: "/editinterests",
        name: "Edit interests",
        component: () => import("pages/Profile/Interests-edit.vue"),
        meta: { requiresAuth: true },
      },

      {
        path: "/editprofession",
        name: "Edit Profession",
        component: () => import("pages/Profile/Profession-edit.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/editimages",
        name: "Edit Images",
        component: () => import("pages/Profile/Edit-images.vue"),
        meta: { requiresAuth: true },
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
