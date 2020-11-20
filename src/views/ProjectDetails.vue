<template>
  <base-page title="Project details">
    <base-button slot="top-button" @click="saveProject">Save</base-button>
    <div slot="content-loading" v-if="!projectToSave">
      <ellipsis-loader />
    </div>
    <div slot="content" v-else>
      <base-input v-model="projectToSave.name" label="Project name" />
      <div class="flex flex-col">
        <label class="mt-8 block text-sm">Project locales</label>
        <div class="flex mt-1">
          <div
            class="bg-green-600 text-white text-sm w-max-content p-2 rounded-lg mr-2"
            v-for="locale in projectToSave.locales"
            :key="locale.id"
            :class="{ 'font-bold': locale.pivot.isMainLocale }"
          >
            {{ locale.name }}
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="mt-8 block text-sm flex items-center">
          Project API keys
          <base-button
            @click="generateApiKey"
            v-if="!apiKey.length"
            class="ml-2"
            >Add API key</base-button
          >
        </div>
        <div>Project id - {{ projectToSave.id }}</div>
        <div v-if="apiKey.length">
          API key -
          <input
            id="api-key"
            readonly
            class="outline-none cursor-default"
            :value="apiKey"
          />
          <span
            class="text-green-600 text-sm underline cursor-pointer"
            @click="copyApiKeyToClipboard"
            >Copy</span
          >
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
    this.apiKey = data;
  }

  copyApiKeyToClipboard() {
    // @ts-ignore
    const copyText: HTMLInputElement = document.getElementById("api-key");

    /* Select the text field */
    copyText!.select();
    copyText!.setSelectionRange(0, 99999); /*For mobile devices*/

    document.execCommand("copy");

    alert("Copied the text: " + copyText.value);
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
      // @ts-ignore
      this.apiKey = data.key;
    }, 500);
  }
}
</script>
