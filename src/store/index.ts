import Vue from "vue";
import Vuex from "vuex";
import { auth } from "@/store/modules/auth";
import { organizations } from "@/store/modules/organizations";
import { projects } from "@/store/modules/projects";
import { translations } from "@/store/modules/translations";
import { common } from "@/store/modules/common";
import vuexPersist from "@/utils/persist";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    organizations,
    projects,
    translations,
    common,
  },
  plugins: [vuexPersist.plugin],
});
