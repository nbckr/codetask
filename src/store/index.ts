import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'

import courses from './modules/courses'
import users from './modules/users'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    firebaseGeneralReady: false,
    firebaseSpecificReady: false
  },

  mutations: {
    ...firebaseMutations,
    SET_FIREBASE_GENERAL_READY (state, value) {
      console.log('SET_FIREBASE_GENERAL_READY')
      state.firebaseGeneralReady = value
    },
    SET_FIREBASE_SPECIFIC_READY (state, value) {
      console.log('SET_FIREBASE_SPECIFIC_READY')
      state.firebaseSpecificReady = value
    }
  },

  actions: {
    BIND_FIREBASE_GENERAL_REFS: ({commit, dispatch}) => {
      dispatch('VUEXFIRE_BIND_USERS_REF')
      dispatch('VUEXFIRE_BIND_COURSES_REF')
        .then(() => {
          console.log('%c Firebase GENERAL refs all set up ', 'background: #222; color: #bada55')
          commit('SET_FIREBASE_GENERAL_READY', true)
          return new Promise(resolve => resolve())
        })
        .catch(() => console.error('Some Firebase general refs are not ready'))

    },

    BIND_FIREBASE_SPECIFIC_REFS ({commit, dispatch}) {

      // See https://forum.vuejs.org/t/1404
      function proceed () {
        dispatch('VUEXFIRE_BIND_CURRENT_USER_REF')
          .then(() => dispatch('VUEXFIRE_BIND_PROGRESS_REF'))
          .then(() => {
            console.log('%c Firebase SPECIFIC refs all set up ', 'background: #222; color: #bada55')
            commit('SET_FIREBASE_SPECIFIC_READY', true)
            return new Promise(resolve => resolve())
          })
          .catch(() => {
            console.log('Some Firebase specific refs are not ready yet')
            return new Promise ((resolve, reject) => resolve())
          })
      }

      // we must wait for the store to be initialized
      if (!store.state.firebaseGeneralReady) {
        console.log('[firebase/bind specific] waiting for GENERAL')
        store.watch(
          (state) => state.firebaseGeneralReady,
          (value) => {
            console.log('[firebase/bind specific] GENERAL okay', value)
            if (value)
              proceed()
          }
        )
      }
      else {
        proceed()
      }






    },

    UNBIND_FIREBASE_SPECIFIC_REFS: ({commit, dispatch}) => {
      console.log('UNBIND_FIREBASE_SPECIFIC_REFS')
      dispatch('VUEXFIRE_UNBIND_CURRENT_USER_REF')
      dispatch('VUEXFIRE_UNBIND_PROGRESS_REF')
      commit('SET_FIREBASE_SPECIFIC_READY', false)
    }

  },

  modules: {
    courses,
    users
  }
})

export default store
