<template>
  <section>

    <div class="framed">
      <p>{{ currentTask.data.description.trim() }}</p>
    </div>

    <component
      :is="currentTask.tag"
      :current-task="currentTask"
    />

    <p style="font-size: x-small">Cheat mode: <i v-for="s in currentTask.data.solutions">{{ s }} | </i></p>

  </section>
</template>

<script>
  import KoanTask from './KoanTask'
  import CodeTask from './CodeTask'
  import VideoTask from './VideoTask'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      KoanTask,
      CodeTask,
      VideoTask
    },

    computed: {
      ...mapGetters([
        'currentTask',
        'currentChapter',
        'currentCourseProgress',
        'currentTaskProgress'
      ])
    }
  }
</script>

<style scoped>
</style>
