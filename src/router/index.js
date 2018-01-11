import Vue from 'vue'
import Router from 'vue-router'
import LearnPanel from '@/components/courses/learn/LearnPanel'
import Banner from '@/components/welcome/Banner'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Banner',
      component: Banner
    },
    {
      path: '/courses/learn',
      name: 'LearnPanel',
      component: LearnPanel
    }
  ]
})
