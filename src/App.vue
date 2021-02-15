<template>
  <div
    id="app"
    class="bg-white overflow-hidden"
    :class="{ 'p-4': pageIsNotLandingPage }"
  >
    <base-notification v-if="commonState.notification.show" />
    <base-prompt v-if="commonState.prompt.show" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import router from "./router";
import { CommonState } from "./types/common";
@Component({ name: "App" })
export default class App extends Vue {
  @State("common") commonState!: CommonState;
  @Action("getTranslations", { namespace: "translations" })
  getTranslations!: (input: {
    projectId: number;
    page: number;
    searchValue?: string;
  }) => Promise<boolean>;
  get pageIsNotLandingPage() {
    return this.$router.currentRoute.name !== "LandingPage";
  }
  listenForInit() {
    window.addEventListener("message", (event) => {
      if (event.data.type === "LOCASE__INIT_START") {
        this.getTranslations({
          projectId: event.data.value.projectId,
          page: 1,
        }).then((success) => {
          if (success)
            router.push({
              name: "Project",
              params: { id: event.data.value.projectId },
            });
        });
      }
    });
  }
  listenForTranslationSearch() {
    window.addEventListener("message", (event) => {
      if (event.data.type === "LOCASE__SEARCH_TRANSLATION") {
        console.log(event.data.value.searchValue);
        this.getTranslations({
          projectId: event.data.value.projectId,
          page: 1,
          searchValue: event.data.value.searchValue,
        }).then((success) => {
          if (success)
            router.push({
              name: "Project",
              params: { id: event.data.value.projectId },
            });
        });
      }
    });
  }
  postLoadedMessage() {
    window.parent.postMessage(
      {
        type: "LOCASE__LOADED",
        value: true,
      },
      "https://education.studentpulsestaging.com"
    );
  }
  created() {
    this.listenForInit();
    this.listenForTranslationSearch();
    this.postLoadedMessage();
  }
}
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
@tailwind base;
@tailwind components;
@tailwind utilities;
body {
  font-family: "Mukta";
}
.vs__dropdown-toggle {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.vs__clear {
  display: none;
}
.w-max-content {
  width: max-content;
}
.w-min-content {
  width: min-content;
}
.pretty {
  cursor: pointer;
  input {
    @apply border rounded cursor-pointer;
  }
}
</style>
