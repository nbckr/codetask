import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'

import courses from './modules/courses'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    courses,
    users
  },

  mutations: {
    ...firebaseMutations
  }
})
