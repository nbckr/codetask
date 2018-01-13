import Vue from 'vue';
import Router from 'vue-router';
import WelcomePage from '@/components/welcome/WelcomePage';
import EnrollPage from '@/components/courses/enroll/EnrollPage';
import ChapterStart from '@/components/courses/learn/chapter/ChapterStart';
import DashboardPage from '@/components/courses/dashboard/DashboardPage';
import ChapterPanel from '@/components/courses/learn/chapter/ChapterPanel';
import CourseStart from '@/components/courses/learn/CourseStart';
import TaskPanel from '@/components/courses/learn/task/TaskPanel';
import LearnPage from '@/components/courses/learn/LearnPage';
import AdminPage from '@/components/admin/AdminPage';

Vue.use(Router);

export default new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      component: WelcomePage
    },

    {
      path: '/admin',
      component: AdminPage
    },

    {
      path: '/courses/enroll',
      component: EnrollPage
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
      props: true,
      children: [
        {
          path: '',
          component: CourseStart
        },
        {
          path: 'chapters/:chapter/',
          component: ChapterPanel,
          props: true,
          children: [
            {
              path: '',
              component: ChapterStart
            },
            {
              path: 'tasks/:task',
              component: TaskPanel,
              name: 'task',
              props: true
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
});
