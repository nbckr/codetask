<template>
  <section>

    <div class="description">
      <p>{{ activeTask.data.description.trim() }}</p>
    </div>

    <component
      :is="activeTask.tag"
      :active-task="activeTask"
    />

    <p style="font-size: x-small">Cheat mode: <i v-for="s in activeTask.data.solutions">{{ s }}     |     </i></p>

  </section>
</template>

<script>
  import test from '@/data/test-course.tmp';
  import KoanTask from './KoanTask';
  import CodeTask from './CodeTask';
  import VideoTask from './VideoTask';

  export default {
    components: {
      KoanTask,
      CodeTask,
      VideoTask
    },

    computed: {
      taskIndexAsNumber: (vm) => Number.parseInt(vm.task),
      chapterIdAsNumber: (vm) => Number.parseInt(vm.chapter),
      activeTask: (vm) => {
        return test.chapters
          .find(chapter => chapter.id === vm.chapterIdAsNumber)
          .tasks[vm.taskIndexAsNumber];
      }
    },

    props: ['task', 'chapter']
  };
</script>

<style scoped>
</style>
