<template>

  <!-- As soon as activeCourse is true, it is save to render child components -->
  <el-container v-if="activeCourse">

    <el-aside class="hidden-sm-and-down">
      <app-chapter-list/>
    </el-aside>

    <!--<app-chapter-panel>-->
    <el-main>
      <router-view/>
    </el-main>

  </el-container>

  <el-container v-else>

    <el-main>
      <!-- Could show loading indicator if it takes too long -->
    </el-main>

  </el-container>

</template>

<script>
  import ChapterList from './chapter/ChapterList'
  import ChapterPanel from './chapter/ChapterPanel'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        chapters: [] // TODO
      }
    },

    computed: {
      // chapterIdAsNumber: (vm) => Number.parseInt(vm.chapter),
      // taskIndexAsNumber: (vm) => Number.parseInt(vm.task) - 1,   // subtract -1 offset to hide 0-indexing
      ...mapGetters([
        'activeCourse',
        'activeChapter'
      ])
    },

    components: {
      appChapterList: ChapterList,
      appChapterPanel: ChapterPanel
    }

    // de-couple raw $route.params values as props
    // props: ['course', 'chapter']
  }
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
