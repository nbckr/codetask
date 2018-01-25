import Task from './Task'

export default interface Course {
  id: number
  title: string
  tasks: Task[]
}
