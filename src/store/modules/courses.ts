import router from '../../router'
import Course from '../../models/Course'
import { CourseProgress, ChapterProgress, TaskProgress } from '../../models/UserProgress'
import { db } from '../firebase-setup'
import { firebaseAction } from 'vuexfire'
import Task from '../../models/Task'

const coursesRef = db.ref('courses')
const progressRef = db.ref('progress/lYHNisOXfVfesV8TQ48BI8dqo7t2') // TODO 'progess/<user>'

interface CoursesState {
  courses: Course[]
  progress: CourseProgress[]
}

const state: CoursesState = {
  courses: [],
  progress: []
}

const mutations = { }

const actions = {
  // TODO: User implicit, currentUser
  ENROLL_TO_COURSE: ({commit}, {user, course}) => {

    // Create empty progress
    const emptyProgress = new CourseProgress(course.id)
    emptyProgress.chapters = course.chapters.map(chapter => {
      const chapterProgress = new ChapterProgress(chapter.id)
      chapterProgress.tasks = chapter.tasks.map(task => new TaskProgress(task.id, chapter.id))
      return chapterProgress
    })
    console.log('empty:', emptyProgress)
    progressRef.push(emptyProgress)
  },

  UPDATE_TASK_PROGRESS: ({commit, getters}, task: Task) => {
    console.log('Update task progress')
    const courseProgress = getters.progress
      .find(courseProgress => getters.activeCourse.id === courseProgress.id)

    console.log('>>>>>>>>>', courseProgress)
    courseProgress.updateRecursively(getters.activeChapter.id, task.id)
  },

  BIND_VUEXFIRE_REFS: firebaseAction(({commit, bindFirebaseRef}) => {
    console.log('VXF Bind event')
    bindFirebaseRef('courses', coursesRef, { readyCallback: () => console.log('courses bound') })
    bindFirebaseRef('progress', progressRef, { readyCallback: () => console.log('progress bound') })
  })
}

const getters = {
  courses: state => state.courses,
  progress: state => state.progress,

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

  /* Progress */

  activeCourseProgress: (state, getters) => {
    const course = getters.activeCourse
    if (!course) console.error('No active course')

    return state.progress.find(courseProgress => course.id === courseProgress.id)
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
