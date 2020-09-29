/* eslint-disable require-jsdoc */
import {
  getMenuData
} from "@/api/home";

// function getMenuDataFun() {
//   return new Promise(resolve => {
//     getMenuData().then(res => {
//       resolve(res.data.data);
//     });
//   });
// }
const state = {
  memu: []
};

const mutations = {
  setMenu(state, data) {
    state.memu = data;
    console.log(state.memu);
  }
};

const actions = {
  getMenu({
    commit
  }) {
    return new Promise(resolve => {
      getMenuData().then(res => {
        resolve(res.data.data);
        commit("setMenu", res.data.data);
      });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};