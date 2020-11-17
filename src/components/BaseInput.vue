<template>
  <div class="flex flex-col">
    <label class="text-sm mb-1" v-if="label">{{ label }}</label>
    <input
      @input="$emit('input', $event.target.value)"
      :type="type"
      :value="value"
      class="base-input focus:outline-none border px-2 py-3 shadow rounded-lg focus:border-green-400"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ name: "base-input" })
export default class BaseInput extends Vue {
  @Prop({ default: "" }) value!: string | number | null;
  @Prop({ default: "" }) label!: string | number | null;
  @Prop({ default: "text" }) type!: string;
}
</script>

<style scoped lang="scss"></style>
