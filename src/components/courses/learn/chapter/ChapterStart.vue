<template>

  <div>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="12">
        <h1>{{ currentCourse.title }}</h1>
        <h2>{{ currentChapter.title }}</h2>

        <p>Willkommen im Kapitel <i>{{ currentChapter.title }}</i>!</p>
      </el-col>

      <el-col :xs="24" :sm="12" class="framed">
        <chapter-info-box/>
      </el-col>
    </el-row>

    <div class="comments">
      <vue-disqus
        shortname="codetask"
        :identifier="currentCourse.title"
        url="https://codetask.disqus.com"
      />
    </div>

  </div>



</template>

<script>
  import VueDisqus from 'vue-disqus/VueDisqus.vue'
  import ChapterInfoBox from './ChapterInfoBox'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      ChapterInfoBox,
      VueDisqus
    },

    computed: {
      ...mapGetters([
        'currentCourse',
        'currentChapter'
      ])
    }
  }
</script>

<style scoped>
</style>
