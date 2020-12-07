<template>
  <div class="mb-8 bg-white p-4 shadow rounded-lg">
    <div
      class="text-indigo-500 font-semibold mb-4 flex cursor-pointer flex items-center"
    >
      <base-checkbox
        class="mr-2"
        :value="translationIsSelected"
        @input="handleSelect"
      />
      <span @click="handleSelect(!translationIsSelected)">{{
        translationKey.toUpperCase()
      }}</span>
    </div>
    <div class="flex flex-col">
      <div
        class="flex mb-2"
        v-for="(locale, key) in translationsMerged"
        :key="locale.id"
      >
        <div class="w-64" :class="{ 'font-bold': locale.isMainLocale }">
          {{ locale.locale }}
        </div>
        <div
          class="max-w-lg cursor-pointer"
          v-if="keyToEdit !== key"
          @click="makeEditable(key, locale.value)"
        >
          {{ locale.value }}
        </div>
        <div class="flex" v-else v-on-clickaway="setEditableKeyToNull">
          <base-input
            :value="translationValueBeforeEdit"
            @input="handleUpdateTranslation"
          />
          <base-button @click="saveTranslation(locale.localeId)" class="ml-2"
            >Save</base-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ProjectsState } from "@/types/projects";
import { Translation, TranslationsState } from "@/types/translations";
import { Component, Vue, Prop } from "vue-property-decorator";
import { Action, Mutation, State } from "vuex-class";
import _uniqBy from "lodash/uniqBy";
import { IRenderTranslation } from "@/types/common";
// @ts-ignore
import { directive as onClickaway } from "vue-clickaway";
import { OrganizationState } from "@/types/organizations";
import { AuthState } from "@/types/auth";
import {
  CreateTranslationRequest,
  UpdateTranslationRequest,
} from "@/types/requests";
import { update } from "lodash";

@Component({
  name: "base-translation-card",
  directives: { onClickaway: onClickaway },
})
export default class BaseTranslationCard extends Vue {
  selectedTranslations: [] = [];

  @Prop() translationGroup!: Translation[];
  @Prop() translationKey!: string;
  @State("projects") projectsState!: ProjectsState;
  @State("translations") translationsState!: TranslationsState;
  @State("organizations") organizationsState!: OrganizationState;
  @State("auth") authState!: AuthState;

  @Action("updateTranslation", { namespace: "translations" })
  updateTranslation!: (input: UpdateTranslationRequest) => void;

  @Action("createTranslation", { namespace: "translations" })
  createTranslation!: (input: CreateTranslationRequest) => void;

  @Mutation("translations/SET_SELECTED_TRANSLATIONS")
  setSelectedTranslations!: (translations: string[]) => void;

  keyToEdit: string | null = null;
  translationValueBeforeEdit: string = "";
  translationValueAfterEdit: string = "";

  get translationIsSelected() {
    return this.translationsState.selectedTranslations.includes(
      this.translationKey
    );
  }

  makeEditable(key: string, oldValue: string) {
    this.translationValueBeforeEdit = oldValue;
    this.keyToEdit = key;
  }

  handleUpdateTranslation(value: string) {
    this.translationValueAfterEdit = value;
  }

  handleSelect(data: boolean) {
    const currentSelections = this.translationsState.selectedTranslations;
    if (data) {
      currentSelections.push(this.translationKey);
    } else {
      const index = currentSelections.findIndex(
        (key) => key === this.translationKey
      );
      currentSelections.splice(index, 1);
    }
    this.setSelectedTranslations(currentSelections);
  }

  saveTranslation(localeId: number) {
    const translation = this.translationsState.translations[
      this.translationKey
    ].find(
      (translation) =>
        translation.transValue === this.translationValueBeforeEdit
    )!;
    let input: UpdateTranslationRequest = {
      transKey: this.translationKey,
      transValue: this.translationValueAfterEdit,
      localeId: localeId,
      organizationId: this.organizationsState.activeOrganization!.id,
      userId: this.authState.user!.id,
      projectId: this.projectsState.activeProject!.id,
    };
    if (translation) {
      input.translationId = translation.id;
      this.updateTranslation(input);
    } else {
      this.createTranslation(input);
    }
    this.translationValueBeforeEdit = "";
    this.translationValueAfterEdit = "";
    this.keyToEdit = null;
  }

  setEditableKeyToNull() {
    this.keyToEdit = null;
  }

  get translationsMerged() {
    const obj: IRenderTranslation = {};
    const mainLocale = this.projectsState.activeProject!.locales.find(
      (locale) => locale.pivot.isMainLocale
    );
    this.translationGroup.forEach((translation) => {
      obj[translation.locale.iso] = {
        translationId: translation.id,
        value: translation.transValue,
        locale: translation.locale.name,
        localeId: translation.localeId,
        isMainLocale: translation.localeId === mainLocale!.id,
      };
    });
    this.projectsState.activeProject!.locales.forEach((locale) => {
      if (!obj[locale.iso]) {
        obj[locale.iso] = {
          translationId: null,
          value: "Empty",
          locale: locale.name,
          localeId: locale.id,
          isMainLocale: locale.id === mainLocale!.id,
        };
      }
    });
    return obj;
  }
}
</script>

<style scoped lang="scss"></style>
