<template>
  <article v-if="activeChapter">
    <h1>{{ activeChapter.title }}</h1>
    <app-task-stepper
      :tasks="activeChapter.tasks"
      :active-task="activeTask"/>
    <app-task
      :active-task="activeChapter.tasks[Number.parseInt(activeTask)]"
    />
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

    props: ['chapters', 'activeChapter', 'activeTask']
  }
</script>

<style scoped>
  article {
    width: 100%;
  }
</style>
