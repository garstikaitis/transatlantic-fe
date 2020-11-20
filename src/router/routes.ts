import { RouteConfig } from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Dashboard from "@/views/Dashboard.vue";
import Onboarding from "@/views/Onboarding.vue";
import Projects from "@/views/Projects.vue";
import Project from "@/views/Project.vue";
import ProjectDetails from "@/views/ProjectDetails.vue";
import NewProject from "@/views/NewProject.vue";
import NewTranslation from "@/views/NewTranslation.vue";

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
    path: "/projects",
    name: "Projects",
    component: Projects,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/projects/:id",
    name: "Project",
    component: Project,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/projects/:id/details",
    name: "ProjectDetails",
    component: ProjectDetails,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/translations/new",
    name: "NewTranslation",
    component: NewTranslation,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/projects/new",
    name: "NewProject",
    component: NewProject,
    meta: {
      requiresAuth: true,
    },
  },
];

export default routes;
