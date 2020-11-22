<template>
  <div id="app" class="p-4 bg-white">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
@tailwind base;
@tailwind components;
@tailwind utilities;
body {
  font-family: "Mukta";
}
.vs__dropdown-toggle {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.vs__clear {
  display: none;
}
.w-max-content {
  width: max-content;
}
</style>
