import Vue from "vue";
import store from "@/store";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import pipelineMiddleware from "@/middleware/pipeline";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }

  const middleware = to.meta.middleware;
  const context = { to, from, next, store };

  return middleware[0]({
    ...context,
    next: pipelineMiddleware(context, middleware, 1)
  });
});

export default router;
