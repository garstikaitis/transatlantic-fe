import { Pagination, RootState } from "@/types/common";
import { Translation, TranslationsState } from "@/types/translations";
import { Module, MutationTree, ActionTree } from "vuex";
import TranslationsApi from "@/api/translations-api";
import _groupBy from "lodash/groupBy";
import { UpdateTranslationRequest } from "@/types/requests";
const namespaced: boolean = true;

export const rootState: TranslationsState = {
  activeTranslation: null,
  // @ts-ignore
  translations: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  selectedTranslations: [],
  searchTerm: "",
  allTranslations: [],
  pagination: {
    totalPages: 0,
    currentPage: 0,
  },
};

export const mutations: MutationTree<TranslationsState> = {
  SET_ACTIVE_TRANSLATION(state: TranslationsState, payload: Translation) {
    state.activeTranslation = payload;
  },
  SET_TRANSLATIONS(state: TranslationsState, payload: Translation[]) {
    // @ts-ignore
    state.translations = payload;
  },
  SET_SELECTED_TRANSLATIONS(state: TranslationsState, payload: Translation[]) {
    // @ts-ignore
    state.selectedTranslations = payload;
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
  SET_PAGINATION(state: TranslationsState, payload: Pagination) {
    state.pagination = payload;
  },
  SET_SEARCH_TERM(state: TranslationsState, payload: string) {
    state.searchTerm = payload;
  },
  SET_ALL_TRANSLATIONS(state: TranslationsState, payload: Translation[]) {
    state.allTranslations = payload;
  },
};

export const actions: ActionTree<TranslationsState, RootState> = {
  async deleteTranslations({ dispatch, commit, rootState, state }) {
    const projectId = rootState.projects.activeProject!.id.toString();
    const translationKeys = state.selectedTranslations;
    commit("SET_IS_LOADING", true);
    await new TranslationsApi().deleteTranslations(projectId, translationKeys);
    await dispatch("getTranslations", {
      projectId: projectId,
    });
    commit("SET_SELECTED_TRANSLATIONS", []);
    commit(
      "common/SET_NOTIFICATION",
      {
        show: true,
        title: "Succesfully deleted",
        description: "Deleted translations are no longer available",
      },
      { root: true }
    );
    commit(
      "common/SET_PROMPT",
      {
        show: false,
        title: "",
        description: "",
        action: () => {},
      },
      { root: true }
    );
    commit("SET_IS_LOADING", false);
  },
  async uploadTranslationsFromFile({ commit, state, rootState }, file) {
    commit("SET_IS_LOADING", true);
    const {
      data,
      success,
    } = await new TranslationsApi().uploadTranslationsFromFile({
      file,
      projectId: rootState.projects.activeProject!.id.toString(),
      organizationId: rootState.organizations.activeOrganization!.id.toString(),
    });
    if (success) {
      commit("SET_TRANSLATIONS", data);
    }
    commit("SET_IS_LOADING", false);
  },
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
      // TODO: fix data population instead of reload
      window.location.reload();
    }
    commit("SET_IS_LOADING", false);
  },
  async getTranslations({ commit, state }, { projectId, page, searchValue }) {
    return new Promise(async (resolve, reject) => {
      commit("SET_IS_LOADING", true);
      let valueToSearch = "";
      if (searchValue) {
        valueToSearch = searchValue;
      } else {
        valueToSearch = state.searchTerm;
      }
      const data = await new TranslationsApi().getTranslations(
        projectId,
        valueToSearch,
        page
      );
      if (data.success) {
        let results = data.data.results;
        if (state.searchTerm.length) {
          const allTranslations: Translation[] = [];
          const keys = Object.keys(data.data.results);
          keys.forEach((key) => {
            data.data.results[key].forEach((translation) => {
              allTranslations.push(translation);
            });
          });
          // @ts-ignore
          const sortedTranslations = allTranslations.sort((a, b) => {
            if (a.sortingRank! > b.sortingRank!) return -1;
            if (a.sortingRank! < b.sortingRank!) return 1;
            if (a.sortingRank! === b.sortingRank!) return 0;
          });
          results = _groupBy(sortedTranslations, "transKey");
        }
        commit("SET_TRANSLATIONS", results);
        commit("SET_PAGINATION", data.data.pagination);
        resolve(true);
      }
      commit("SET_IS_LOADING", false);
      resolve(false);
    });
  },

  async getAllTranslations({ commit }, projectId) {
    commit("SET_IS_LOADING", true);
    const data = await new TranslationsApi().getAllTranslations(projectId);
    if (data.success) {
      commit("SET_ALL_TRANSLATIONS", data.data);
    }
    commit("SET_IS_LOADING", false);
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
      // TODO: fix data population instead of reload
      window.location.reload();
    }
  },
};

export const translations: Module<TranslationsState, RootState> = {
  namespaced,
  state: rootState,
  mutations,
  actions,
};
