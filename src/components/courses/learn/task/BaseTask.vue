<template>
  <section>

    <div class="framed">

      ---
      <p>{{ activeCourseProgress.chapters
        .find(chapter => chapter.id === Number.parseInt(activeChapter.id)).tasks
        .find(task => task.id === Number.parseInt(activeTask.id)) }}</p>
      ---

      <p>{{ activeTask.data.description.trim() }}</p>
    </div>

    <component
      :is="activeTask.tag"
      :active-task="activeTask"
    />

    <p style="font-size: x-small">Cheat mode: <i v-for="s in activeTask.data.solutions">{{ s }} | </i></p>

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
        'activeTask',
        'activeChapter',
        'activeCourseProgress'
      ])
    }
  }
</script>

<style scoped>
</style>
