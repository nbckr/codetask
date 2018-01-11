<template>

  <el-container>
    <app-chapter-list
      :chapters="chapters"
    ></app-chapter-list>
    <app-task
      :active-task="activeTask"
    ></app-task>

    !! {{ course }} {{ chapter }} !!
    <p v-if="false">
      {{ chapters }}
    </p>

  </el-container>

</template>

<script>
  import ChapterList from './ChapterList'
  import Task from './Task'
  import test from '@/data/test-course.tmp'

  export default {
    data () {
      return {
        activeTask: null,
        chapters: test.chapters
      }
    },

    components: {
      appChapterList: ChapterList,
      appTask: Task
    },

    props: ['course', 'chapter']
  }
</script>

<style scoped>

  div {
    border: aqua 5px dashed;
  }

</style>
