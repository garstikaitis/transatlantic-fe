<template>
  <div
    class="fixed top-0 bg-white w-screen p-5 flex z-40"
    style="left: 3.7rem;"
  >
    <div class="w-4/5 flex items-center">
      <i class="el-icon-search mr-2"></i
      ><input class="search-input" placeholder="Search your projects.." />
    </div>
    <div class="w-1/5 flex mr-16 cursor-pointer items-center justify-end">
      <base-context-menu :actions="topNavigationLinks">
        <div
          slot="trigger"
          class="relative max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span class="mr-2">Welcome, {{ auth.user.firstName }}</span>
          <img :src="userImage" class="w-8 rounded-full" />
        </div>
      </base-context-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, Mutation, State } from "vuex-class";
import { mapState, mapActions } from "vuex";
import { AuthState } from "@/types/auth";
import { Organization, OrganizationState } from "@/types/organizations";
import { BaseContextAction } from "@/types/common";
import { BaseResponse } from "@/types/responses";
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
  getOrganizationById!: (input: {
    organizationId: number;
  }) => Promise<BaseResponse>;

  showTooltip: boolean = false;
  get topNavigationLinks(): BaseContextAction[] {
    return [
      {
        name: "Profile",
        displayName: "Profile",
        type: "link",
      },
      {
        name: "SelectOrganization",
        displayName: "Organizations",
        type: "link",
      },
      {
        name: "Logout",
        displayName: "Logout",
        type: "method",
        method: () => this.logout(),
      },
    ];
  }

  async handleSelectedOrganization(organization: Organization) {
    const { success, data } = await this.getOrganizationById({
      organizationId: organization.id,
    });
    if (success) {
      this.SET_ACTIVE_ORGANIZATION(data);
    }
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
