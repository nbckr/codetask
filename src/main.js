// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueParticles from 'vue-particles'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueYoutubeEmbed from 'vue-youtube-embed'
import VueInputAutowidth from 'vue-input-autowidth'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.PLAY_BASE_URL

Vue.use(Element)
Vue.use(VueYoutubeEmbed)
Vue.use(VueInputAutowidth)
Vue.use(VueParticles)
Vue.use(Vuelidate)

/* Setup global navigation guard */
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
