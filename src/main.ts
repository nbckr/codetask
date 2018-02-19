// Vue and core components
import Vue from 'vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import Vuelidate from 'vuelidate'

// App and features
import App from './App.vue'
import VueYoutubeEmbed from 'vue-youtube-embed'
import VueInputAutowidth from 'vue-input-autowidth'

// UI and decoration
import VueParticles from 'vue-particles'
import Element from 'element-ui'
import 'animate.css/animate.css'

// Element chalk theme + customizations
// import 'element-ui/lib/theme-chalk/index.css'
import './stylesheets/htwg-theme.scss'

// Needed for classes like 'hidden-sm-and-down'
import 'element-ui/lib/theme-chalk/display.css'

import 'element-ui/lib/theme-chalk/notification.css' // TODO: Remove?

// vue-awesome icons
import 'vue-awesome/icons/tasks'
import 'vue-awesome/icons/terminal'
import 'vue-awesome/icons/film'
import 'vue-awesome/icons/question-circle'
import 'vue-awesome/icons/check-circle'
import 'vue-awesome/icons/clock-o'
import 'vue-awesome/icons/percent'
import 'vue-awesome/icons/list-ul'

// -----------------------------------------------------------------------------

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.PLAY_BASE_URL

Vue.use(Element)
Vue.use(VueYoutubeEmbed)
Vue.use(VueInputAutowidth)
Vue.use(VueParticles)
Vue.use(Vuelidate)

// Setup global navigation guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  console.log('beforeEachGuard', requiresAuth, from.path, to.path)
  if (!requiresAuth)
    next()

  // See https://forum.vuejs.org/t/1404
  function proceed () {
    if (!store.getters.currentUser) {
      next('/login')
    } else {
      next()
    }
  }

  // we must wait for the store to be initialized
  if (!store.state.firebaseSpecificReady) {
    console.log('[firebase/guard] waiting for SPECIFIC')
    store.watch(
      (state) => state.firebaseSpecificReady,
      (value) => {
        console.log('[firebase/guard] SPECIFIC okay', value)
        if (value)
          proceed()
      }
    )
  }
  else {
    proceed()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
