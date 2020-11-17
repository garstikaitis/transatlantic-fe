import AuthApi from "@/api/auth-api";
import router from "@/router";
import { AuthState } from "@/types/auth";
import { RootState } from "@/types/common";
import { Organization } from "@/types/organizations";
import { User } from "@/types/user";
import Cookies from "js-cookie";
import { Module, GetterTree, MutationTree, ActionTree } from "vuex";

const namespaced: boolean = true;

export const rootState: AuthState = {
  user: null,
  token: null,
};

export const getters: GetterTree<AuthState, RootState> = {
  isAuthenticated(state): boolean {
    return !!state?.user;
  },
  userOrganizations(state): Organization[] {
    return state?.user?.organizations;
  },
};

export const mutations: MutationTree<AuthState> = {
  SET_USER(state: AuthState, payload: User) {
    state.user = payload;
  },
  SET_TOKEN(state: AuthState, payload: string) {
    state.token = payload;
  },
};

export const actions: ActionTree<AuthState, RootState> = {
  async authenticate({ commit, dispatch }, { email, password }) {
    const { data } = await new AuthApi().authenticate(email, password);
    Cookies.set("access_token", data.access_token);
    commit("SET_USER", data.user);
    commit("SET_TOKEN", data.access_token);
    if (data.user.onboardingCompleted) router.push({ name: "Dashboard" });
    else router.push({ name: "Onboarding" });
  },
  async register({ commit, dispatch }, { email, password }) {
    const { data } = await new AuthApi().register(email, password);
    Cookies.set("access_token", data.access_token);
    commit("SET_USER", data.user);
    commit("SET_TOKEN", data.access_token);
    if (data.user.onboardingCompleted) router.push({ name: "Dashboard" });
    else router.push({ name: "Onboarding" });
  },
  async logout({ commit, dispatch }) {
    const { success } = await new AuthApi().logout();
    if (success) {
      Cookies.remove("access_token");
      commit("SET_USER", null);
      commit("SET_TOKEN", null);
      router.push({ name: "Login" });
    }
  },
};

export const auth: Module<AuthState, RootState> = {
  namespaced,
  state: rootState,
  getters,
  mutations,
  actions,
};
