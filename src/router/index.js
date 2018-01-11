import Vue from 'vue'
import Router from 'vue-router'
import WelcomePage from '@/components/welcome/WelcomePage'
import AdminPage from '@/components/admin/AdminPage'
import EnrollPage from '@/components/courses/enroll/EnrollPage'
import LearnPage from '@/components/courses/learn/LearnPage'
import DashboardPage from '@/components/dashboard/DashboardPage'

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'WelcomePage',
      component: WelcomePage
    },

    {
      path: '/dashboard',
      name: 'DashboardPage',
      component: DashboardPage
    },

    {
      path: '/admin',
      name: 'AdminPage',
      component: AdminPage
    },

    {
      path: '/courses/enroll',
      name: 'EnrollPage',
      component: EnrollPage
    },
    {
      path: '/courses/learn',
      name: 'LearnPage',
      component: LearnPage,
      props: (route) => route.query
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
