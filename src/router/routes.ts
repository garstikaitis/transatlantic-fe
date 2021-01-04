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
import SelectOrganization from "@/views/SelectOrganization.vue";
import Payments from "@/views/Payments.vue";
import CreateOrganization from "@/views/CreateOrganization.vue";
import EditOrganization from "@/views/EditOrganization.vue";
import User from "@/views/User.vue";
import LandingPage from "@/views/LandingPage.vue";

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
      requiresOrganization: true,
    },
  },
  {
    path: "/onboarding",
    name: "Onboarding",
    component: Onboarding,
    meta: {
      requiresAuth: true,
      requiresOrganization: false,
    },
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
    meta: {
      requiresAuth: true,
      requiresOrganization: true,
    },
  },
  {
    path: "/organizations",
    name: "SelectOrganization",
    component: SelectOrganization,
    meta: {
      requiresAuth: true,
      requiresOrganization: false,
    },
  },
  {
    path: "/organizations/new",
    name: "CreateOrganization",
    component: CreateOrganization,
    meta: {
      requiresAuth: true,
      requiresOrganization: false,
    },
  },
  {
    path: "/organizations/:id",
    name: "EditOrganization",
    component: EditOrganization,
    meta: {
      requiresAuth: true,
      requiresOrganization: false,
    },
  },
  {
    path: "/projects/:id",
    name: "Project",
    component: Project,
    meta: {
      requiresAuth: true,
      requiresOrganization: true,
    },
  },
  {
    path: "/projects/:id/details",
    name: "ProjectDetails",
    component: ProjectDetails,
    meta: {
      requiresAuth: true,
      requiresOrganization: true,
    },
  },
  {
    path: "/translations/new",
    name: "NewTranslation",
    component: NewTranslation,
    meta: {
      requiresAuth: true,
      requiresOrganization: true,
    },
  },
  {
    path: "/projects/new",
    name: "NewProject",
    component: NewProject,
    meta: {
      requiresAuth: true,
      requiresOrganization: true,
    },
  },
  {
    path: "/payments",
    name: "Payments",
    component: Payments,
    meta: {
      requiresAuth: true,
      requiresOrganization: true,
    },
  },
  {
    path: "/user",
    name: "Profile",
    component: User,
    meta: {
      requiresAuth: true,
      requiresOrganization: true,
    },
  },
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
    meta: {
      requiresAuth: false,
      requiresOrganization: false,
    },
  },
];

export default routes;
