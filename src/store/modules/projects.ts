import ProjectsApi from "@/api/projects-api";
import TranslationsApi from "@/api/translations-api";
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
    // @ts-ignore
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
  async fetchProject({ commit }, projectId) {
    commit("SET_IS_LOADING", true);
    const data = await new ProjectsApi().fetchProject(projectId);
    if (data.success) {
      commit("SET_IS_LOADING", false);
      commit("SET_ACTIVE_PROJECT", data.data);
    }
  },
  async deleteProject({ commit, state }, projectId) {
    commit("SET_IS_LOADING", true);
    const data = await new ProjectsApi().deleteProject(projectId);
    if (data.success) {
      commit("SET_IS_LOADING", false);
      const projects = state.projects.filter(
        (project) => project.id !== projectId
      );
      commit("SET_PROJECTS", projects);
    }
  },
};

export const projects: Module<ProjectsState, RootState> = {
  namespaced,
  state: rootState,
  mutations,
  actions,
};
