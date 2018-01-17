import axios from 'axios';

const state = {
  courses: []
};

const mutations = {
  SET_COURSES: (state, courses) => {
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

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
};
