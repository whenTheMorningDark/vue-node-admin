import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export const constantRoutes = [{
    path: "/login",
    component: () => import("@/views/login/login"),
    hidden: true,
  },
  {
    path: "/home",
    component: () => import("@/views/home"),
    meta: {
      title: "首页"
    }
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  });

const router = createRouter();
export default router;