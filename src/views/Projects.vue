<template>
  <base-page title="Projects">
    <template #top-button>
      <base-button>Create project</base-button>
    </template>
    <ellipsis-loader
      slot="content-loading"
      v-if="projects.isLoading"
    ></ellipsis-loader>
    <div
      class="flex flex-col items-center mt-8"
      slot="content-loading"
      v-if="projects.projects.length <= 0 && !projects.isLoading"
    >
      <img class="w-64" src="@/assets/not_found.svg" />
      <div class="mt-8">
        No projects created yet
      </div>
      <base-button class="mt-8">Create first project</base-button>
    </div>
    <div v-else slot="content">Projects</div>
  </base-page>
</template>

<script lang="ts">
import { Organization, OrganizationState } from "@/types/organizations";
import { ProjectsState } from "@/types/projects";
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";
@Component({ name: "projects" })
export default class Projects extends Vue {
  @State("organizations") organizations!: OrganizationState;
  @State("projects") projects!: ProjectsState;

  @Action("getProjects", { namespace: "projects" })
  getProjects!: (input: { organizationId: number }) => void;

  mounted() {
    setTimeout(() => {
      this.getProjects({
        organizationId: this.organizations.activeOrganization!.id,
      });
    }, 500);
  }
}
</script>
