import Vue from 'vue'
import Vuex from 'vuex'
import { getStorage, setStorage, removeStorage } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getStorage('tt-user')
  },
  mutations: {
    initunser (state, payload) {
      state.user = payload
      setStorage('tt-user', JSON.stringify(payload))
    },
    removeStorage (state) {
      state.user = null
      removeStorage('tt-user')
    }
  },
  actions: {
  },
  modules: {
  }
})
