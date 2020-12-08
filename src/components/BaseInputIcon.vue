<template>
  <div>
    <div class="mt-1 relative rounded-md shadow-sm">
      <div
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <!-- Heroicon name: mail -->
        <eva-icon name="search-outline" fill="#a0aec0" />
      </div>
      <input
        :id="name"
        :name="name"
        :type="type"
        :required="required"
        :placeholder="placeholder"
        class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
        @input="$emit('input', $event.target.value)"
        :value="value"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ name: "base-input-icon" })
export default class BaseInputIcon extends Vue {
  @Prop({ default: "" }) value!: string | number | null;
  @Prop({ default: "" }) name!: string | number | null;
  @Prop({ default: "" }) label!: string | number | null;
  @Prop({ default: "" }) placeholder!: string | number | null;
  @Prop({ default: false }) required!: boolean;
  @Prop({ default: "text" }) type!: string;
}
</script>

<style scoped lang="scss"></style>
