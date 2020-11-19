<template>
  <div class="fixed top-0 left-0 bg-white flex flex-col p-3 h-screen shadow">
    <img
      :src="require('../assets/logo.png')"
      style="width: 40px;"
      class="mb-12 mt-2"
    />

    <router-link :to="{ name: 'Dashboard' }">
      <div class="mb-6 relative">
        <div v-if="$route.name === 'Dashboard'" class="activeIndicator"></div>
        <eva-icon
          class="w-8 h-8"
          style="width: 40px; height: 30px;"
          :height="35"
          :width="35"
          name="layers-outline"
          :fill="$route.name === 'Dashboard' ? '#268D81' : '#6ABAB1'"
        ></eva-icon>
      </div>
    </router-link>
    <router-link :to="{ name: 'Projects' }">
      <div class="mb-6 relative">
        <div
          v-if="$route.name.includes('Project')"
          class="activeIndicator"
        ></div>
        <eva-icon
          class="w-8 h-8"
          style="width: 40px; height: 30px;"
          :height="35"
          :width="35"
          name="pantone-outline"
          :fill="$route.name.includes('Project') ? '#268D81' : '#6ABAB1'"
        ></eva-icon>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { AuthState } from "@/types/auth";
import { Vue, Component } from "vue-property-decorator";
import { State } from "vuex-class";

@Component({ name: "base-side-navigation" })
export default class BaseSideNavigation extends Vue {
  @State("auth") auth!: AuthState;
}
</script>

<style scoped>
.activeIcon {
  color: #6c63ff;
}
.activeIndicator {
  position: absolute;
  top: 0;
  right: -12px;
  height: 100%;
  width: 3px;
  background-color: #268d81;
}
</style>
