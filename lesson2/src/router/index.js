import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout/index'
Vue.use(Router)
export const constRouter = [{
  path: '/',
  component: layout,
  redirect: '/home',
  meta: {
    title: '主页'
  },
  children: [{
    path: 'home',
    name: 'Home',
    component: () => import('@/views/home/index'),
    meta: {
      title: '首页'
    },
  }]
}, {
  path: '/register',
  name: 'register',
  component: () => import('@/views/register/index'),
  meta: {
    title: '主播孵化平台报名表'
  },
}]
export const constantRoutes = [{
  path: '/',
  redirect: '/home',
}, {
  path: '/redirect/:path*',
  component: () => import('@/views/redirect/index'),
}, {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/login')
}, {
  path: '/404',
  name: 'error',
  component: () => import('@/views/error'),
}] // 添加];
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constRouter.concat(constantRoutes),
  })

const router = createRouter()
export default router