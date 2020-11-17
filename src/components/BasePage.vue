<template>
  <div>
    <base-top-navigation />
    <base-side-navigation />
    <div
      class="bg-gray-100 min-h-screen pt-20 pl-20 pr-5 flex items-center justify-center"
      v-if="organizations.isLoading"
    >
      <ellipsis-loader :loading="organizations.isLoading" color="#268D81" />
    </div>
    <div class="bg-gray-100 min-h-screen pt-20 pl-20 pr-5" v-else>
      <div class="w-full justify-between flex items-center mb-5 mt-4">
        <slot v-if="!!$slots.title" name="title"></slot>
        <h1 class="font-bold text-gray-800 text-2xl font-body" v-else>
          {{ title }}
        </h1>
        <slot name="top-button"></slot>
      </div>
      <div
        v-if="!organizations.organization"
        class="w-full flex flex-col items-center justify-center"
      >
        <img src="@/assets/select_organization.svg" class="h-64 mb-8" />
        <div class="text-lg">To see the content please select organization</div>
      </div>
      <div v-else>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { OrganizationState } from "@/types/organizations";
import { Component, Vue, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
@Component({ name: "base-page" })
export default class BasePage extends Vue {
  @Prop() title!: string;
  @State("organizations") organizations!: OrganizationState;
}
</script>
