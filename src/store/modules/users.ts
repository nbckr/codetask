import axiosData from '../axios-firebase-data'
import axiosAuth from '../axios-firebase-auth'
import router from '../../router'
import { firebase } from  'firebase/database'
import db from '../vuexfire-db'
import { firebaseAction } from 'vuexfire'
import User from '../../models/User'

// TODO: Refactor. Separate state and localstorage

const usersRef = db.ref('users')

const state = {
  // Bound with VXF
  users: [],

  // Local
  idToken: null,
  userId: null,
  user: null
}

const mutations = {
  DO_AUTH_USER (state, userData) {
    state.idToken = userData.token
    state.userId = userData.userId
  },
  DO_STORE_USER_DETAILS (state, user) {
    state.user = user
  },
  DO_CLEAR_AUTH_DATA (state) {
    state.idToken = null
    state.userId = null
  },
  DO_CLEAR_USER_DATA (state) {
    state.user = null
  }
}

const actions = {
  REGISTER_USER ({commit, dispatch}, authData) {

    // Adjust data from form
    authData.returnSecureToken = true
    // name?!
    console.log('data', authData)

    // TODO: use vuefire / firebase directly
    axiosAuth.post('/signupNewUser', authData)
      .then(response => {
        console.log('got auth response', response)

        // no direct mutations, but use VFX // dispatch('STORE_USER', authData)

        // User registered in auth, now store in db as well
        // We can safely push new user as we checked for uniqueness in vuelidate
        const user = new User(response.data.localId, authData.email, authData.name)
        usersRef.push(user)

        // ... and log in
        commit('DO_AUTH_USER', {
          token: response.data.idToken,
          userId: response.data.localId
        })
      })
      .catch(error => console.error(error))
  },

  LOGIN_USER ({commit, dispatch}, authData) {
    axiosAuth.post('/verifyPassword', {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    })
      .then(response => {
        commit('DO_AUTH_USER', {
          token: response.data.idToken,
          userId: response.data.localId
        })

        dispatch('FETCH_USER_DETAILS')

        const expirationDate = new Date(new Date().getTime() +
          response.data.expiresIn * 1000)
        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('expirationDate', expirationDate.toDateString())
        localStorage.setItem('userId', response.data.localId)
        dispatch('SET_LOGOUT_TIMER', response.data.expiresIn)
      })
      .catch(error => console.error(error))
  },

  TRY_AUTO_LOGIN ({commit, dispatch}) {
    const token = localStorage.getItem('token')
    if (!token) return

    // TODO: This should not be strings
    const expires = localStorage.getItem('expirationDate') || ''
    if (new Date().toDateString() >= expires) {
      return
    }

    const userId = localStorage.getItem('userId')
    commit('DO_AUTH_USER', {
      token,
      userId
    })
    dispatch('FETCH_USER_DETAILS')
  },

  LOGOUT ({commit}) {
    commit('DO_CLEAR_AUTH_DATA')
    commit('DO_CLEAR_USER_DATA')

    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')

    router.push('/')
  },

  STORE_USER ({commit, state}, userData) {
    if (!state.idToken) {
      return
    }
    axiosData.post('/users.json' + '?auth=' + state.idToken, userData)
      .then(res => console.log(res))
      .catch(err => console.error(err))
  },

  // Get additional user data from firebase db
  FETCH_USER_DETAILS ({commit, state}) {
    if (!state.idToken) {
      return
    }

    // TODO: first user might not be the active user...
    axiosData.get('/users.json' + '?auth=' + state.idToken)
      .then(res => {
        const data = res.data
        const users: any[] = []
        for (let key in data) {
          const user = data[key]
          user.id = key
          users.push(user)
        }
        commit('DO_STORE_USER_DETAILS', users[0])
      })
      .catch(err => console.error(err))
  },

  SET_LOGOUT_TIMER ({commit, dispatch}, expirationTime) {
    setTimeout(() => dispatch('LOGOUT'),
      expirationTime * 1000)
  },

  // VXF bindings

  VXF_SET_USERS_REF: firebaseAction(({bindFirebaseRef}) => {
    bindFirebaseRef('users', usersRef)
  })
}

const getters = {
  user (state) {
    return state.user
  },
  emailStillAvailable (state) {
    return email => !state.users.some(user => user.email === email) // TODO or usersRef?
    // return axios.get('/users.json?orderBy="email"&equalTo="' + val + '"').then(response => {
    //   return Object.keys(response.data).length === 0
  },
  isAuthenticated (state) {
    return state.idToken !== null
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
