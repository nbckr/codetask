import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import WelcomePage from '@/components/welcome/WelcomePage';
import EnrollPage from '@/components/courses/enroll/EnrollPage';
import ChapterStart from '@/components/courses/learn/chapter/ChapterStart';
import DashboardPage from '@/components/courses/dashboard/DashboardPage';
import ChapterPanel from '@/components/courses/learn/chapter/ChapterPanel';
import CourseStart from '@/components/courses/learn/CourseStart';
import LearnPage from '@/components/courses/learn/LearnPage';
import BaseTask from '@/components/courses/learn/task/BaseTask';
import AdminPage from '@/components/admin/AdminPage';

Vue.use(Router);

const checkDataLoaded = (to, from, next) => {
  console.log('>>>');

  function proceed () {
    if (store.state.courses.length !== 0) {
      next();
    }
  }
  console.log('>>>');
  if (store.state.courses.length === 0) {
    store.watch(
      (state) => state.courses.length !== 0,
      (value) => {
        console.log('<<<<>>>');
        if (value === true) {
          proceed();
        }
      }
    );
  } else {
    proceed();
  }
};

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
      beforeEnter: checkDataLoaded,
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
              name: 'chapter',
              component: ChapterStart
            },
            {
              path: 'tasks/:task',
              component: BaseTask,
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
