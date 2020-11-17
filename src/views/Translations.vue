<template>
  <base-page title="Translations">
    123
  </base-page>
</template>

<script lang="ts">
import { Organization } from "@/types/organizations";
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
@Component({ name: "translations" })
export default class Translations extends Vue {
  @State("organizations") organizations!: Organization[];
}
</script>
