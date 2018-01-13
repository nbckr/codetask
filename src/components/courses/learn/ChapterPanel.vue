<template>
  <article v-if="activeChapter">
    <h1>{{ activeChapter.title }}</h1>
    <app-task-stepper
      :tasks="activeChapter.tasks"
      :active-task-index="activeTaskIndex"/>
    <app-task
      :active-task="activeChapter.tasks[activeTaskIndex]"
      :active-task-index="activeTaskIndex"
    />
  </article>
</template>

<script>
  import TaskStepper from './TaskStepper';
  import Task from './tasks/Task';

  export default {
    components: {
      appTaskStepper: TaskStepper,
      appTask: Task
    },

    props: ['chapters', 'activeChapter', 'activeTaskIndex']
  };
</script>

<style scoped>
  article {
    width: 100%;
  }

  h1 {
    margin: 0.5rem 1rem;
    text-align: center;
  }
</style>
