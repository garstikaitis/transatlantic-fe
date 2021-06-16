<template>
  <div
    class="fixed top-0 left-0 bg-white flex flex-col p-3 h-screen shadow z-50"
  >
    <img :src="logo" style="width: 40px;" class="mb-12 mt-2" />

    <router-link :to="{ name: 'Dashboard' }">
      <div class="mb-6 relative">
        <div v-if="$route.name === 'Dashboard'" class="activeIndicator"></div>
        <eva-icon
          class="w-8 h-8"
          style="width: 40px; height: 30px;"
          :height="35"
          :width="35"
          name="home-outline"
          :fill="$route.name === 'Dashboard' ? '#5a67d8' : '#a3bffa'"
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
          name="folder-outline"
          :fill="$route.name.includes('Project') ? '#5a67d8' : '#a3bffa'"
        ></eva-icon>
      </div>
    </router-link>
    <router-link :to="{ name: 'Payments' }">
      <div class="mb-6 relative">
        <div
          v-if="$route.name.includes('Payment')"
          class="activeIndicator"
        ></div>
        <eva-icon
          class="w-8 h-8"
          style="width: 40px; height: 30px;"
          :height="35"
          :width="35"
          name="pricetags-outline"
          :fill="$route.name.includes('Payment') ? '#5a67d8' : '#a3bffa'"
        ></eva-icon>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { AuthState } from "@/types/auth";
import { OrganizationState } from "@/types/organizations";
import { Vue, Component } from "vue-property-decorator";
import { State } from "vuex-class";

@Component({ name: "base-side-navigation" })
export default class BaseSideNavigation extends Vue {
  @State("auth") auth!: AuthState;
  @State("organizations") organizationState!: OrganizationState;

  get logo() {
    if (this.organizationState.activeOrganization) {
      if (this.organizationState.activeOrganization!.logo)
        return this.organizationState.activeOrganization.logo;
      else return require("@/assets/company_logo_placeholder.svg");
    }
  }
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
  background-color: #5a67d8;
}
</style>
