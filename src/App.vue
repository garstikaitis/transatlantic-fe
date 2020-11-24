<template>
  <div id="app" class="p-4 bg-white">
    <router-view />
  </div>
</template>

<script>
import store from "@/store";
import router from "./router";
export default {
  name: "App",
  async created() {
    window.addEventListener("message", async (event) => {
      // IMPORTANT: check the origin of the data!
      if (event.origin.startsWith("http://localhost:8081")) {
        // The data was sent from your site.
        // Data sent with postMessage is stored in event.data:
        const success = await store.dispatch(
          "translations/getTranslations",
          {
            projectId: store.state.projects.activeProject.id,
            searchValue: event.text,
          },
          { root: true }
        );
        if (this.$route.name !== "Project") {
          router.push({ name: "Project" });
        }
      } else {
        // The data was NOT sent from your site!
        // Be careful! Do not use it. This else branch is
        // here just for clarity, you usually shouldn't need it.
        return;
      }
    });
  },
};
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
</style>
