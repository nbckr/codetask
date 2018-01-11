import Vue from 'vue'
import Router from 'vue-router'
import LearnPanel from '@/components/courses/learn/LearnPanel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LearnPanel',
      component: LearnPanel
    }
  ]
})
