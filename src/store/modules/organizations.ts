import OrganizationsApi from "@/api/organizations-api";
import { RootState } from "@/types/common";
import { Organization, OrganizationState } from "@/types/organizations";
import { CreateOrganizationResponse } from "@/types/responses";
import { Module, MutationTree, ActionTree } from "vuex";

const namespaced: boolean = true;

export const rootState: OrganizationState = {
  activeOrganization: null,
  organizations: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const mutations: MutationTree<OrganizationState> = {
  SET_ACTIVE_ORGANIZATION(state: OrganizationState, payload: Organization) {
    state.activeOrganization = payload;
  },
  SET_ORGANIZATIONS(state: OrganizationState, payload: Organization[]) {
    state.organizations = payload;
  },
  SET_IS_LOADING(state: OrganizationState, payload: boolean) {
    state.isLoading = payload;
  },
  SET_IS_SUCCESS(state: OrganizationState, payload: boolean) {
    state.isSuccess = payload;
  },
  SET_IS_ERROR(state: OrganizationState, payload: boolean) {
    state.isError = payload;
  },
};

export const actions: ActionTree<OrganizationState, RootState> = {
  async createOrganization(
    { commit, dispatch },
    { name, subdomain }
  ): Promise<CreateOrganizationResponse> {
    return new Promise(async (resolve, reject) => {
      const data = await new OrganizationsApi().createOrganization(
        name,
        subdomain
      );
      if (data.success) {
        commit("SET_ACTIVE_ORGANIZATION", data.data);
        resolve(data);
      } else {
        reject(false);
      }
    });
  },
  async getUserOrganizations({ commit, dispatch }) {
    commit("SET_IS_LOADING", true);
    const data = await new OrganizationsApi().getUserOrganizations();
    if (data.success) {
      commit("SET_IS_LOADING", false);
      commit("SET_IS_SUCCESS", true);
      commit("SET_ORGANIZATIONS", data.data);
      if (data.data.length === 1) {
        commit("SET_ACTIVE_ORGANIZATION", data.data[0]);
      }
    } else {
      commit("SET_IS_LOADING", false);
      commit("SET_IS_ERROR", true);
    }
  },
  async getOrganizationById({ commit, dispatch }, { organizationId }) {
    commit("SET_IS_LOADING", true);
    const data = await new OrganizationsApi().getOrganizationById(
      organizationId
    );
    if (data.success) {
      commit("SET_IS_LOADING", false);
      commit("SET_IS_SUCCESS", true);
      commit("SET_ACTIVE_ORGANIZATION", data.data);
    } else {
      commit("SET_IS_LOADING", false);
      commit("SET_IS_ERROR", true);
    }
  },
  async addUserToOrganization(
    { commit, dispatch },
    { userId, organizationId }
  ) {
    return new Promise(async (resolve, reject) => {
      const data = await new OrganizationsApi().addUserToOrganization(
        userId,
        organizationId
      );
      if (data.success) {
        resolve(data);
      } else {
        reject(false);
      }
    });
  },
};

export const organizations: Module<OrganizationState, RootState> = {
  namespaced,
  state: rootState,
  mutations,
  actions,
};
