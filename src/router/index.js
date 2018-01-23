import Vue from 'vue'
import Router from 'vue-router'
import WelcomePage from '@/components/welcome/WelcomePage'
import ChapterStart from '@/components/courses/learn/chapter/ChapterStart'
import DashboardPage from '@/components/courses/dashboard/DashboardPage'
import ChapterPanel from '@/components/courses/learn/chapter/ChapterPanel'
import CourseStart from '@/components/courses/learn/CourseStart'
import LearnPage from '@/components/courses/learn/LearnPage'
import BaseTask from '@/components/courses/learn/task/BaseTask'
import AdminPage from '@/components/admin/AdminPage'

import SignupPage from '../components/welcome/Signup'
import SigninPage from '../components/welcome/Signin'
import Banner from '../components/welcome/Banner'

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [

    {
      path: '/',
      component: WelcomePage,
      children: [
        {
          path: '/signup',
          component: SignupPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '',
          component: Banner
        },
        {path: '/signin', component: SigninPage},
        {
          path: '/admin',
          component: AdminPage
        }
      ]
    },

    {
      path: '/courses/learn',
      alias: '/courses/learn/dashboard',
      component: DashboardPage,
      name: 'dashboard',
      exact: true
    },

    {
      path: '/courses/learn/:course',
      component: LearnPage,
      children: [
        {
          path: '',
          name: 'course',
          component: CourseStart
        },
        {
          path: 'chapters/:chapter/',
          component: ChapterPanel,
          children: [
            {
              path: '',
              name: 'chapter',
              component: ChapterStart
            },
            {
              path: 'tasks/:task',
              component: BaseTask,
              name: 'task'
            }
          ]
        }
      ]
    },

    {
      path: '*',
      redirect: '/'
    }
  ]
})
