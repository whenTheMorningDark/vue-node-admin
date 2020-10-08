import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout/index'
Vue.use(Router)
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
  path: '/home',
  name: 'home',
  component: layout,
  redirect: '/home/index',
  meta: {
    title: '主页'
  },
  children: [{
    path: 'index',
    name: 'index',
    component: () => import('@/views/home/index'),
    meta: {
      title: '首页'
    },
  }]
}, {
  path: '/404',
  name: 'error',
  component: () => import('@/views/error'),
}, {
  path: '*',
  redirect: '/404'
}] // 添加];
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  })

const router = createRouter()
export default router