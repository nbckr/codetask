<template>

  <el-main>
    <section>

      <div class="description">
        {{ activeTask.data.description }}
      </div>

      <app-koan-task
        v-if="activeTask.tag === 'koan-task'"
        :active-task="activeTask"
      />

      <app-video-task
        v-if="activeTask.tag === 'video-task'"
        :active-task="activeTask"
      />

      <br>
      <el-button
        @click="checkInputAndGoToNextTask">
        &gt; Weiter
      </el-button>

      <p style="font-size: x-small" v-for="s in activeTask.data.solutions">{{ s }}</p>

    </section>
  </el-main>

</template>

<script>
  import KoanTask from './KoanTask';
  import VideoTask from './VideoTask';

  export default {
    components: {
      appKoanTask: KoanTask,
      appVideoTask: VideoTask
    },

    props: [ 'activeTask', 'activeTaskIndex' ],

    methods: {
      checkInputAndGoToNextTask () {
        // TODO: Check solutions
        console.log(typeof this.activeTaskIndex);

        this.$router.replace({
          params: { task: this.activeTaskIndex + 1 }
        });
      }
    }
  };
</script>

<style>

  section {
    border: red 4px solid;
    background-color: white;
    display: inline-block;
    padding: 1.6rem;
    /* white-space: pre; */
  }

  #halloX {
    font-family: monospace;
    color: #D4D4BD;
    background-color: #1E1E1E;

    background-color: green;
    max-width: available;
  }

</style>
