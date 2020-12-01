import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";
import store from "@/store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0,
      behavior: "smooth",
    };
  },
});

router.beforeEach((routeTo, routeFrom, next) => {
  const requiresAuth = routeTo.matched.length
    ? routeTo.matched[0].meta.requiresAuth
    : false;
  const requiresOrganization = routeTo.matched.length
    ? routeTo.matched[0].meta.requiresOrganization
    : false;
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  const activeOrganization = store.state.organizations.activeOrganization;
  if (!isAuthenticated && requiresAuth) {
    next({ name: "Login" });
  } else if (isAuthenticated && requiresOrganization && !activeOrganization) {
    next({ name: "SelectOrganization" });
  } else if (isAuthenticated && !requiresAuth) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
