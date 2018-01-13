<template>

  <section>

    <div class="description">
      <p>{{ activeTask.data.description.trim() }}</p>
    </div>

      <component
        :is="activeTask.tag"
        :active-task="activeTask"
      />


    <!--<app-koan-task
    <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft" mode="out-in">
    </transition>



      v-if="activeTask.tag === 'koan-task'"
      :active-task="activeTask"
    />

    <app-video-task
      v-if="activeTask.tag === 'video-task'"
      :active-task="activeTask"
    />

    <app-code-task
      v-if="activeTask.tag === 'code-task'"
      :active-task="activeTask"
    />-->


    <br>
    <el-button
      @click="checkInputAndGoToNextTask">
      &gt; Weiter
    </el-button>

    <p style="font-size: x-small" v-for="s in activeTask.data.solutions">{{ s }}</p>

  </section>

</template>

<script>
  import KoanTask from './KoanTask';
  import CodeTask from './CodeTask';
  import VideoTask from './VideoTask';
  import test from '@/data/test-course.tmp';

  export default {
    components: {
      KoanTask,
      CodeTask,
      VideoTask
    },

    methods: {
      checkInputAndGoToNextTask () {
        // TODO: Check solutions

        this.$router.push({
          params: { task: this.taskIndexAsNumber + 1 }
        });
      }
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

<style>

  section {
    border: yellow 2px solid;
    background-color: white;
    display: inline-block;
    padding: 1.6rem;
  }

  .description {
    border: lightgrey 1px solid;
    border-radius: 0.3rem;
    /* box-shadow: darkgrey 3px 3px; */

    padding: 0.8rem;
    margin-bottom: 1.5rem;
  }

  .description > p {
    margin: 0;
    /* white-space: pre; */
  }

</style>
