<template>
  <base-page title="Projects" :show-back="false">
    <template #top-button>
      <base-button @click="navigateToNewProject">Create project</base-button>
    </template>
    <ellipsis-loader
      slot="content-loading"
      v-if="projects.isLoading"
    ></ellipsis-loader>
    <div
      class="flex flex-col items-center mt-8"
      slot="content-not-found"
      v-else-if="projects.projects.length == 0"
    >
      <img class="w-64" src="@/assets/not_found.svg" />
      <div class="mt-8">
        No projects created yet
      </div>
      <base-button class="mt-8" @click="navigateToNewProject"
        >Create first project</base-button
      >
    </div>
    <div v-else slot="content" class="flex w-full">
      <div class="flex flex-col w-full overflow-visible">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Counts
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-50">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="project in projects.projects"
                    :key="project.id"
                    class="cursor-pointer"
                  >
                    <td
                      class="px-6 py-4 whitespace-nowrap"
                      @click="navigateToProject(project.id)"
                    >
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 pl-2 pt-2">
                          <eva-icon
                            class="h-10 w-10 rounded-full"
                            name="file-outline"
                            fill="#5a67d8"
                          />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            {{ project.name }}
                          </div>
                          <div class="text-sm text-gray-500">
                            Created
                            {{ formatTimeStamp(project.created_at) }} days ago
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap"
                      @click="navigateToProject(project.id)"
                    >
                      <div class="text-sm text-gray-900">
                        Total {{ project.translations.length }} translations
                      </div>
                      <div class="text-sm text-gray-500">
                        Total {{ project.locales.length }} locales
                      </div>
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap"
                      @click="navigateToProject(project.id)"
                    >
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                      >
                        Active
                      </span>
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                    >
                      <base-context-menu
                        @click="projectId = project.id"
                        :actions="actions"
                      >
                        <eva-icon
                          name="more-vertical-outline"
                          slot="trigger"
                          class="h-10 p-2 cursor-pointer bg-white hover:bg-indigo-100"
                          fill="#5a67d8"
                        />
                      </base-context-menu>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </base-page>
</template>

<script lang="ts">
import router from "@/router";
import { Organization, OrganizationState } from "@/types/organizations";
import { Project, ProjectsState } from "@/types/projects";
import { Component, Vue } from "vue-property-decorator";
import { Action, Mutation, State } from "vuex-class";
import { differenceInDays } from "date-fns";
// @ts-ignore
import { directive as onClickaway } from "vue-clickaway";
import { BaseContextAction } from "@/types/common";
@Component({ name: "projects", directives: { onClickaway } })
export default class Projects extends Vue {
  showTooltipIndex: number | null = null;
  projectId: number | null = null;
  actions: BaseContextAction[] = [
    {
      name: "ProjectDetails",
      displayName: "Details",
      params: {
        id: this.projectId,
      },
      type: "link",
    },
    {
      name: "DeleteProject",
      displayName: "Delete",
      type: "method",
      method: () => this.deleteProject(this.projectId!),
    },
  ];
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

  navigateToProjectDetails(id: number) {
    router.push({ name: "ProjectDetails", params: { id: id.toString() } });
  }

  hideTooltip() {
    this.showTooltipIndex = null;
  }

  formatTimeStamp(timestamp: string): number {
    return differenceInDays(Date.now(), new Date(timestamp));
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
