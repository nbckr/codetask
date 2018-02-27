<template>

  <!-- As soon as currentCourse and currentUser is true, it is save to render child components -->
  <el-container v-if="currentCourse && currentUser">

    <el-aside class="hidden-sm-and-down">
      <chapter-list/>
    </el-aside>

    <!--<chapter-panel>-->
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
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        chapters: [] // TODO
      }
    },

    computed: {
      ...mapGetters([
        'currentCourse',
        'currentChapter',
        'currentUser'
      ])
    },

    components: {
      ChapterList
    }
  }
</script>

<style scoped lang="scss">

  div {
    // border: aqua 5px dashed;
    border: 1px solid #ccc;
  }

  .el-aside {
    width: 13rem !important;
    margin-right: 1.6rem;
  }

  .el-main {
    padding: 0;
  }

</style>
