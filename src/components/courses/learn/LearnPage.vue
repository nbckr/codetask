<template>

  <el-container>

    <app-chapter-list
      :chapters="chapters"
      :active-chapter="chapter"
    ></app-chapter-list>

    <app-course-panel
      :chapters="chapters"
      :active-chapter="chapters.find(el => el.id === Number.parseInt(chapter))"
      :active-task="task">

    </app-course-panel>

  </el-container>

</template>

<script>
  import ChapterList from './ChapterList';
  import CoursePanel from './CoursePanel';
  import test from '@/data/test-course.tmp';

  export default {
    data () {
      return {
        chapters: test.chapters
      };
    },

    components: {
      appChapterList: ChapterList,
      appCoursePanel: CoursePanel
    },

    // de-couple raw $route.query values as props
    props: ['course', 'chapter', 'task']
  };
</script>

<style scoped>

  div {
    border: aqua 5px dashed;
  }

</style>
