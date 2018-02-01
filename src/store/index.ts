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
      dispatch('VUEXFIRE_BIND_USERS_REF')
        .then(() => dispatch('VUEXFIRE_BIND_CURRENT_USER_REF'))
        .then(() => dispatch('VUEXFIRE_BIND_COURSES_REF'))
        .then(() => dispatch('VUEXFIRE_BIND_PROGRESS_REF'))
        .then(() => { commit('SET_FIREBASE_READY') })
    }
  },

  modules: {
    courses,
    users
  }
})
