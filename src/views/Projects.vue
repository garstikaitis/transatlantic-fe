<template>
  <base-page title="Projects">
    <template #top-button>
      <base-button @click="navigateToNewProject">Create project</base-button>
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
      <base-button class="mt-8" @click="navigateToNewProject"
        >Create first project</base-button
      >
    </div>
    <div v-else slot="content" class="flex">
      <base-card
        v-for="project in projects.projects"
        class="mr-4 mb-4 w-1/3 cursor-pointer"
        :key="project.id"
      >
        <div slot="title">
          <div class="flex w-full justify-between items-center">
            <h1 class="text-3xl" @click="navigateToProject(project.id)">
              {{ project.name }}
            </h1>
            <div
              class="p-2 hover:bg-gray-200 flex items-center justify-center rounded transition duration-100 relative"
            >
              <eva-icon
                @click="showTooltip = true"
                name="more-vertical-outline"
                fill="#268D81"
              ></eva-icon>
              <div
                v-if="showTooltip"
                class="absolute bg-white border menu-tooltip rounded p-2 shadow w-max-content"
                v-on-clickaway="hideTooltip"
              >
                <div
                  class="text-sm hover:text-green-600"
                  @click="deleteProject(project.id)"
                >
                  Delete project
                </div>
              </div>
            </div>
          </div>
          <div class="flex" @click="navigateToProject(project.id)">
            <div
              class="bg-green-600 text-white text-sm w-max-content p-2 rounded-lg mr-2"
              v-for="locale in project.locales"
              :key="locale.id"
            >
              {{ locale.iso }} - {{ locale.name }}
            </div>
          </div>
        </div>
      </base-card>
    </div>
  </base-page>
</template>

<script lang="ts">
import router from "@/router";
import { Organization, OrganizationState } from "@/types/organizations";
import { Project, ProjectsState } from "@/types/projects";
import { Component, Vue } from "vue-property-decorator";
import { Action, Mutation, State } from "vuex-class";
// @ts-ignore
import { directive as onClickaway } from "vue-clickaway";
@Component({ name: "projects", directives: { onClickaway } })
export default class Projects extends Vue {
  showTooltip: boolean = false;
  @State("organizations") organizations!: OrganizationState;
  @State("projects") projects!: ProjectsState;

  @Action("getProjects", { namespace: "projects" })
  getProjects!: (input: { organizationId: number }) => void;

  @Action("deleteProject", { namespace: "projects" })
  deleteProject!: (projectId: number) => void;

  navigateToNewProject() {
    router.push({ name: "NewProject" });
  }

  navigateToProject(id: number) {
    router.push({ name: "Project", params: { id: id.toString() } });
  }

  hideTooltip() {
    this.showTooltip = false;
  }

  mounted() {
    setTimeout(() => {
      this.getProjects({
        organizationId: this.organizations.activeOrganization!.id,
      });
    }, 500);
  }
}
</script>

<style>
.menu-tooltip {
  bottom: -25px;
  left: 50%;
}
</style>
