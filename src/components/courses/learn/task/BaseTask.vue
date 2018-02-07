<template>
  <section>

    <div class="framed">
      <p>{{ currentTask.data.description.trim() }}</p>
    </div>

    <component
      :is="currentTask.tag"
      :current-task="currentTask"
      @task-solved="onTaskSolved($event)"
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

    methods: {
      onTaskSolved (scoreValue) {
        if (!this.currentTaskProgress.solved) {
          // Update store
          this.$store.dispatch('CURRENT_TASK_SOLVED', scoreValue)
          // Send upwards to allow e.g. auto-next
          this.$emit('task-solved')
        }
      }
    },

    computed: {
      ...mapGetters([
        'currentTask',
        'currentUser',
        'currentChapter',
        'currentCourseProgress',
        'currentTaskProgress'
      ])
    }
  }
</script>

<style scoped>
</style>
