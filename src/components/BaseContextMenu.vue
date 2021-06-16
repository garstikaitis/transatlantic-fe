<template>
  <div v-on="$listeners" class="relative" v-on-clickaway="hideMenu">
    <div @click="isActive = !isActive">
      <slot name="trigger"></slot>
    </div>
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
        class="origin-top-right absolute right-0 w-max-content rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        <div v-for="(action, index) in actions" :key="index">
          <router-link
            v-if="action.type === 'link'"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            role="menuitem"
            :to="{ name: action.name, params: { ...action.params } }"
          >
            {{ action.displayName }}
          </router-link>
          <div
            v-else
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            role="menuitem"
            @click="action.method"
          >
            {{ action.displayName }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
// @ts-ignore
import { directive as onClickaway } from "vue-clickaway";
import { BaseContextAction } from "@/types/common";

@Component({ name: "base-context-menu", directives: { onClickaway } })
export default class BaseContextMenu extends Vue {
  @Prop({ default: [] }) actions!: BaseContextAction;
  isActive: boolean = false;
  hideMenu() {
    this.isActive = false;
  }
}
</script>
