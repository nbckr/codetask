<template>

  <el-main>
    <section>

      <div class="description">
        <p>{{ activeTask.data.description.trim() }}</p>
      </div>

      <app-koan-task
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
  import CodeTask from './CodeTask';
  import VideoTask from './VideoTask';

  export default {
    components: {
      appKoanTask: KoanTask,
      appCodeTask: CodeTask,
      appVideoTask: VideoTask
    },

    props: [ 'activeTask', 'activeTaskIndex' ],

    methods: {
      checkInputAndGoToNextTask () {
        // TODO: Check solutions
        console.log(typeof this.activeTaskIndex, this.activeTaskIndex);

        this.$router.replace({
          params: { task: this.activeTaskIndex + 2 }    // index is 0-indexed, resource ain't
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
