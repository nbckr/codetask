import axios from 'axios';
import router from '../../router';

const state = {
  courses: []
};

const mutations = {
  SET_COURSES: (state, courses) => {
    console.log('Setting courses');
    state.courses = courses;
  }
};

const actions = {
  LOAD_COURSES: ({ commit }) => {
    axios.get('/courses/all')
      .then((response) => {
        commit('SET_COURSES', response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

const getters = {
  activeCourse: state => {
    const { course } = router.app.$route.params;
    if (!course || state.courses.length === 0) return;

    return state
      .courses
      .find(c => c.id === Number.parseInt(course));
  },

  activeChapter: state => {
    const { course, chapter } = router.app.$route.params;
    if (!course || !chapter || state.courses.length === 0) return;

    return state
      .courses
      .find(c => c.id === Number.parseInt(course))
      .chapters
      .find(c => c.id === Number.parseInt(chapter));
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
