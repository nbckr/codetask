export default interface Task {
  id: string
  tag: TaskType
  data: TaskData
}

interface TaskData {
  description: string,

  // koan and code tasks
  code?: string
  mode?: string

  // koan tasks
  solutions?: string[]

  // video tasks
  url?: string
}

enum TaskType {
  VIDEO_TASK = 'video-task',
  KOAN_TASK = 'koan-task',
  CODE_TASK = 'code-task'
}
