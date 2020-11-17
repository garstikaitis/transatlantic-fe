<template>
  <div
    v-on="$listeners"
    class="w-full bg-green-600 text-white text-center text-xl p-3 rounded-lg shadow cursor-pointer hover:bg-green-700 transition duration-100"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ name: "base-button" })
export default class BaseButton extends Vue {}
</script>

<style scoped lang="scss"></style>
