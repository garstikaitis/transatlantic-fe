<template>
  <div
    class="fixed top-0 bg-white w-screen p-5 flex z-50"
    style="left: 3.7rem;"
  >
    <div class="w-3/5 flex items-center">
      <i class="el-icon-search mr-2"></i
      ><input class="search-input" placeholder="Search your projects.." />
    </div>
    <div class="w-1/5 ml-8">
      <v-select
        label="name"
        @input="handleSelectedOrganization"
        :options="organizations"
        placeholder="Select organization"
      ></v-select>
    </div>
    <div
      class="w-1/5 flex justify-center mr-16 cursor-pointer items-center"
      @click="showTooltip = !showTooltip"
      v-on-clickaway="hideTooltip"
    >
      <div
        class="bg-blue-500 px-3 py-1 rounded-full text-white font-bold mr-2 relative"
      >
        {{ auth.user.firstName ? auth.user.firstName.substr(0) : "X" }}
      </div>
      <div
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter, Mutation, State } from "vuex-class";
import { mapState, mapActions } from "vuex";
import { AuthState } from "@/types/auth";
import { Organization, OrganizationState } from "@/types/organizations";
// @ts-ignore
import { directive as onClickaway } from "vue-clickaway";
// @ts-ignore
@Component({
  name: "base-top-navigation",
  directives: { onClickaway: onClickaway },
})
export default class BaseTopNavigation extends Vue {
  @State("auth") auth!: AuthState;
  @State("organizations") organizationState!: OrganizationState;
  @Getter("auth/userOrganizations") organizations!: Organization[];

  @Mutation("organizations/SET_ORGANIZATION")
  SET_ACTIVE_ORGANIZATION!: (org: Organization) => void;

  @Action("logout", { namespace: "auth" })
  logout!: () => void;

  @Action("getOrganizationById", { namespace: "organizations" })
  getOrganizationById!: (input: { organizationId: number }) => void;

  showTooltip: boolean = false;
  get selectedOrganization(): Organization | null {
    return this.organizationState.organization;
  }
  handleSelectedOrganization(organization: Organization) {
    this.getOrganizationById({ organizationId: organization.id });
  }
  hideTooltip() {
    this.showTooltip = false;
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
