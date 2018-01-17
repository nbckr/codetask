import axios from '../axios-play'
import router from '../../router'

const state = {
  courses: []
}

const mutations = {
  SET_COURSES: (state, courses) => {
    console.log('Setting courses')
    state.courses = courses
  }
}

const actions = {
  LOAD_COURSES: ({ commit }) => {
    axios.get('/courses/all')
      .then((response) => {
        commit('SET_COURSES', response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

const getters = {
  activeCourse: state => {
    const { course } = router.app.$route.params
    if (!course || state.courses.length === 0) return

    return state
      .courses
      .find(c => c.id === Number.parseInt(course))
  },

  activeChapter: (state, getters) => {
    const { chapter } = router.app.$route.params
    const course = getters.activeCourse
    if (!course || !chapter) return

    return course
      .chapters
      .find(c => c.id === Number.parseInt(chapter))
  },

  activeTask: (state, getters) => {
    const { task } = router.app.$route.params
    const chapter = getters.activeChapter
    if (!task || !chapter) return

    return chapter
      .tasks[Number.parseInt(task) - 1] // Compensate 0-indexing
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
