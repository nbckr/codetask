<template>

  <div>
    <h1>LearnPanel</h1>
    <app-chapter-list></app-chapter-list>
    <app-task></app-task>
  </div>

</template>

<script>
  import ChapterList from './ChapterList'
  import Task from './Task'

export default {
    components: {
      appChapterList: ChapterList,
      appTask: Task
    }
}
</script>

<style scoped>
</style>
