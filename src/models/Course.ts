import Chapter from './Chapter'

export default interface Course {
  id: number
  title: string
  description: string
  chapters: Chapter[]
}
