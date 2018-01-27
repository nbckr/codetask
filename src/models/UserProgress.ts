// In the firebase 'users' db, for each user there is an array of CourseProgress data

export class UserProgress {
  courses: CourseProgress[]
  score: 0
}

export class CourseProgress {
  chapters: ChapterProgress[]
  percentage: number = 0

  constructor (public id: number) { }

  public updatePercentage () {
    const numberOfChapters = this.chapters.length
    const percentageAccumulated = this.chapters
      .map(chapter => chapter.percentage)
      .reduce((previous, current) => current += previous)

    if (!numberOfChapters || !percentageAccumulated) {
      this.percentage = 0
    } else {
      this.percentage = Math.ceil(percentageAccumulated / numberOfChapters)
    }
  }

  updateRecursively (courseId: number, chapterId: number, taskId: string) {
    // TODO: or use computed?!

    const chapter = this.chapters.find(chapter => chapter.id === chapterId)
    if (!chapter) return

    const task = chapter.tasks.find(task => task.id === taskId)
    if (!task) return

    task.solved = true

    this.chapters.forEach(chapter => chapter.updatePercentage())
    this.updatePercentage()
  }
}

export class ChapterProgress {
  tasks: TaskProgress[]
  percentage: number = 0

  constructor (public id: number) { }

  updatePercentage () {
    const numberOfTasks = this.tasks.length
    const finishedTasks = this.tasks.filter(task => task.solved).length

    if (!numberOfTasks || !finishedTasks) {
      this.percentage = 0
    } else {
      this.percentage = Math.ceil(finishedTasks * 100 / numberOfTasks)
    }
  }
}

export class TaskProgress {
  solved: boolean = false

  constructor (public id: string, public chapterId: number) { }
}
