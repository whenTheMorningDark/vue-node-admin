import router from "./router";

import store from "./store";
router.beforeEach(async (to, from, next) => {
  if (store.getters.menu.length === 0) {
    store.dispatch("menu/getMenu").then(all => {
      if (all) {
        store.commit("routes/setRoutes", all);
        let routes = store.getters.routes;
        router.options.routes.push(...routes);
        router.addRoutes(routes);
        if (to.redirectedFrom) {
          router.replace(to.redirectedFrom);
        } else {
          next({
            ...to,
            replace: true
          });
        }
      }
    });
  } else {
    next();
  }
});