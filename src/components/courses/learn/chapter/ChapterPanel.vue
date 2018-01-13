<template>
  <article>

    <h1>{{ activeChapter.title }}</h1>

    <app-task-stepper
      :tasks="activeChapter.tasks" />

    <!-- <app-task-panel> -->
    <transition leave-active-class="animated slideOutLeft" enter-active-class="animated slideInRight" mode="out-in">
      <router-view :key="$route.params.task"/>
    </transition>

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

    computed: {
      chapterIdAsNumber: (vm) => Number.parseInt(vm.chapter),
      activeChapter: (vm) => test.chapters.find(chapter => chapter.id === vm.chapterIdAsNumber)
    },

    props: ['chapter']
  };
</script>

<style scoped>
  .slideOutLeft {
    animation-duration: 0.5s;
  }

  .slideInRight {
    animation-delay: 0.6s;
  }

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
