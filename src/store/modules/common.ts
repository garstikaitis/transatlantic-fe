import {
  CommonState,
  Prompt,
  RootState,
  TransNotification,
} from "@/types/common";
import { Module, GetterTree, MutationTree } from "vuex";

const namespaced: boolean = true;

export const rootState: CommonState = {
  prompt: {
    show: false,
    title: "",
    description: "",
    action: () => {},
  },
  notification: {
    show: false,
    title: "",
    description: "",
  },
};

export const mutations: MutationTree<CommonState> = {
  SET_PROMPT(state: CommonState, payload: Prompt) {
    state.prompt = payload;
  },
  SET_NOTIFICATION(state: CommonState, notification: TransNotification) {
    state.notification = notification;
    if (notification.show) {
      setTimeout(() => {
        state.notification = {
          show: false,
          title: "",
          description: "",
        };
      }, 5000);
    }
  },
};

export const common: Module<CommonState, RootState> = {
  namespaced,
  state: rootState,
  mutations,
};
