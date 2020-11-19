<template>
  <base-page title="Translations">
    <template #top-button>
      <base-button @click="navigateToCreateTranslation">
        <eva-icon name="plus" fill="white" /> Create new</base-button
      >
    </template>
    <template #content>
      <base-translation-card
        v-for="(translationGroup, key) in translationsState.translations"
        :key="generateKey(key)"
        :translation-group="translationGroup"
        :translation-key="key"
      />
    </template>
  </base-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Translation, TranslationsState } from "@/types/translations";
import TranslationsApi from "@/api/translations-api";
import { Action, State } from "vuex-class";
import router from "@/router";
@Component({ name: "project" })
export default class Proejct extends Vue {
  @State("translations") translationsState!: TranslationsState;

  @Action("fetchProject", { namespace: "projects" })
  fetchProject!: (projectId: number) => void;

  @Action("getTranslations", { namespace: "translations" })
  getTranslations!: (projectId: number) => void;

  navigateToCreateTranslation() {
    router.push({ name: "NewTranslation" });
  }

  async mounted() {
    this.fetchProject(Number(this.$route.params.id));
    this.getTranslations(Number(this.$route.params.id));
  }
  generateKey(key: string) {
    return key.split(".").join("");
  }
}
</script>
