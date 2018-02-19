import { db, auth } from '../firebase-setup'
import { firebaseAction } from 'vuexfire'
import User from '../../models/User'
import store from '../index'
import Task from '../../models/Task'
import router from '../../router'

const usersRef = db.ref('users')
let currentUserRef

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
  UNSET_CURRENT_USER: (state) => state.currentUser = null
}

const actions = {

  REGISTER_USER ({commit, dispatch}, formData) {
    const {email, password} = formData

    return new Promise((resolve, reject) => {
      auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
          usersRef.push(
            new User(authUser.uid, authUser.email, formData.displayName))
          // If the new account was created, the user is signed in automatically
          console.log('New user created in auth as well as db')
        })
        .then(() => resolve())
        .catch(e => reject(e))
    })
  },

  AUTH_LOGIN_USER (context, formData) {
    const {email, password} = formData
    return auth.signInWithEmailAndPassword(email, password)

    // onAuthStateChanged will fire, log in happens async, maybe wrap in "real" Promise
  },

  AUTH_LOGOUT_USER ({commit}) {
    auth.signOut()
      .then(() => console.log('logged out'))
      .catch(error => console.error(error))
    // onAuthStateChanged will fire
  },

  // Login state managed by firebase, but we load additional data from database
  // Also fired after page refresh and firebase initialization phase finished
  ON_AUTH_STATE_CHANGED ({commit, dispatch}, authUser) {
    console.log('ON_AUTH_STATE_CHANGED', authUser)

    if (authUser) {
      dispatch('BIND_FIREBASE_SPECIFIC_REFS')
      // .catch(e => console.log('Aborting login', e))
        .then(() => {
          console.log(`Logging in user ${authUser.email}`)

          // Redirect if currently on welcome page (as opposed to refresh inside app)
          if (!router.currentRoute.matched.some(match => match.name === 'app')) {
            router.push({name: 'dashboard'})
          }
        })
    } else {
      commit('UNSET_CURRENT_USER')
      dispatch('UNBIND_FIREBASE_SPECIFIC_REFS')
    }
  },

  // The job here is mostly done in courses.ts, only update scoreValue here
  CURRENT_TASK_SOLVED: ({commit, getters}, scoreValue) => {
    const userRef = usersRef.child(getters.currentUser['.key'])
    const score = getters.currentUser.score + scoreValue
    userRef.update({score})
  },

  VUEXFIRE_BIND_USERS_REF: firebaseAction(
    ({commit, dispatch, bindFirebaseRef}) => {
      console.log('VUEXFIRE_BIND_USERS_REF')

      return new Promise((resolve) => {
        bindFirebaseRef('users', usersRef, {
          readyCallback: () => {
            resolve()
          }
        })
      })
    }),

  VUEXFIRE_BIND_CURRENT_USER_REF: firebaseAction(
    ({getters, bindFirebaseRef}) => {
      console.log('VUEXFIRE_BIND_CURRENT_USER_REF')
      const authUser = auth.currentUser
      if (!authUser || getters.users.length === 0) {
        console.log('User not ready for login')
        return new Promise((resolve, reject) => reject())
      }

      return new Promise((resolve) => {
        const user = getters.users.find(user => user.uid === authUser.uid)
        currentUserRef = db.ref(`users/${ user['.key'] }`)
        bindFirebaseRef('currentUser', currentUserRef, {
          readyCallback: () => resolve()
        })
      })
    }),

  VUEXFIRE_UNBIND_CURRENT_USER_REF: firebaseAction(({unbindFirebaseRef}) => {
    if (currentUserRef)
      unbindFirebaseRef('currentUser')
  })
}

const getters = {
  currentUser: state => state.currentUser,
  currentUserSettings: (state, getters) => {
    if (getters.currentUser)
      return getters.currentUser.settings
  },
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
