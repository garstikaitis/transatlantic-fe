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
import { State } from "vuex-class";
import { CommonState } from "./types/common";
@Component({ name: "App" })
export default class App extends Vue {
  @State("common") commonState!: CommonState;
  get pageIsNotLandingPage() {
    return this.$router.currentRoute.name !== "LandingPage";
  }
  mounted() {
    window.postMessage({ name: "loaded", value: true }, "*");
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
