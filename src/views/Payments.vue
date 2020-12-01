<template>
  <base-page title="Payments" :show-back="false">
    <div slot="content"></div>
  </base-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Mutation } from "vuex-class";

@Component({ name: "payments" })
export default class Payments extends Vue {}
</script>
<style lang="scss">
.blurred {
  filter: blur(10px);
}
.card {
  top: calc(50% - 30vh);
  left: calc(50% - 30vw);
  height: 60vh;
  width: 60vw;
}
</style>
