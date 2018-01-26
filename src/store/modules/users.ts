import { db, auth } from '../firebase-setup'
import { firebaseAction } from 'vuexfire'
import User from '../../models/User'
import store from '../index'

const usersRef = db.ref('users')

auth.onAuthStateChanged(user => {
  store.dispatch('ON_AUTH_STATE_CHANGED', user)
})

const state = {
  // Bound with vuexfire
  users: [],

  // Local
  currentUser: null
}

const mutations = {
  DO_LOGIN_USER (state, authUser = auth.currentUser) {
    if (!authUser || store.getters.users.length === 0) {
      console.log('User not ready for login')
      return
    }

    const user = state.users.find(user => user.uid === authUser.uid)
    if (user) {
      state.currentUser = user
      console.log (`Logging in user ${user.displayName}`)
    } else {
      console.error(`Could not find user with key ${authUser.uid} in db`)
    }
  },

  DO_LOGOUT_USER (state) {
    state.currentUser = null
  }
}

const actions = {

  REGISTER_USER ({commit, dispatch}, formData) {
    const {email, password} = formData
    auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        usersRef.push(new User(authUser.uid, authUser.email, formData.displayName))
        // If the new account was created, the user is signed in automatically
        console.log('New user created in auth as well as db')
      })
      .catch(error => console.error(error))
  },

  LOGIN_USER ({commit, dispatch}, formData) {
    const {email, password} = formData
    auth.signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message))
    // onAuthStateChanged will fire
  },

  LOGOUT_USER ({commit}) {
    auth.signOut()
      .then(() => console.log('logged out'))
      .catch(error => console.error(error))
    // onAuthStateChanged will fire
  },

  // Login state managed by firebase, but we load additional data from database
  // Also fired after page refresh and firebase initialization phase finished
  ON_AUTH_STATE_CHANGED ({commit}, authUser) {
    console.log('ON_AUTH_STATE_CHANGED', authUser)
    if (authUser) {
      commit('DO_LOGIN_USER', authUser)
    } else {
      commit('DO_LOGOUT_USER')
    }
  },

  // vuexfire bindings

  VXF_SET_USERS_REF: firebaseAction(({commit, bindFirebaseRef}) => {
    bindFirebaseRef('users', usersRef, {
      readyCallback: () => {
        // Fire manually as this usually happens after authStateChanged
        commit('DO_LOGIN_USER')
      }
    })
  })
}

const getters = {
  currentUser: state => state.currentUser,
  users: state => state.users,
  emailStillAvailable (state) {
    return email => !state.users.some(user => user.email === email)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
