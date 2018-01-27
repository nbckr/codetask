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
  ENROLL_TO_COURSE: ({commit, getters}, {course}) => {

    if (getters.progress.some(c => c.id === course.id)) {
      console.error('Already enrolled')
      return
    }

    // Create empty progress
    const emptyProgress = new CourseProgress(course.id)
    emptyProgress.chapters = course.chapters.map(chapter => {
      const chapterProgress = new ChapterProgress(chapter.id)
      chapterProgress.tasks = chapter.tasks.map(task => new TaskProgress(task.id, chapter.id))
      return chapterProgress
    })
    // console.log('empty:', emptyProgress)
    progressRef.push(emptyProgress)
  },

  // Set current task (determined by app state, e. g. route) as solved
  CURRENT_TASK_SOLVED: ({commit, getters}) => {
    console.log('Update task progress')
    const courseId = getters.activeCourse.id
    const chapterId = getters.activeChapter.id
    const taskId = getters.activeTask.id
    const courseProgress = getters.progress
      .find(courseProgress => courseId === courseProgress.id)

    const refKey = courseProgress['.key']
    updateCourseProgress(courseProgress, chapterId, taskId)
    progressRef.child(refKey).set(courseProgress)
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

// Clone ref, remove key so it can be added again, and deeply update percentages
function updateCourseProgress (courseProgress, chapterId: number, taskId: string): void {
  // create a copy of the item
  // TODO ? const newCourseProgress = {...courseProgress}
  delete courseProgress['.key']

  courseProgress.chapters
    .find(chapter => chapter.id === chapterId)
    .tasks
    .find(task => task.id === taskId)
    .solved = true
}

export default {
  state,
  mutations,
  actions,
  getters
}
