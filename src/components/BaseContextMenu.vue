<template>
  <div class="relative" v-on-clickaway="hideMenu">
    <div @click="isActive = !isActive">
      <slot name="trigger"></slot>
    </div>
    <!--
              Profile dropdown panel, show/hide based on dropdown state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
    <transition
      :appear="true"
      enter-active-class="transition ease-out duration-100 transform"
      enter-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75 transform"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-show="isActive"
        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        <router-link
          v-for="(link, index) in links"
          :key="index"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          :to="{ name: link.name }"
          @click="$emit('option-selected', link)"
        >
          {{ link.displayName }}
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
// @ts-ignore
import { directive as onClickaway } from "vue-clickaway";
import { Link } from "@/types/common";

@Component({ name: "base-context-menu", directives: { onClickaway } })
export default class BaseContextMenu extends Vue {
  @Prop({ default: [] }) links!: Link;
  isActive: boolean = false;
  hideMenu() {
    this.isActive = false;
  }
}
</script>
