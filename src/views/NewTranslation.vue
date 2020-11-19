<template>
  <base-page title="Create new project">
    <div slot="content">
      <base-input v-model="transKey" label="Translation key" />
      <base-input
        class="my-8"
        v-model="transValue"
        label="Base language value"
      />
      <base-button class="mt-8" @click="handleCreateTranslation"
        >Save</base-button
      >
    </div>
  </base-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { Action, State } from "vuex-class";
import { ProjectsState } from "@/types/projects";
import { CreateTranslationRequest } from "@/types/requests";
import { OrganizationState } from "@/types/organizations";
import { AuthState } from "@/types/auth";
@Component({ name: "new-translation" })
export default class NewTranslation extends Vue {
  transKey: string = "";
  transValue: string = "";
  @State("projects") projectsState!: ProjectsState;
  @State("organizations") organizationsState!: OrganizationState;
  @State("auth") authState!: AuthState;

  @Action("createTranslation", { namespace: "translations" })
  createTranslation!: (input: CreateTranslationRequest) => void;

  get mainLocaleId(): number {
    const mainLocale = this.projectsState.activeProject!.locales.find(
      (locale) => locale.pivot.isMainLocale
    );
    return mainLocale!.id;
  }

  async handleCreateTranslation() {
    this.createTranslation({
      transKey: this.transKey,
      transValue: this.transValue,
      localeId: this.mainLocaleId,
      organizationId: this.organizationsState.activeOrganization!.id,
      userId: this.authState.user!.id,
      projectId: this.projectsState.activeProject!.id,
    });
  }
}
</script>
