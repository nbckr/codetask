// In the firebase 'users' db, for each user there is an array of CourseProgress data

export class UserProgress {
  courses: CourseProgress[]
  score: 0
}

export class CourseProgress {
  chapters: ChapterProgress[]
  percentage: number = 0

  constructor (public id: number) { }
}

export class ChapterProgress {
  tasks: TaskProgress[]
  percentage: number = 0

  constructor (public index: number) { }
}

export class TaskProgress {
  solved: boolean = false

  constructor (public index: number) { }
}
