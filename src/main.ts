import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "@/utils/register-components";
import { IframeEvent } from "./types/common";

Vue.config.productionTip = false;
window.onload = function() {};
// window.addEventListener(
//   "message",
//   function(event) {
//     console.log(event);
//   },
//   false
// );

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
