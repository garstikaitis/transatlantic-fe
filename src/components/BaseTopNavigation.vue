<template>
  <div
    class="fixed top-0 bg-white w-screen p-5 flex z-50"
    style="left: 3.7rem;"
  >
    <div class="w-4/5 flex items-center">
      <i class="el-icon-search mr-2"></i
      ><input class="search-input" placeholder="Search your projects.." />
    </div>
    <div class="w-1/5 flex mr-16 cursor-pointer items-center justify-end">
      <base-context-menu
        :links="topNavigationLinks"
        @option-selected="handleNavigationOptionSelected"
      >
        <div
          slot="trigger"
          class="relative max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <img :src="userImage" class="w-8" />
        </div>
      </base-context-menu>
      <!-- <div
        v-if="showTooltip"
        class="mt-12 absolute rounded-lg bg-white p-3 shadow w-32"
        style="top: 20px;"
      >
        <div>
          <span>Hello {{ auth.user.firstName }}</span>
        </div>
        <hr class="my-4" />
        <div class="hover:text-green-600">Settings</div>
        <div @click="logout" class="hover:text-green-600 mt-2">Logout</div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, Mutation, State } from "vuex-class";
import { mapState, mapActions } from "vuex";
import { AuthState } from "@/types/auth";
import { Organization, OrganizationState } from "@/types/organizations";
import { Link } from "@/types/common";
// @ts-ignore
@Component({
  name: "base-top-navigation",
})
export default class BaseTopNavigation extends Vue {
  @State("auth") auth!: AuthState;
  @State("organizations") organizationState!: OrganizationState;

  @Getter("auth/userImage") userImage!: string;

  @Mutation("organizations/SET_ACTIVE_ORGANIZATION")
  SET_ACTIVE_ORGANIZATION!: (org: Organization) => void;

  @Action("logout", { namespace: "auth" })
  logout!: () => void;

  @Action("getUserOrganizations", { namespace: "organizations" })
  fetchUserOrganizations!: () => void;

  @Action("getOrganizationById", { namespace: "organizations" })
  getOrganizationById!: (input: { organizationId: number }) => void;

  showTooltip: boolean = false;
  topNavigationLinks: Link[] = [
    {
      name: "Profile",
      displayName: "Profile",
    },
    {
      name: "Logout",
      displayName: "Logout",
    },
  ];

  handleNavigationOptionSelected(option: Link) {}

  handleSelectedOrganization(organization: Organization) {
    this.getOrganizationById({ organizationId: organization.id });
  }
  hideTooltip() {
    this.showTooltip = false;
  }
  mounted() {
    this.fetchUserOrganizations();
  }
}
</script>

<style lang="scss" scoped>
.search-input {
  width: 100%;
  height: 100%;
  outline: none;
  font-weight: 600;
}
</style>
