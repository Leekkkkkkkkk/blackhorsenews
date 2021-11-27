import Vue from 'vue'
import Vuex from 'vuex'
import { getStorage, setStorage } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getStorage('tt-user')
  },
  mutations: {
    initunser (state, payload) {
      state.user = payload
      setStorage('tt-user', JSON.stringify(payload))
    }
  },
  actions: {
  },
  modules: {
  }
})
