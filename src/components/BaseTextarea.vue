<template>
  <textarea
    :name="name"
    rows="3"
    :value="value"
    @input="$emit('input', $event.target.value)"
    class="flex items-center justify-center base-textarea shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md border p-2"
  ></textarea>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ name: "base-textarea" })
export default class BaseTextarea extends Vue {
  @Prop({ default: "" }) value!: string | number | null;
  @Prop({ default: "" }) name!: string | number | null;
  @Prop({ default: 3 }) rows!: number;
}
</script>

<style scoped lang="scss">
.base-textarea {
  min-width: 32rem;
}
</style>
