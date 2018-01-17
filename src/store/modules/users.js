import axiosData from '../axios-firebase-data'
import axiosAuth from '../axios-firebase-auth'
import router from '../../router'

const state = {
  idToken: null,
  userId: null,
  user: null
}

const mutations = {
  authUser (state, userData) {
    state.idToken = userData.token
    state.userId = userData.userId
  },
  storeUser (state, user) {
    state.user = user
  },
  clearAuthData (state) {
    state.idToken = null
    state.userId = null
  }
}

const actions = {
  SIGNUP_USER ({commit, dispatch}, authData) {
    axiosAuth.post('/signupNewUser', {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    }).then(response => {
      console.log(response)
      commit('authUser', {
        token: response.data.idToken,
        userId: response.data.localId
      })
      dispatch('storeUser', authData)
    }).catch(error => console.error(error))
  },

  signin ({commit, dispatch}, authData) {
    axiosAuth.post('/verifyPassword', {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    }).then(response => {
      console.log(response)
      commit('authUser', {
        token: response.data.idToken,
        userId: response.data.localId
      })

      const expirationDate = new Date(new Date().getTime() +
        response.data.expiresIn * 1000)
      localStorage.setItem('token', response.data.idToken)
      localStorage.setItem('expiresIn', expirationDate)
      localStorage.setItem('usedId', response.data.localId)

      dispatch('setLogoutTimer', response.data.expiresIn)
    }).catch(error => console.error(error))
  },

  tryAutoLogin ({commit}) {
    const token = localStorage.getItem('token')
    if (!token) return

    const expires = localStorage.getItem('expiresIn')
    if (new Date() >= expires) {
      return
    }

    const userId = localStorage.getItem('userId')
    commit('authUser', {
      token,
      userId
    })
  },

  logout ({commit}) {
    commit('clearAuthData')
    router.replace('/signin') // push()
    localStorage.removeItem('token')
    localStorage.removeItem('expiresIn')
    localStorage.removeItem('userId')
  },

  storeUser ({commit, state}, userData) {
    if (!state.idToken) {
      return
    }
    axiosData.post('/users.json' + '?auth=' + state.idToken, userData)
      .then(res => console.log(res))
      .catch(err => console.error(err))
  },

  fetchUser ({commit, state}) {
    if (!state.idToken) {
      return
    }

    // first user might not be the active user...
    axiosData.get('/users.json' + '?auth=' + state.idToken).then(res => {
      console.log(res)
      const data = res.data
      const users = []
      for (let key in data) {
        const user = data[key]
        user.id = key
        users.push(user)
      }
      console.log(users)
      commit('storeUser', users[0])
    }).catch(err => console.error(err))
  },

  setLogoutTimer ({commit, dispatch}, expirationTime) {
    setTimeout(() => dispatch('logout'),
      expirationTime * 1000)
  }
}

const getters = {
  user (state) {
    return state.user
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
