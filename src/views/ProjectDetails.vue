<template>
  <base-page title="Project details">
    <base-button slot="top-button" @click="saveProject">Save</base-button>
    <div slot="content-loading" v-if="!projectToSave">
      <ellipsis-loader />
    </div>
    <div slot="content">
      <div>
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Project details
              </h3>
              <p class="mt-1 text-sm text-gray-600">
                This information consists of main details
              </p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div class="grid grid-cols-3 gap-6">
                    <div class="col-span-3 sm:col-span-2">
                      <base-input
                        v-model="projectToSave.name"
                        label="Project name"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200"></div>
        </div>
      </div>

      <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Locales
              </h3>
              <p class="mt-1 text-sm text-gray-600">
                Locales allow you to translated keys to different languages
              </p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <div class="flex mt-1">
                        <div
                          class="bg-indigo-600 text-white text-sm w-max-content p-2 rounded-lg mr-2"
                          v-for="locale in projectToSave.locales"
                          :key="locale.id"
                          :class="{ 'font-bold': locale.pivot.isMainLocale }"
                        >
                          {{ locale.name }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200"></div>
        </div>
      </div>

      <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                API keys
              </h3>
              <p class="mt-1 text-sm text-gray-600">
                When using 3rd party modules you will need API key.
              </p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div class="flex flex-col">
                    <div class="block text-sm flex items-center">
                      Project API keys
                      <base-button
                        @click="generateApiKey"
                        v-if="!apiKey.length"
                        class="ml-2"
                        >Add API key</base-button
                      >
                    </div>
                    <div v-if="apiKey.length">
                      API key -
                      <input
                        id="api-key"
                        readonly
                        class="outline-none cursor-default"
                        :value="apiKey"
                      />
                      <span
                        class="text-indigo-600 text-sm underline cursor-pointer ml-2"
                        @click="copyApiKeyToClipboard"
                        >Copy<eva-icon fill="#5a67d8" name="copy-outline"
                      /></span>
                    </div>
                    <div>Project ID -{{ projectsState.activeProject.id }}</div>
                    <div>
                      Organization ID -
                      {{ organizationState.activeOrganization.id }}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </base-page>
</template>

<script lang="ts">
import OrganizationsApi from "@/api/organizations-api";
import ProjectsApi from "@/api/projects-api";
import router from "@/router";
import { OrganizationState } from "@/types/organizations";
import { Project, ProjectsState } from "@/types/projects";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, State } from "vuex-class";
@Component({ name: "project-details" })
export default class ProjectDetails extends Vue {
  projectToSave: Project | null = null;
  apiKey: string = "";
  @State("projects") projectsState!: ProjectsState;
  @State("organizations") organizationState!: OrganizationState;

  @Action("fetchProject", { namespace: "projects" })
  fetchProject!: (projectId: string) => void;

  async generateApiKey() {
    const { data } = await new OrganizationsApi().generateApiKeyForProject(
      this.projectToSave!.id,
      this.organizationState.activeOrganization!.id
    );
    // @ts-ignore
    this.apiKey = data;
  }

  copyApiKeyToClipboard() {
    // @ts-ignore
    const copyText: HTMLInputElement = document.getElementById("api-key");

    /* Select the text field */
    copyText!.select();
    copyText!.setSelectionRange(0, 99999); /*For mobile devices*/

    document.execCommand("copy");
  }

  async saveProject() {
    const { success } = await new ProjectsApi().updateProject(
      this.projectToSave!.id,
      this.projectToSave!.name
    );
    if (success) {
      router.push({ name: "Projects" });
    }
  }

  async mounted() {
    this.fetchProject(this.$route.params.id);
    setTimeout(async () => {
      this.projectToSave = this.projectsState.activeProject;
      const { data } = await new OrganizationsApi().fetchApiKeyForProject(
        this.projectToSave!.id,
        this.organizationState.activeOrganization!.id
      );

      this.apiKey = data.key;
    }, 500);
  }
}
</script>
