<template>

  <el-container>

    <app-chapter-list
      :chapters="chapters"
      :active-chapter="chapter"
    ></app-chapter-list>

    <app-course-panel
      :active-chapter="chapters.find(el => el.id === Number.parseInt(chapter))">

    </app-course-panel>

    !! {{ course }} {{ chapter }} !!
    <p v-if="false">
      {{ chapters }}
    </p>

  </el-container>

</template>

<script>
  import ChapterList from './ChapterList'
  import CoursePanel from './CoursePanel'
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
      appCoursePanel: CoursePanel
    },

    // de-couple raw $route.query values as props
    props: ['course', 'chapter']
  }
</script>

<style scoped>

  div {
    border: aqua 5px dashed;
  }

</style>
