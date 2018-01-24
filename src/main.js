// Vue and core components
import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuelidate from 'vuelidate'

// App and features
import App from './App'
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
  console.log('beforeEach', requiresAuth)

  if (requiresAuth && !store.getters.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
