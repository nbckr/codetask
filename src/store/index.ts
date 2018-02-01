import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'

import courses from './modules/courses'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    firebaseReady: false
  },

  mutations: {
    SET_FIREBASE_READY (state) {
      state.firebaseReady = true
    },
    ...firebaseMutations
  },

  actions: {
    BIND_FIREBASE_REFS: ({commit, dispatch}) => {
      dispatch('BIND_VUEXFIRE_USER_REF')
        .then(() => dispatch('BIND_VUEXFIRE_COURSES_REF'))
        .then(() => dispatch('BIND_VUEXFIRE_PROGRESS_REF'))
        .then(() => { commit('SET_FIREBASE_READY') })
    }
  },

  modules: {
    courses,
    users
  }
})
