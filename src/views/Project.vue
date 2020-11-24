<template>
  <base-page title="Translations">
    <div class="flex items-center" slot="top-button">
      <button @click="scrollIntoView">scrollIntoView</button>
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

  scrollIntoView() {
    const element = document.getElementById("hello");
    element?.scrollIntoView();
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
  @apply .bg-green-600 .text-white .text-center .text-sm .p-3 .rounded-lg .shadow .cursor-pointer  .transition .duration-100 .flex .items-center .justify-center;
}
</style>
