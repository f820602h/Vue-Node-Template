import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/scss/main.scss";

import Icon from "@/components/Icon";

Vue.config.productionTip = false;

//載入icon圖檔
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context("./assets/icon", true, /\.svg$/);
requireAll(req);

Vue.component("icon", Icon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
