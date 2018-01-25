import Chapter from './Chapter'

export default interface Course {
  id: number // TODO: Use whatever firebase uses
  title: string
  chapters: Chapter[]
}
