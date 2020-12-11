<template>
  <div class="flex flex-col">
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <div class="mt-1">
      <input
        :name="name"
        :type="type"
        :required="required"
        :placeholder="placeholder"
        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        @input="$emit('input', $event.target.value)"
        :value="value"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ name: "base-input" })
export default class BaseInput extends Vue {
  @Prop({ default: "" }) value!: string | number | null;
  @Prop({ default: "" }) name!: string | number | null;
  @Prop({ default: "" }) label!: string | number | null;
  @Prop({ default: "" }) placeholder!: string | number | null;
  @Prop({ default: false }) required!: boolean;
  @Prop({ default: "text" }) type!: string;
}
</script>

<style scoped lang="scss"></style>
