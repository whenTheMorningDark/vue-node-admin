/* eslint-disable require-jsdoc */
import layout from '@/layout/index'
import {
  constRouter
} from '@/router'
const state = {
  routes: []
}

const loadView = (view) => (resolve) => require([`@/views${view}`], resolve)

function menuToRoutes(data) {
  let routes = data.map(v => {
    let str = v.path
    let routerJson = {
      path: v.path,
      name: v.name,
      meta: {
        title: v.title
      },
      // component: loadView(str)
      component: v.path === '' ? layout : loadView(str)
    }
    if (v.children && v.children.length > 0) {
      routerJson.children = menuToRoutes(v.children)
    }
    return routerJson
  })
  return routes
}

const mutations = {
  setRoutes(state, data) {
    // console.log(menuToRoutes(data));
    let pathMenu = menuToRoutes(data)
    state.routes = constRouter.concat(pathMenu)
    console.log(state.routes)
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}