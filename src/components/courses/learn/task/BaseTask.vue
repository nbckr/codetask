<template>
  <section>

    <div class="description">
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
        'activeTask'
      ])
    }
  }
</script>

<style scoped>
</style>
