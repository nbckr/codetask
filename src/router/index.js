import Vue from 'vue';
import Router from 'vue-router';
import WelcomePage from '@/components/welcome/WelcomePage';
import DashboardPage from '@/components/dashboard/DashboardPage';
import EnrollPage from '@/components/courses/enroll/EnrollPage';
import ChapterStart from '@/components/courses/learn/chapter/ChapterStart';
import ChapterPanel from '@/components/courses/learn/chapter/ChapterPanel';
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
      path: '/courses/learn',
      component: DashboardPage,
      exact: true
    },

    {
      path: '/courses/enroll',
      component: EnrollPage
    },

    {
      path: '/courses/learn/:course',
      component: LearnPage,
      props: true,
      children: [
        {
          path: 'chapters/:chapter/',
          component: ChapterPanel,
          props: true,
          children: [
            {
              path: 'tasks/:task',
              component: TaskPanel,
              props: true
            }
          ]
        },
        {
          path: '',
          component: ChapterStart
        }
      ]
    },

    {
      path: '*',
      redirect: '/'
    }
  ]
});
