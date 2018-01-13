<template>
  <article>

    <h1>{{ activeChapter.title }}</h1>

    <app-task-stepper
      :tasks="activeChapter.tasks" />

    <app-task-panel/>

  </article>
</template>

<script>
  import TaskStepper from '../TaskStepper';
  import TaskPanel from '../task/TaskPanel';
  import test from '@/data/test-course.tmp';

  export default {
    components: {
      appTaskStepper: TaskStepper,
      appTaskPanel: TaskPanel
    },

    computed: {
      chapterIdAsNumber: (vm) => Number.parseInt(vm.chapter),
      activeChapter: (vm) => test.chapters.find(chapter => chapter.id === vm.chapterIdAsNumber)
    },

    props: ['chapter']
  };
</script>

<style scoped>
  article {
    width: 100%;
    border: orangered 3px solid;
    display: inline-block;
    transition: height 1s;
  }

  section {
    transition: height 1s;

  }

  h1 {
    margin: 0.5rem 1rem;
    text-align: center;
  }
</style>
