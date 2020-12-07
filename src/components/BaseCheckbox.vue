<template>
  <div
    class="border-2 border-gray-500 w-6 h-6 rounded flex justify-center items-center"
    :class="{ 'bg-indigo-600 border-indigo-600': value }"
    @click="$emit('input', !value)"
  >
    <eva-icon
      v-if="value"
      :fill="value ? '#fff' : 'transparent'"
      name="checkmark-outline"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ name: "base-checkbox" })
export default class BaseCheckbox extends Vue {
  @Prop() value!: boolean;
}
</script>
