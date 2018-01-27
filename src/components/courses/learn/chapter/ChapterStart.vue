<template>

  <div>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="12">
        <h1>{{ activeCourse.title }}</h1>
        <h2>{{ activeChapter.title }}</h2>

        <p>Willkommen im Kapitel <i>{{ activeChapter.title }}</i>!</p>
      </el-col>

      <el-col :xs="24" :sm="12" class="framed">
        <chapter-info-box/>
      </el-col>
    </el-row>

  </div>

</template>

<script>
  import ChapterInfoBox from './ChapterInfoBox'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      ChapterInfoBox
    },

    computed: {
      ...mapGetters([
        'activeCourse',
        'activeChapter'
      ])
    }
  }
</script>

<style scoped>
  div {
    background-color: #fff;
    padding: 1.6rem;
  }
</style>
