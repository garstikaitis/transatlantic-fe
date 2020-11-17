import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";
import store from "@/store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  const requiresAuth = routeTo.matched.length
    ? routeTo.matched[0].meta.requiresAuth
    : false;
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  const user = store.state.auth.user;
  if (!isAuthenticated && requiresAuth) {
    next({ name: "Login" });
  } else if (isAuthenticated && !requiresAuth) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
