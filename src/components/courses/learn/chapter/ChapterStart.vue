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

    <el-collapse-transition>
      <div class="comments" v-if="showDisqus">
        <vue-disqus
          shortname="codetask"
          :identifier="currentChapter.title"
          :title="currentChapter.title"
          url="https://codetask.disqus.com"
        />
      </div>
    </el-collapse-transition>

    <content-revealer
      v-model="showDisqus"
      name="Kommentare"
    />

  </div>


</template>

<script>
  import Vue from 'vue'
  import VueDisqus from 'vue-disqus/VueDisqus.vue'
  import ChapterInfoBox from './ChapterInfoBox'
  import { mapGetters } from 'vuex'
  import ContentRevealer from '@/components/shared/ContentRevealer'

  export default {
    data () {
      return {
        showDisqus: false
      }
    },

    components: {
      ChapterInfoBox,
      VueDisqus,
      ContentRevealer
    },

    computed: {
      ...mapGetters([
        'currentCourse',
        'currentChapter'
      ])
    },

    methods: {
      // If comments should be shown while view changes, this workaround
      // needs to be run for vue-disqus bug, id doesn't change
      resetDisqus () {
        const vm = this
        vm.showDisqus = false
        Vue.nextTick(function () {
          vm.showDisqus = true
        })
      }
    },

    watch: {
      currentChapter () {
        this.showDisqus = false
      }
    }
  }
</script>

<style scoped lang="scss">
  /deep/ .comments {
    margin-top: 3.2rem;
  }
</style>
