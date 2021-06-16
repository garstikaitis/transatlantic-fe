<template>
    <div class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({ name: "base-tag" })
export default class BaseTag extends Vue {
}
</script>
</script>