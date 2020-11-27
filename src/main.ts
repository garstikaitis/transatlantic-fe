import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "@/utils/register-components";
import { IframeEvent } from "./types/common";

Vue.config.productionTip = false;

window.onmessage = async (event: MessageEvent) => {
  // IMPORTANT: check the origin of the data!
  if (event.origin.startsWith("http://localhost:8080")) {
    const success = await store.dispatch(
      "translations/getTranslations",
      {
        projectId: store.state.projects.activeProject!.id,
        searchValue: event.data,
      },
      { root: true }
    );
    if (success) {
      if (router.currentRoute.name !== "Project") {
        router.push({ name: "Project" });
      }
    }
  } else {
    // The data was NOT sent from your site!
    // Be careful! Do not use it. This else branch is
    // here just for clarity, you usually shouldn't need it.
    return;
  }
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
