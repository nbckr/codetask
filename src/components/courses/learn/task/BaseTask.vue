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

          // If value != 0, show visual reward and send upwards to allow e.g. auto-next
          if (scoreValue !== 0) {
            this.$message({
              message: `+ ${scoreValue} Punkt${scoreValue > 1 ? 'e' : ''}`,
              type: 'success',
              // center: true,
              customClass: 'score-message',
              duration: 2000
            })
            this.$emit('task-solved')
          }
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

<style lang="scss">
  // Note: This is not scoped!
  .score-message {
    min-width: 0 !important;
    background-color: $htwg-color-teal;
    border-color: $htwg-color-soft-blue;

    i, p {
      color: $htwg-color-soft-blue !important;
      font-family: swiss-heavy, $font-stack;
    }
  }
</style>
