import router from '../../router'
import Course from '../../models/Course'
import { CourseProgress, ChapterProgress, TaskProgress } from '../../models/UserProgress'
import { db } from '../firebase-setup'
import { firebaseAction } from 'vuexfire'
import Task from '../../models/Task'

const coursesRef = db.ref('courses')
const progressRef = db.ref('progress/lYHNisOXfVfesV8TQ48BI8dqo7t2') // TODO 'progess/<user>'

// interface CoursesState {
//   courses: Course[]
//   progress: CourseProgress[]
// }

const state = {
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
      chapterProgress.tasks = chapter.tasks.map(task => new TaskProgress(task.id))
      return chapterProgress
    })
    // console.log('empty:', emptyProgress)
    progressRef.push(emptyProgress)
  },

  // Set current task (determined by app state, e. g. route) as solved
  CURRENT_TASK_SOLVED: ({commit, getters}) => {
    console.log('Update task progress')
    // Grab ref to current course
    const courseId = getters.activeCourse.id
    const courseProgress = getters.progress
      .find(courseProgress => courseProgress.id === courseId)

    // Define and alter path to 'solved' attribute of current task
    const chapterIndex = getters.activeChapter.id - 1
    const taskIndex = getters.activeTask.id - 1
    const taskSolvedPath = `chapters/${chapterIndex}/tasks/${taskIndex}/solved`

    progressRef
      .child(courseProgress['.key'])
      .update({ [taskSolvedPath]: 'true', 'chapters/0/title': 'xxx' })
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
      .chapters.find(c => c.id === Number.parseInt(chapter))
  },

  activeTask: (state, getters) => {
    const {task} = router.app.$route.params
    const chapter = getters.activeChapter
    if (!task || !chapter) return

    return chapter
      .tasks.find(t => t.id === Number.parseInt(task))
  },

  /* Progress */

  activeCourseProgress: (state, getters) => {
    const course = getters.activeCourse
    if (!course) console.error('No active course')

    return state.progress.find(courseProgress => course.id === courseProgress.id)
  },

  /* current chapter's tasks filtered by various criteria */

  checkedTasks: (state, getters) => getters.activeChapter.tasks.filter(
    task => task.tag.checked),
  activeKoanTasks: (state, getters) => getters.activeChapter.tasks.filter(
    task => task.tag === 'koan-task'),
  activeCodeTasks: (state, getters) => getters.activeChapter.tasks.filter(
    task => task.tag === 'code-task'),
  activeVideoTasks: (state, getters) => getters.activeChapter.tasks.filter(
    task => task.tag === 'video-task')
}

// set task as solved, propagate change up to chapter and course percentage
function deepUpdateCourseProgress (courseProgress, chapterId: number, taskId: string): void {
  // Remove key so object can be added to db again
  delete courseProgress['.key']

  const chapterProgress = courseProgress.chapters
    .find(chapter => chapter.id === chapterId)
  chapterProgress
    .tasks
    .find(task => task.id === taskId)
    .solved = true

  updateChapterPercentage(chapterProgress)
  updateCoursePercentage(courseProgress)
}

function updateChapterPercentage (chapterProgress) {
  const numberOfTasks = chapterProgress.tasks.length
  const finishedTasks = chapterProgress.tasks.filter(task => task.solved).length

  if (!numberOfTasks || !finishedTasks) {
    chapterProgress.percentage = 0
  } else {
    chapterProgress.percentage = Math.ceil(finishedTasks * 100 / numberOfTasks)
  }
}

function updateCoursePercentage (courseProgress) {
  const numberOfChapters = courseProgress.chapters.length
  const percentageAccumulated = courseProgress.chapters
    .map(chapter => chapter.percentage)
    .reduce((previous, current) => current += previous)

  if (!numberOfChapters || !percentageAccumulated) {
    courseProgress.percentage = 0
  } else {
    courseProgress.percentage = Math.ceil(percentageAccumulated / numberOfChapters)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
