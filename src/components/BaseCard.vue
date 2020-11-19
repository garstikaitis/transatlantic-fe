<template>
  <div class="bg-white p-4 rounded-lg shadow" v-on="$listeners">
    <slot name="title"></slot>
    <slot name="content"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ name: "base-card" })
export default class BaseCard extends Vue {}
</script>

<style scoped lang="scss"></style>
