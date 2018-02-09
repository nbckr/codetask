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
    ...firebaseMutations,
    SET_FIREBASE_READY (state, value) {
      state.firebaseReady = value
    }
  },

  actions: {
    BIND_FIREBASE_REFS: ({commit, dispatch}) => {
      dispatch('VUEXFIRE_BIND_USERS_REF')
        .then(() => dispatch('VUEXFIRE_BIND_COURSES_REF'))
        .then(() => dispatch('VUEXFIRE_BIND_CURRENT_USER_REF'))
        .then(() => dispatch('VUEXFIRE_BIND_PROGRESS_REF'))
        .then(() => {
          console.log('%c Firebase connections all set up ', 'background: #222; color: #bada55');
          commit('SET_FIREBASE_READY', true)
          return new Promise (resolve => resolve)
        })
        .catch(() => console.error('Some Firebase connections are not ready yet'))

    }
  },

  modules: {
    courses,
    users
  }
})
