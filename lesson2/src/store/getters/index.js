const getters = {
  user: state => state.user.user,
  token: state => state.user.token,
  routes: state => state.routes.routes,
  menu: state => state.menu.memu
};
export default getters;