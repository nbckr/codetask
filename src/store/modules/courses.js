import axios from '../axios-play'
import router from '../../router'

const state = {
  courses: [],
  solutions: []
}

const mutations = {
  SET_COURSES: (state, courses) => {
    console.log('Setting courses')
    state.courses = courses
  },

  SET_SOLUTIONS: (state, solutions) => {
    console.log('Setting solutions')
    state.solutions = solutions
  }
}

const actions = {
  LOAD_COURSES: ({commit}) => {
    axios.get('/courses/all')
      .then((response) => {
        commit('SET_COURSES', response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  },

  LOAD_SOLUTIONS: ({commit}) => {
    // TODO: This is mock data and wrong format
    commit('SET_SOLUTIONS', [{'courseId': 2, 'chapterId': 10, 'taskSolutions': [{'taskId': 'video1', 'taskState': {'status': 'watched'}, 'checked': true}, {'taskId': 'koan1', 'taskState': {'mySolutions': []}, 'checked': false}, {'taskId': 'video2', 'taskState': {'status': 'not watched'}, 'checked': false}, {'taskId': 'koan2', 'taskState': {'mySolutions': ['"Svens Account"']}, 'checked': true}, {'taskId': 'code1', 'taskState': {'myCode': 'class Bank(name: String, code: String) {\n  var safeCode = code\n}\n\nclass AdvancedBank(name: String, code: String) {\n  //todo\n}'}, 'checked': false}, {'taskId': 'video3', 'taskState': {'status': 'not watched'}, 'checked': false}, {'taskId': 'video4', 'taskState': {'status': 'not watched'}, 'checked': false}, {'taskId': 'koan3', 'taskState': {'mySolutions': []}, 'checked': false}, {'taskId': 'video5', 'taskState': {'status': 'not watched'}, 'checked': false}, {'taskId': 'code2', 'taskState': {'myCode': 'object TestObject {\n  //todo\n}\n\nTestObject.i should be(0)\nTestObject.increment\nTestObject.i should be(1)'}, 'checked': false}, {'taskId': 'video6', 'taskState': {'status': 'not watched'}, 'checked': false}, {'taskId': 'video7', 'taskState': {'status': 'not watched'}, 'checked': false}, {'taskId': 'code3', 'taskState': {'myCode': 'class Vect3(val x: Double, val y: Double, val z: Double) {\n  def +(v: Vect3) = Vect3(x + v.x, y + v.y, z + v.z)\n  def -(v: Vect3) = Vect3(x - v.x, y - v.y, z - v.z)\n  def unary_-() = Vect3(-x, -y, -z)\n  def apply(index: Int): Double = index match {\n    case 0 => x\n    case 1 => y\n    case 2 => z\n  }\n\n  def print(): String = "(" + x + ", " + y + ", " + z + ")"\n}\n\nobject Vect3 {\n  //todo\n}'}, 'checked': false}]}][0].taskSolutions)
  }
}

const getters = {

  /* currently active course, chapter and task derived from route */

  activeCourse: state => {
    const {course} = router.app.$route.params
    if (!course || state.courses.length === 0) return

    return state
      .courses
      .find(c => c.id === Number.parseInt(course))
  },

  activeChapter: (state, getters) => {
    const {chapter} = router.app.$route.params
    const course = getters.activeCourse
    if (!course || !chapter) return

    return course
      .chapters
      .find(c => c.id === Number.parseInt(chapter))
  },

  activeTask: (state, getters) => {
    const {task} = router.app.$route.params
    const chapter = getters.activeChapter
    if (!task || !chapter) return

    return chapter
      .tasks[Number.parseInt(task) - 1] // Compensate 0-indexing
  },

  /* current chapter's tasks filtered by varios criteria */

  checkedTasks: (state, getters) => getters.activeChapter.tasks.filter(
    task => task.tag.checked),
  activeKoanTasks: (state, getters) => getters.activeChapter.tasks.filter(
    task => task.tag === 'koan-task'),
  activeCodeTasks: (state, getters) => getters.activeChapter.tasks.filter(
    task => task.tag === 'code-task'),
  activeVideoTasks: (state, getters) => getters.activeChapter.tasks.filter(
    task => task.tag === 'video-task')
}

export default {
  state,
  mutations,
  actions,
  getters
}
