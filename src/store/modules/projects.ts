import ProjectsApi from "@/api/projects-api";
import { RootState } from "@/types/common";
import { Project, ProjectsState } from "@/types/projects";
import { Module, MutationTree, ActionTree } from "vuex";

const namespaced: boolean = true;

export const rootState: ProjectsState = {
  activeProject: null,
  projects: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const mutations: MutationTree<ProjectsState> = {
  SET_ACTIVE_PROJECT(state: ProjectsState, payload: Project) {
    state.activeProject = payload;
  },
  SET_PROJECTS(state: ProjectsState, payload: Project[]) {
    state.projects = payload;
  },
  SET_IS_LOADING(state: ProjectsState, payload: boolean) {
    state.isLoading = payload;
  },
  SET_IS_SUCCESS(state: ProjectsState, payload: boolean) {
    state.isSuccess = payload;
  },
  SET_IS_ERROR(state: ProjectsState, payload: boolean) {
    state.isError = payload;
  },
};

export const actions: ActionTree<ProjectsState, RootState> = {
  async createProject({ commit, dispatch }, { name, subdomain }) {
    const data = await new ProjectsApi().createProject();
    if (data.success) {
      commit("SET_ACTIVE_PROJECT", data.data);
    }
  },
  async getProjects({ commit, dispatch, rootState }, { organizationId }) {
    commit("SET_IS_LOADING", true);
    const data = await new ProjectsApi().getProjects(organizationId);
    if (data.success) {
      commit("SET_IS_LOADING", false);
      commit("SET_PROJECTS", data.data);
    }
  },
};

export const projects: Module<ProjectsState, RootState> = {
  namespaced,
  state: rootState,
  mutations,
  actions,
};
