import {
  setCookies,
  getCookies
} from '@/utils/user'
const state = {
  user: getCookies('user') || '',
  token: getCookies('token') || ''
}

const mutations = {
  setUser(state, user) {
    state.user = user
    setCookies('user', user)
  },
  setToken(state, token) {
    state.token = token
    setCookies('token', token)
  }
}

const actions = {
  setBaseInfo({
    commit
  }, data) {
    commit('setToken', data.token || '')
    commit('setUser', data.userInfo || {})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}