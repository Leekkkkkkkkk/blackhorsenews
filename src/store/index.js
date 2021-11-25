import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('tt-user'))
  },
  mutations: {
    initunser (state, payload) {
      state.user = payload
      localStorage.setItem('tt-user', JSON.stringify(payload))
    }
  },
  actions: {
  },
  modules: {
  }
})
