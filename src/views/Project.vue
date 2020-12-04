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
        @selected="handleSelectTranslations"
        @unselected="handleUnselectTranslations"
        v-for="(translationGroup, key) in translationsState.translations"
        :key="generateKey(key)"
        :translation-group="translationGroup"
        :translation-key="key"
      />
      <div
        class="fixed bottom-0 left-0 w-full p-3 bg-indigo-400 flex justify-between"
        v-if="selectedTranslations.length"
      >
        <div class="flex">
          <base-button
            @click="selectAllTranslations"
            class="flex items-center bg-white mr-2 ml-20"
            ><eva-icon name="checkmark-outline" class="w-8" fill="#fff" />
            Select all</base-button
          >
          <base-button
            @click="deselectAllTranslations"
            class="flex items-center bg-white mr-2"
            ><eva-icon name="folder-remove-outline" class="w-8" fill="#fff" />
            Deselect all</base-button
          >
        </div>
        <div>
          <base-button
            @click="showPrompt = true"
            class="flex items-center bg-white"
            ><eva-icon name="trash-2-outline" class="w-8" fill="#fff" />Delete
            {{ selectedTranslations.length }} translation pairs</base-button
          >
        </div>
      </div>
      <base-prompt
        v-if="showPrompt"
        @cancel="showPrompt = false"
        @proceed="handleDelete"
      >
        <template #header
          >Delete {{ selectedTranslations.length }} translations</template
        >
        <template #content
          >Are you sure you want to delete these translations? All of the data
          will be permanently removed from our servers forever. This action
          cannot be undone.</template
        >
        <template #cta>Delete</template>
      </base-prompt>
    </template>
  </base-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Translation, TranslationsState } from "@/types/translations";
import TranslationsApi from "@/api/translations-api";
import { Action, State } from "vuex-class";
import router from "@/router";
import { ProjectsState } from "@/types/projects";
@Component({ name: "project" })
export default class Proejct extends Vue {
  selectedTranslations: string[] = [];
  showPrompt: boolean = false;
  @State("translations") translationsState!: TranslationsState;
  @State("projects") projectsState!: ProjectsState;

  @Action("fetchProject", { namespace: "projects" })
  fetchProject!: (projectId: number) => void;

  @Action("getTranslations", { namespace: "translations" })
  getTranslations!: (input: {
    projectId: number;
    searchValue?: string;
  }) => void;

  @Action("deleteTranslations", { namespace: "translations" })
  deleteTranslations!: (input: { translationKeys: string[] }) => void;

  @Action("uploadTranslationsFromFile", { namespace: "translations" })
  uploadTranslationsFromFile!: (file: File) => void;

  navigateToCreateTranslation() {
    router.push({ name: "NewTranslation" });
  }

  deselectAllTranslations() {}

  selectAllTranslations() {}

  handleSelectTranslations(transKey: string) {
    this.selectedTranslations.push(transKey);
  }

  handleUnselectTranslations(transKey: string) {
    const index = this.selectedTranslations.findIndex(
      (translation) => translation === transKey
    );
    this.selectedTranslations.splice(index, 1);
  }

  handleDelete() {
    this.showPrompt = false;
    this.deleteTranslations({
      translationKeys: this.selectedTranslations,
    });
    this.selectedTranslations = [];
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
