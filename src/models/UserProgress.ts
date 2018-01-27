// In the firebase 'users' db, for each user there is an array of CourseProgress data

export class UserProgress {
  courses: CourseProgress[]
}

export class CourseProgress {
  chapters: CourseProgress[]
  constructor (public id: number) { }
}

export class ChapterProgress {
  tasks: TaskProgress[]
  constructor (public id: number) { }
}

export class TaskProgress {
  constructor (public id: string, solved: boolean = false) { }
}
