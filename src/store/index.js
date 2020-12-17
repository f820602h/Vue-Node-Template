const context = require.context("./modules", true, /.js/);
const modules = {};

context.keys().forEach(file => {
  let moduleName = file.replace(/(\.\/|\/index.js)/g, "");
  moduleName = moduleName.replace(/(\.\/|\.js)/g, "");
  moduleName = moduleName.replace(/([a-z|A-Z]+\/)/g, "");
  modules[moduleName] = context(file).default || context(file);
  modules[moduleName].namespaced = true;
});

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  actions: {},
  mutations: {}
});
