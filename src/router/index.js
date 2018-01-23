import Vue from 'vue'
import Router from 'vue-router'

// Landing page
import WelcomePage from '@/components/welcome/WelcomePage'
import AppShell from '@/components/shared/AppShell'
import LoginPanel from '../components/welcome/LoginPanel'
import RegisterPanel from '../components/welcome/RegisterPanel'
import BannerPanel from '../components/welcome/BannerPanel'

// Dashboard
import DashboardPage from '@/components/courses/dashboard/DashboardPage'

// Learning
import LearnPage from '@/components/courses/learn/LearnPage'
import ChapterStart from '@/components/courses/learn/chapter/ChapterStart'
import ChapterPanel from '@/components/courses/learn/chapter/ChapterPanel'
import CourseStart from '@/components/courses/learn/CourseStart'
import BaseTask from '@/components/courses/learn/task/BaseTask'

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [

    // This is the landing page, only seen until logged in
    {
      path: '/',
      component: WelcomePage,
      children: [
        {
          path: '',
          name: 'welcome',
          component: BannerPanel
        },
        {
          path: 'register',
          name: 'register',
          component: LoginPanel
        },
        {
          path: 'login',
          name: 'login',
          component: RegisterPanel
        }
      ]
    },

    // Everything else is the actual app, thus authentication is needed
    {
      path: '/app',
      component: AppShell,
      meta: {
        requiresAuth: false // TODO
      },
      children: [
        // ----------------------------------------------------------- Dashboard
        {
          path: 'dashboard',
          // path: 'courses/learn',
          // alias: 'courses/learn/dashboard',
          component: DashboardPage,
          name: 'dashboard',
          exact: true
        },

        // ------------------------------------------------------------ Learning
        {
          path: 'courses/learn/:course',
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
        }
      ]
    },

    // Catch all other routes
    // TODO: Provide 404 error page
    {
      path: '*',
      redirect: '/'
    }
  ]
})
