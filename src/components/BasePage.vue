<template>
  <div>
    <base-top-navigation />
    <base-side-navigation />
    <div class="bg-gray-100 min-h-screen pt-20 pl-20 pr-5">
      <div class="w-full justify-between flex items-center mb-5 mt-4">
        <div class="flex items-center">
          <eva-icon
            v-if="showBack"
            class="mr-2 cursor-pointer"
            fill="#5a67d8"
            name="arrow-back-outline"
            @click="$router.back()"
          />
          <slot
            v-if="!!$slots.title"
            class="text-3xl font-extrabold tracking-tight sm:text-4xl"
            name="title"
          ></slot>
          <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl" v-else>
            {{ title }}
          </h1>
        </div>
        <slot name="top-button"></slot>
      </div>
      <slot name="content-not-found"></slot>
      <slot name="content-loading"></slot>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { OrganizationState } from "@/types/organizations";
import { ProjectsState } from "@/types/projects";
import { Component, Vue, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
@Component({ name: "base-page" })
export default class BasePage extends Vue {
  @Prop() title!: string;
  @Prop({ default: true }) showBack!: boolean;
  @State("organizations") organizations!: OrganizationState;
  @State("projects") projects!: ProjectsState;
}
</script>
