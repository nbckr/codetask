// In the firebase 'users' db, for each user there is an array of CourseProgress data

export class UserProgress {
  courses: CourseProgress[]
}

export class CourseProgress {
  chapters: ChapterProgress[]

  constructor (public id: number, public title: string) { }
}

export class ChapterProgress {
  tasks: TaskProgress[]

  constructor (public id: number, public title: string) { }
}

export class TaskProgress {
  solved: boolean = false

  constructor (public id: number) { }
}
