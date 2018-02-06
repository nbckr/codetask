import router from '../../router'
import Course from '../../models/Course'
import { CourseProgress, ChapterProgress, TaskProgress } from '../../models/UserProgress'
import { db } from '../firebase-setup'
import { firebaseAction } from 'vuexfire'
import Task from '../../models/Task'

const coursesRef = db.ref('courses')
let progressRef

interface CoursesState {
  courses: Course[]
  progress: CourseProgress[],
  dataRefsReady: number
}

const state: CoursesState = {
  courses: [],
  progress: [],
  dataRefsReady: 0
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
    const emptyProgress = new CourseProgress(course.id, course.title)
    emptyProgress.chapters = course.chapters.map(chapter => {
      const chapterProgress = new ChapterProgress(chapter.id, chapter.title)
      chapterProgress.tasks = chapter.tasks.map(task => new TaskProgress(task.id))
      return chapterProgress
    })
    progressRef.push(emptyProgress)
  },

  // Set current task (determined by app state, e. g. route) as solved
  CURRENT_TASK_SOLVED: ({commit, getters}) => {
    console.log('Update task progress')
    // Grab ref to current course
    const courseId = getters.currentCourse.id
    const courseProgress = getters.progress
      .find(courseProgress => courseProgress.id === courseId)

    // Define and alter path to 'solved' attribute of current task
    const chapterIndex = getters.currentChapter.id - 1
    const taskIndex = getters.currentTask.id - 1
    const taskSolvedPath = `chapters/${chapterIndex}/tasks/${taskIndex}/solved`

    progressRef
      .child(courseProgress['.key'])
      .update({ [taskSolvedPath]: true })
  },

  VUEXFIRE_BIND_COURSES_REF: firebaseAction(({commit, bindFirebaseRef}) => {
    console.log('VXF courses bind event')
    return new Promise((resolve) => {
      bindFirebaseRef('courses', coursesRef, {
        readyCallback: () => resolve()
      })
    })
  }),

  VUEXFIRE_BIND_PROGRESS_REF: firebaseAction(({commit, rootGetters, bindFirebaseRef}) => {
    console.log('VXF progress bind event')
    const user = rootGetters.currentUser
    if (!user) return
    progressRef = db.ref(`progress/${user['.key']}`)

    return new Promise((resolve) => {
      bindFirebaseRef('progress', progressRef, {
        readyCallback: () => resolve()
      })
    })
  })
}

const getters = {
  courses: state => state.courses,
  progress: state => state.progress,

  // currently active course, chapter and task derived from route

  currentCourse: (state, getters) => {
    const {course} = router.app.$route.params
    if (!course || state.courses.length === 0) return

    return getters
      .courses
      .find(c => c.id === Number.parseInt(course))
  },

  currentChapter: (state, getters) => {
    const {chapter} = router.app.$route.params
    const course = getters.currentCourse
    if (!course || !chapter) return

    return course
      .chapters.find(c => c.id === Number.parseInt(chapter))
  },

  currentTask: (state, getters) => {
    const {task} = router.app.$route.params
    const chapter = getters.currentChapter
    if (!task || !chapter) return

    return chapter
      .tasks.find(t => t.id === Number.parseInt(task))
  },

  // Current course's progress

  currentCourseProgress: (state, getters) => {
    const course = getters.currentCourse
    if (!course) return

    return getters.progress.find(courseProgress => course.id === courseProgress.id)
  },

  currentChapterProgress: (state, getters) => {
    const courseProgress = getters.currentCourseProgress
    const chapter = getters.currentChapter
    if (!chapter || !courseProgress) return

    return courseProgress.chapters.find(chapterProgress => chapter.id === chapterProgress.id)
  },

  currentTaskProgress: (state, getters) => {
    const chapterProgress = getters.currentChapterProgress
    const task = getters.currentTask
    if (!task || !chapterProgress) return

    return chapterProgress.tasks.find(taskProgress => task.id === taskProgress.id)
  },

  // Current course's percentage

  currentCoursePercentage: (state, getters) => {
// TODO    const courseProgress = getters.currentCourseProgress
// TODO    const numberOfChapters = courseProgress.chapters.length
// TODO    const percentageAccumulated = courseProgress.chapters
// TODO      .map(chapter => chapter.percentage)
// TODO      .reduce((previous, current) => current += previous)
// TODO    if (!numberOfChapters || !percentageAccumulated) {
// TODO      return 0
// TODO    } else {
// TODO      return Math.ceil(percentageAccumulated / numberOfChapters)
// TODO    }
  },

  currentChapterPercentage: (state, getters) => {
    const numberOfTasks = getters.currentChapterProgress.tasks.length
    const finishedTasks = getters.currentSolvedTasks.length

    if (!numberOfTasks || !finishedTasks) {
      return 0
    } else {
      return Math.ceil(finishedTasks * 100 / numberOfTasks)
    }
  },

  // current chapter's tasks filtered by various criteria

  currentSolvedTasks: (state, getters) => getters.currentChapterProgress.tasks.filter(
    task => task.solved),
  currentHighestSolvedTask: (state, getters) => {
    const solvedTasks = getters.currentSolvedTasks
    return solvedTasks.length === 0
      ? { id: 0 }
      : solvedTasks[solvedTasks.length - 1]
  },

  currentKoanTasks: (state, getters) => getters.currentChapter.tasks.filter(
    task => task.tag === 'koan-task'),
  currentCodeTasks: (state, getters) => getters.currentChapter.tasks.filter(
    task => task.tag === 'code-task'),
  currentVideoTasks: (state, getters) => getters.currentChapter.tasks.filter(
    task => task.tag === 'video-task')
}

export default {
  state,
  mutations,
  actions,
  getters
}
