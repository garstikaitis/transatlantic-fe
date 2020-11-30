<template>
  <base-page title="Translations">
    <div class="flex items-center" slot="top-button">
      <input
        @change="handleFileChange"
        type="file"
        hidden
        id="actual-btn"
        accept="application/json"
      />
      <label class="upload-label mr-4" for="actual-btn">
        <eva-icon name="file-add-outline" fill="white" />
        Upload from file
      </label>
      <base-button @click="navigateToCreateTranslation">
        <eva-icon name="plus" fill="white" /> Create new</base-button
      >
    </div>
    <template #content>
      <base-translation-card
        :id="key"
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
  getTranslations!: (input: {
    projectId: number;
    searchValue?: string;
  }) => void;

  @Action("uploadTranslationsFromFile", { namespace: "translations" })
  uploadTranslationsFromFile!: (file: File) => void;

  navigateToCreateTranslation() {
    router.push({ name: "NewTranslation" });
  }

  handleFileChange(event: InputEvent) {
    // @ts-ignore
    this.uploadTranslationsFromFile(event!.target!.files![0]);
  }

  async mounted() {
    const searchValue = this.$route.query.searchValue;
    this.fetchProject(Number(this.$route.params.id));
    this.getTranslations({
      projectId: Number(this.$route.params.id),
      // @ts-ignore
      searchValue,
    });
  }
  generateKey(key: string) {
    return key.split(".").join("");
  }
}
</script>

<style lang="scss" scoped>
.upload-label {
  @apply .flex .justify-center .py-2 .px-4 .border .border-transparent .rounded-md .shadow-sm .text-sm .font-medium .text-white .bg-indigo-600 .cursor-pointer;
}
</style>
