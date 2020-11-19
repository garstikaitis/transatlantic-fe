<template>
  <base-page title="Create new project">
    <div slot="content">
      <base-input v-model="name" label="Project name" />
      <label class="text-sm mb-1 mt-8 block">Main language</label>
      <v-select
        class="mb-8"
        v-model="selectedMainLocale"
        :options="locales"
        label="name"
        :searchable="true"
      />
      <label class="text-sm mb-1">Project languages</label>
      <v-select
        v-model="selectedLocales"
        :options="locales"
        label="name"
        :multiple="true"
        :searchable="true"
        :close-on-select="false"
      />
      <base-button class="mt-8" @click="createProject">Save</base-button>
    </div>
  </base-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Locale } from "@/types/locales";
import LocalesApi from "@/api/locales-api";
import ProjectsApi from "@/api/projects-api";
import { State } from "vuex-class";
import { OrganizationState } from "@/types/organizations";
import router from "@/router";
@Component({})
export default class NewProject extends Vue {
  locales: Locale[] = [];
  selectedLocales: Locale[] = [];
  selectedMainLocale: Locale | null = null;
  name: string = "";
  @State("organizations") organizationsState!: OrganizationState;

  async createProject() {
    const localeIds = this.selectedLocales
      .filter((locale) => locale.id !== this.selectedMainLocale!.id)
      .map((locale) => locale.id);
    const { data, success } = await new ProjectsApi().createProject({
      name: this.name,
      localeIds,
      mainLocaleId: this.selectedMainLocale!.id,
      organizationId: this.organizationsState.activeOrganization!.id,
    });
    if (success) {
      router.push({ name: "Projects" });
    }
  }

  async mounted() {
    const { data } = await new LocalesApi().getAllLocales();
    this.locales = data;
  }
}
</script>
