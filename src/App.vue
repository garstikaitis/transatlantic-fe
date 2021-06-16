<template>
  <div
    id="app"
    class="bg-white overflow-hidden font-display"
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
      "https://education.studentpulse.io"
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
.tooltip {
  display: block !important;
  z-index: 10000;
  font-family: 'Inter';
  font-size: 0.7rem;

}

.tooltip .tooltip-inner {
  background: #5a67d8;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: #5a67d8;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
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
.w-max-content {
  width: max-content;
}
.pretty {
  cursor: pointer;
  input {
    @apply border rounded cursor-pointer;
  }
}
</style>
