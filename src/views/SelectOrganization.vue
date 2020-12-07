<template>
  <base-page :show-back="false" title="Your organizations">
    <ellipsis-loader
      slot="content-loading"
      :loading="organizations.isLoading || projects.isLoading"
      color="#268D81"
    ></ellipsis-loader>
    <div slot="content">
      <div class="mx-auto">
        <div class="space-y-12">
          <ul
            class="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
          >
            <li
              v-for="organization in organizations.organizations"
              :key="organization.id"
              @click="handleSetActiveOrganization(organization)"
            >
              <div class="space-y-4 cursor-pointer">
                <div class="aspect-w-3 aspect-h-2">
                  <img
                    class="object-cover shadow-lg rounded-lg"
                    :src="getCompanyLogo(organization.name)"
                    alt=""
                  />
                </div>

                <div class="space-y-2">
                  <div class="text-lg leading-6 font-medium space-y-1">
                    <h3>{{ organization.name }}</h3>
                    <p class="text-indigo-600">
                      https://transantlantic.com/{{ organization.subdomain }}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </base-page>
</template>

<script lang="ts">
import { Organization, OrganizationState } from "@/types/organizations";
import { ProjectsState } from "@/types/projects";
import { Component, Vue, Prop } from "vue-property-decorator";
import { Action, Mutation, State } from "vuex-class";
import axios from "axios";
import "@/utils/axios";
import router from "@/router";

@Component({ name: "SelectOrganization" })
export default class SelectOrganization extends Vue {
  @State("projects") projects!: ProjectsState;
  @State("organizations") organizations!: OrganizationState;

  @Action("getUserOrganizations", { namespace: "organizations" })
  getUserOrganizations!: () => void;

  @Mutation("organizations/SET_ACTIVE_ORGANIZATION")
  setActiveOrganization!: (organization: Organization) => void;

  getCompanyLogo(organizationName: string): string {
    return require("../assets/company_logo_placeholder.svg");
  }

  handleSetActiveOrganization(organization: Organization) {
    this.setActiveOrganization(organization);
    router.push({ name: "Dashboard" });
  }

  mounted() {
    this.getUserOrganizations();
  }
}
</script>
