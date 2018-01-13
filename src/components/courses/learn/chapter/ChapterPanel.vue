<template>
  <article>

    <h1>{{ activeChapter.title }}</h1>
    <app-task-stepper
      :tasks="activeChapter.tasks"
      :active-task-index="activeTaskIndex"/>

    <!--<app-task
      :active-task="activeChapter.tasks[activeTaskIndex]"
      :active-task-index="activeTaskIndex"
    />-->

    <router-view/>

  </article>
</template>

<script>
  import TaskStepper from '../TaskStepper';
  import Task from '../task/TaskPanel';
  import test from '@/data/test-course.tmp';

  export default {
    components: {
      appTaskStepper: TaskStepper,
      appTask: Task
    },

    data () {
      return {
        chapters: [],
        activeChapter: test.chapters[0],
        activeTaskIndex: 2
      };
    }

    /* props: ['chapters', 'activeChapter', 'activeTaskIndex'] */
  };
</script>

<style scoped>
  article {
    width: 100%;
    border: orangered 3px solid;
    display: inline-block;
  }

  h1 {
    margin: 0.5rem 1rem;
    text-align: center;
  }
</style>
