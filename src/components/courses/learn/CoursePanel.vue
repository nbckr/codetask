<template>
  <article v-if="activeChapter">
    {{ activeChapter }} <<
    <app-task-stepper></app-task-stepper>
    <app-task></app-task>
  </article>
</template>

<script>
  import TaskStepper from './TaskStepper'
  import Task from './Task'

  export default {
    components: {
      appTaskStepper: TaskStepper,
      appTask: Task
    },

    props: ['activeChapter']
  }
</script>

<style scoped>
  article {
    width: 100%;
  }
</style>
