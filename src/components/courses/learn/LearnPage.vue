<template>

  <el-container>

    <app-chapter-list
      :chapters="chapters"
      :active-chapter="chapter"
    ></app-chapter-list>

    <app-chapter-panel
      :chapters="chapters"
      :active-chapter="chapters.find(el => el.id === chapterIdAsNumber)"
      :active-task-index="taskIndexAsNumber">

    </app-chapter-panel>

  </el-container>

</template>

<script>
  import ChapterList from './ChapterList';
  import ChapterPanel from './ChapterPanel';
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
    props: [ 'course', 'chapter', 'task' ]
  };
</script>

<style scoped>

  div {
    border: aqua 5px dashed;
  }

</style>
