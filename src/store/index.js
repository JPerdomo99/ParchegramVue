import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginState: false,
    imageProfile: ''
  },
  mutations: {
    loginNav (state) {
      state.loginState = true
    },
    logoutNav (state) {
      state.loginState = false
    },
    setImageProfile (state, image) {
      state.imageProfile = image
    }
  },
  actions: {
  },
  modules: {
  }
})
