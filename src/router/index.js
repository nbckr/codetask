import Vue from 'vue'
import Router from 'vue-router'

// Landing page
import WelcomePage from '@/components/welcome/WelcomePage'
import AppShell from '@/components/shared/AppShell'
import RegisterPanel from '../components/welcome/RegisterPanel'
import LoginPanel from '../components/welcome/LoginPanel'
import BannerPanel from '../components/welcome/BannerPanel'

// Dashboard
import DashboardPage from '@/components/courses/dashboard/DashboardPage'

// Learning
import LearnPage from '@/components/courses/learn/LearnPage'
import ChapterStart from '@/components/courses/learn/chapter/ChapterStart'
import ChapterEnd from '@/components/courses/learn/chapter/ChapterEnd'
import ChapterPanel from '@/components/courses/learn/chapter/ChapterPanel'
import CourseStart from '@/components/courses/learn/CourseStart'
import BaseTask from '@/components/courses/learn/task/BaseTask'

// Etc
import AdminPage from '../components/admin/AdminPage'
import SettingsPage from '../components/settings/SettingsPage'
import ProfilePage from '../components/profile/ProfilePage'
import LeaderboardPage from '../components/leaderboard/LeaderboardPage'

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
          component: RegisterPanel
        },
        {
          path: 'login',
          name: 'login',
          component: LoginPanel
        }
      ]
    },

    // Everything else is the actual app, thus authentication is needed
    {
      path: '/app',
      name: 'app',
      component: AppShell,
      meta: {
        requiresAuth: true
      },
      children: [
        // ----------------------------------------------------------- Dashboard
        {
          path: 'dashboard',
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
                  name: 'chapter-start',
                  component: ChapterStart
                },
                {
                  path: 'tasks/:task',
                  component: BaseTask,
                  name: 'task'
                },
                {
                  path: 'finished',
                  name: 'chapter-end',
                  component: ChapterEnd
                }
              ]
            }
          ]
        },

        // ----------------------------------------------------------------- Etc
        {
          path: 'admin',
          component: AdminPage,
          name: 'admin'
        },

        {
          path: 'settings',
          component: SettingsPage,
          name: 'settings'
        },

        {
          path: 'profile',
          component: ProfilePage,
          name: 'profile'
        },

        {
          path: 'leaderboard',
          component: LeaderboardPage,
          name: 'leaderboard'
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
