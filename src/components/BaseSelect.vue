<template>
  <div class="mt-6">
    <label class="text-sm mb-1" v-if="label">{{ label }}</label>
    <v-select :options="options" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ name: "base-input" })
export default class BaseButton extends Vue {
  @Prop() label!: string;
  @Prop() options!: any;
}
</script>

<style scoped lang="scss"></style>
