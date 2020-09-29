/* eslint-disable require-jsdoc */
const state = {
  routes: []
};

const loadView = (view) => (resolve) => require([`@/views${view}`], resolve);

function menuToRoutes(data) {
  // () => import("@/views/home")
  // resolve => require([`@/views${v.path}`], resolve)

  let routes = data.map(v => {
    console.log(v.path);
    let str = v.path;
    console.log(str);
    let routerJson = {
      path: v.path,
      name: v.name,
      meta: {
        title: v.title
      },
      component: loadView(str)
    };
    if (v.children && v.children.length > 0) {
      routerJson.children = menuToRoutes(v.children);
    }
    return routerJson;
  });
  return routes;
}

const mutations = {
  setRoutes(state, data) {
    // console.log(menuToRoutes(data));
    let pathMenu = menuToRoutes(data);
    state.routes = pathMenu;
    console.log(state.routes);
  }
};

const actions = {

};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};