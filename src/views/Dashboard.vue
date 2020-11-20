<template>
  <base-page :show-back="false" title="Dashboard">
    <div class="flex w-screen h-screen flex-col">
      Total translations
    </div>
  </base-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ClientApi from "@/api/client-api";
@Component({ name: "dashboard" })
export default class Dashboard extends Vue {
  async mounted() {
    const data = await new ClientApi().getAllLocales();
  }
}
</script>
