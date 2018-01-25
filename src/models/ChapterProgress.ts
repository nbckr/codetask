export default interface CourseState {
  courseId: number
  chapterId: number
  taskSolutions: TaskState[] // TODO: Rename
}

interface TaskState {
  taskId: string
  taskState: object // TODO: Remove
  checked: boolean // TODO: Rename
}
