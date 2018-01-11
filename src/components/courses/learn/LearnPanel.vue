<template>

  <el-container>
    <app-chapter-list></app-chapter-list>
    <app-task :active-task="activeTask"></app-task>
  </el-container>

</template>

<script>
  import ChapterList from './ChapterList'
  import Task from './Task'

export default {
    data () {
      return {
        activeTask: null
      }
    },

    components: {
      appChapterList: ChapterList,
      appTask: Task
    }
}
</script>

<style scoped>

  div {
    border: aqua 5px dashed;
  }

</style>
