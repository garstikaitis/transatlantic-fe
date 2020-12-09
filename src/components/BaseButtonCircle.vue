<template>
  <div
    v-on="$listeners"
    class="py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer h-12 w-12"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ name: "base-button-circle" })
export default class BaseButtonCircle extends Vue {}
</script>

<style scoped lang="scss"></style>
