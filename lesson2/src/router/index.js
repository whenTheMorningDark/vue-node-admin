import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
// {
//   path: "/Student/addStudent",
//   name: "addStudent",
//   component: () => import("@/views/Student/addStudent"),
//   meta: {
//     title: "增加学生"
//   }
// }
// {
//   path: "/Student/addStudent",
//   name: "addStudent",
//   component: resolve => require(["@/views/Student/addStudent"], resolve),
//   meta: {
//     title: "增加学生"
//   }
// }
export const constantRoutes = [{
  path: "/redirect/:path*",
  component: () => import("@/views/redirect/index"),
}, {
  path: "/login",
  name: "login",
  component: () => import("@/views/login/login")
}, {
  path: "/home",
  name: "home",
  component: () => import("@/views/home"),
  meta: {
    title: "首页"
  }
}, {
  path: "/404",
  name: "error",
  component: () => import("@/views/error"),
}, {
  path: "*",
  redirect: "/404"
}]; // 添加];
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