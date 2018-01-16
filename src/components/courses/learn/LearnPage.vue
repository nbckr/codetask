<template>

  <el-container>

    <el-aside>
      <app-chapter-list
        :chapters="chapters"
        :active-chapter="chapter"
      ></app-chapter-list>
    </el-aside>

    <!--<app-chapter-panel>-->
    <el-main>
      <router-view/>
    </el-main>

  </el-container>

</template>

<script>
  import ChapterList from './chapter/ChapterList';
  import ChapterPanel from './chapter/ChapterPanel';
  import test from '@/data/test-course.tmp';

  export default {
    data () {
      return {
        chapters: test.chapters
      };
    },

    computed: {
      chapterIdAsNumber: (vm) => Number.parseInt(vm.chapter),
      taskIndexAsNumber: (vm) => Number.parseInt(vm.task) - 1   // subtract -1 offset to hide 0-indexing
    },

    components: {
      appChapterList: ChapterList,
      appChapterPanel: ChapterPanel
    },

    // de-couple raw $route.query values as props
    props: ['course', 'chapter']
  };
</script>

<style scoped>

  div {
    border: aqua 5px dashed;
  }

  .el-aside {
    width: 13rem !important;
    margin-right: 1.6rem;
  }

</style>
