export default {
  methods: {
    coursePercentage: function (courseProgress) {
      const numberOfChapters = courseProgress.chapters.length
      const percentageAccumulated = courseProgress.chapters
        .map(chapter => this.chapterPercentage(chapter), this)
        .reduce((previous, current) => current + previous)
      if (!numberOfChapters || !percentageAccumulated) {
        return 0
      } else {
        return Math.ceil(percentageAccumulated / numberOfChapters)
      }
    },

    chapterPercentage: function (chapterProgress) {
      const numberOfTasks = chapterProgress.tasks.length
      const finishedTasks = chapterProgress.tasks.filter(
        task => task.solved).length // vm.filterSolvedTasks(chapterProgress.tasks)

      if (!numberOfTasks || !finishedTasks) {
        return 0
      } else {
        return Math.ceil(finishedTasks * 100 / numberOfTasks)
      }
    }
  }
}
