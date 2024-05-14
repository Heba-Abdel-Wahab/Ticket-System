import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  //{
    //path: "/glossary",
    //name: "Glossary",
    //component: () =>
      //import(/* webpackChunkName: "glossary" */ "../views/Glossary.vue"),
  //},
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profil" */ "../views/Profile.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
  },
  //{
    //path: "/image/:id",
    //name: "Image",
    // eslint-disable-next-line
    //component: () =>
      //import(/* webpackChunkName: "image" */ "../views/Image.vue"),
  //}, 
  {
    path: "/test",
    name: "Test",
    // eslint-disable-next-line
    component: () =>
      import(/* webpackChunkName: "test" */ "../views/Test.vue"),
  },
  //{
    //path: "/test-images",
    //name: "TestImages",
    // eslint-disable-next-line
    //component: () =>
    //  import(/* webpackChunkName: "test-images" */ "../views/TestImages.vue"),
  //},
  {
    path: "/newticket",
    name: "NewTicket",
    component: () =>
      import(/* webpackChunkName: "ticket" */ "../views/NewTicket.vue"),
  },
  {
    path: "/admin-panel",
    name: "AdminPanel",
    component: () =>
      import(/* webpackChunkName: "admin-panel" */ "../views/AdminPanel.vue"),
  },
  {
    path: "/ticketlist",
    name: "TicketList",
    component: () =>
      import("../components/ListTicket.vue"),
  },
  {
    path: "/ticketList",
    name: "TicketList",
    // eslint-disable-next-line
    component: () =>
      import(/* webpackChunkName: "test-images" */ "../views/TicketList.vue"),
  },
  {
    path: "/ticketoverview/:id",
    name: "TicketOverview",
    // eslint-disable-next-line
    component: () =>
      import(/* webpackChunkName: "image" */ "../views/TicketOverview.vue"),
  },
  {
    path: "/myticket",
    name: "MyTicket",
    component: () =>
      import("../components/MyTicket.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/", "/test-images","/ticket","/ticketlist","/TicketOverview/:id","/ticketView"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
