import {
  setToken
} from '@/utils/user'
const state = {
  user: "",
  token: ""
}

const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setToken(state, token) {
    state.token = token
    setToken(token)
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