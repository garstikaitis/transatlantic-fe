import { RootState } from "@/types/common";
import { Translation, TranslationsState } from "@/types/translations";
import { Module, MutationTree, ActionTree } from "vuex";
import TranslationsApi from "@/api/translations-api";
import router from "@/router";
import { UpdateTranslationRequest } from "@/types/requests";
const namespaced: boolean = true;

export const rootState: TranslationsState = {
  activeTranslation: null,
  translations: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const mutations: MutationTree<TranslationsState> = {
  SET_ACTIVE_TRANSLATION(state: TranslationsState, payload: Translation) {
    state.activeTranslation = payload;
  },
  SET_TRANSLATIONS(state: TranslationsState, payload: Translation[]) {
    state.translations = payload;
  },
  SET_IS_LOADING(state: TranslationsState, payload: boolean) {
    state.isLoading = payload;
  },
  SET_IS_SUCCESS(state: TranslationsState, payload: boolean) {
    state.isSuccess = payload;
  },
  SET_IS_ERROR(state: TranslationsState, payload: boolean) {
    state.isError = payload;
  },
};

export const actions: ActionTree<TranslationsState, RootState> = {
  async createTranslation(
    { commit, dispatch, state },
    { transKey, transValue, localeId, organizationId, userId, projectId }
  ) {
    commit("SET_IS_LOADING", true);
    const data = await new TranslationsApi().createTranslation({
      transKey,
      transValue,
      localeId,
      organizationId,
      userId,
      projectId,
    });
    if (data.success) {
      dispatch("getTranslations", projectId);
    }
    commit("SET_IS_LOADING", false);
  },
  async getTranslations({ commit }, projectId) {
    return new Promise(async (resolve, reject) => {
      commit("SET_IS_LOADING", true);
      const data = await new TranslationsApi().getTranslations(projectId);
      if (data.success) {
        commit("SET_TRANSLATIONS", data.data);
        resolve(true);
      }
      commit("SET_IS_LOADING", false);
      resolve(false);
    });
  },

  async updateTranslation(
    { dispatch },
    {
      transKey,
      transValue,
      localeId,
      organizationId,
      userId,
      projectId,
      translationId,
    }: UpdateTranslationRequest
  ) {
    const data = await new TranslationsApi().updateTranslation({
      translationId,
      transKey,
      transValue,
      localeId,
      organizationId,
      userId,
      projectId,
    });
    if (data.success) {
      dispatch("getTranslations", projectId);
    }
  },
};

export const translations: Module<TranslationsState, RootState> = {
  namespaced,
  state: rootState,
  mutations,
  actions,
};
