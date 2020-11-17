import { RouteConfig } from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Dashboard from "@/views/Dashboard.vue";
import Onboarding from "@/views/Onboarding.vue";
import Translations from "@/views/Translations.vue";

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/onboarding",
    name: "Onboarding",
    component: Onboarding,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/translations",
    name: "Translations",
    component: Translations,
    meta: {
      requiresAuth: true,
    },
  },
];

export default routes;