import router from './router'
// import {
//   Message
// } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getCookies
} from '@/utils/user' // get token from cookie
import store from './store'
const whiteList = ['/login', '/auth-redirect', '/register'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {

  const hasToken = getCookies('token')
  console.log(store.getters.menu)
  document.title = to.meta.title
  if (hasToken) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      if (store.getters.menu.length === 0) {
        store.dispatch('menu/getMenu').then((all) => {
          if (all) {
            store.commit('routes/setRoutes', all)
            let routes = store.getters.routes
            router.options.routes.push(...routes)
            router.addRoutes(routes)
            if (to.redirectedFrom) {
              router.replace(to.redirectedFrom)
            } else {
              next({
                ...to,
                replace: true,
              })
            }
          }
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})