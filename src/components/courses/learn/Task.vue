<template>

  <el-main>
    <section>

      <div class="description">
        {{ activeTask.data.description }}
      </div>

      <p v-if="activeTask">{{ activeTask }}</p>

      <app-koan-task
        v-if="activeTask.tag === 'koan-task'"
        :active-task="activeTask"
      />

      <youtube
        v-if="activeTask.tag === 'video-task'"
        :video-id="activeTask.data.url"
        player-width="100%"
        :player-vars="{ autoplay: 1 }"
        @ended=""
      />

      <el-button
        @click="checkInputAndGoToNextTask">
        &gt; Weiter
      </el-button>

    </section>
  </el-main>

</template>

<script>
  import KoanTask from './KoanTask';

  export default {
    components: {
      appKoanTask: KoanTask
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
