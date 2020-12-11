<template>
  <base-page :show-back="false" title="Your organizations">
    <div v-if="userIsSuperAdmin" slot="top-button">
      <base-button @click="redirectToCreateOrganization"
        >Create organization</base-button
      >
    </div>
    <ellipsis-loader
      slot="content-loading"
      :loading="organizations.isLoading || projects.isLoading"
      color="#268D81"
    ></ellipsis-loader>
    <div slot="content">
      <ul
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <li
          v-for="organization in organizations.organizations"
          :key="organization.id"
          class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 border border-transparent"
          :class="{
            'border border-indigo-500':
              organizations.activeOrganization &&
              organizations.activeOrganization.id === organization.id,
          }"
        >
          <div class="flex-1 flex flex-col p-8">
            <img
              class="w-32 h-32 flex-shrink-0 mx-auto bg-white rounded-full"
              :src="getCompanyLogo(organization)"
              alt=""
            />
            <h3 class="mt-6 text-gray-900 text-sm font-medium">
              {{ organization.name }}
            </h3>
            <dl class="mt-1 flex-grow flex flex-col justify-between">
              <dt class="sr-only">Title</dt>
              <dd class="text-gray-500 text-sm">Something</dd>
              <dt class="sr-only">Role</dt>
              <dd class="mt-3">
                <span
                  class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full"
                  >Something role</span
                >
              </dd>
            </dl>
          </div>
          <div>
            <div class="-mt-px flex divide-x divide-gray-200">
              <div
                class="w-0 flex-1 flex cursor-pointer"
                @click="handleSetActiveOrganization(organization)"
              >
                <div
                  class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-indigo-500"
                >
                  <eva-icon
                    v-if="
                      organizations.activeOrganization &&
                        organizations.activeOrganization.id === organization.id
                    "
                    name="checkmark-outline"
                    fill="#5a67d8"
                  />
                  <span class="ml-3"
                    >{{
                      organizations.activeOrganization &&
                      organizations.activeOrganization.id === organization.id
                        ? "Selected"
                        : "Set as active"
                    }}
                  </span>
                </div>
              </div>
              <div
                class="-ml-px w-0 flex-1 flex cursor-pointer"
                @click="redirectToEditOrganization(organization)"
              >
                <div
                  class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-indigo-500"
                >
                  <!-- Heroicon name: phone -->
                  <eva-icon name="edit-outline" fill="#5a67d8" />
                  <div class="ml-3">
                    Edit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </base-page>
</template>

<script lang="ts">
import { Organization, OrganizationState } from "@/types/organizations";
import { ProjectsState } from "@/types/projects";
import { Component, Vue, Prop } from "vue-property-decorator";
import { Action, Getter, Mutation, State } from "vuex-class";
import axios from "axios";
import "@/utils/axios";
import router from "@/router";
import { ro } from "date-fns/locale";

@Component({ name: "SelectOrganization" })
export default class SelectOrganization extends Vue {
  @State("projects") projects!: ProjectsState;
  @State("organizations") organizations!: OrganizationState;
  @Getter("auth/userIsSuperAdmin") userIsSuperAdmin!: boolean;

  @Action("getUserOrganizations", { namespace: "organizations" })
  getUserOrganizations!: () => void;

  @Mutation("organizations/SET_ACTIVE_ORGANIZATION")
  setActiveOrganization!: (organization: Organization) => void;

  getCompanyLogo(organization: Organization): string {
    console.log(organization);
    return organization.logo
      ? organization.logo
      : require("../assets/company_logo_placeholder.svg");
  }

  handleSetActiveOrganization(organization: Organization) {
    this.setActiveOrganization(organization);
    router.push({ name: "Dashboard" });
  }

  redirectToCreateOrganization() {
    router.push({ name: "CreateOrganization" });
  }

  redirectToEditOrganization(organization: Organization) {
    router.push({
      name: "EditOrganization",
      params: { id: organization.id.toString() },
    });
  }

  mounted() {
    this.getUserOrganizations();
  }
}
</script>
