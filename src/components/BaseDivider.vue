<template>
  <div class="divider">
    <span></span>
    <span class="text-gray-500 text-lg">
      <slot></slot>
    </span>
    <span></span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ name: "base-divider" })
export default class BaseDivider extends Vue {}
</script>

<style scoped lang="scss">
.divider {
  /* minor cosmetics */
  display: table;
  font-size: 24px;
  text-align: center;
  width: 75%; /* divider width */
}
.divider span {
  display: table-cell;
  position: relative;
}
.divider span:first-child,
.divider span:last-child {
  width: 50%;
  top: 13px; /* adjust vertical align */
  -moz-background-size: 100% 2px; /* line width */
  background-size: 100% 2px; /* line width */
  background-position: 0 0, 0 100%;
  background-repeat: no-repeat;
}
.divider span:first-child {
  /* color changes in here */
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 100%,
    from(transparent),
    to(#000)
  );
  background-image: -webkit-linear-gradient(180deg, transparent, #cbd5e0);
  background-image: -moz-linear-gradient(180deg, transparent, #cbd5e0);
  background-image: -o-linear-gradient(180deg, transparent, #cbd5e0);
  background-image: linear-gradient(90deg, transparent, #cbd5e0);
}
.divider span:nth-child(2) {
  padding: 0px 5px;
  width: auto;
  white-space: nowrap;
}
.divider span:last-child {
  /* color changes in here */
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 100%,
    from(#cbd5e0),
    to(transparent)
  );
  background-image: -webkit-linear-gradient(180deg, #cbd5e0, transparent);
  background-image: -moz-linear-gradient(180deg, #cbd5e0, transparent);
  background-image: -o-linear-gradient(180deg, #cbd5e0, transparent);
  background-image: linear-gradient(90deg, #cbd5e0, transparent);
}
</style>
