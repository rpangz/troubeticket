import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/css/main.css";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

// Install BootstrapVue
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueToast, {
  // One of the options
  position: "bottom-right",
  duration: 5000,
  dismissible: true,
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
