import { CommonState, RootState } from "@/types/common";
import { Module, GetterTree, MutationTree } from "vuex";

const namespaced: boolean = true;

export const rootState: CommonState = {
  showPrompt: false,
};

export const getters: GetterTree<CommonState, RootState> = {
  showPrompt(state): boolean {
    return state.showPrompt;
  },
};

export const mutations: MutationTree<CommonState> = {
  SET_SHOW_PROMPT(state: CommonState, payload: boolean) {
    state.showPrompt = payload;
  },
};

export const common: Module<CommonState, RootState> = {
  namespaced,
  state: rootState,
  getters,
  mutations,
};
