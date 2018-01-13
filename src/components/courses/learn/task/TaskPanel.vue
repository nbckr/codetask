<template>

  <div>
    <transition leave-active-class="animated slideOutLeft" enter-active-class="animated slideInRight" mode="out-in">
      <router-view :key="$route.params.task"/>
    </transition>

    <br>
    <el-button
      @click="checkInputAndGoToNextTask">
      &gt; Weiter
    </el-button>


  </div>

</template>

<script>
  export default {
    computed: {
      // TODO: taskIndexAsNumber is duplicate from BaseTask, navigation should get refactored anyhow
      taskIndexAsNumber: (vm) => Number.parseInt(vm.$route.params.task)
    },

    methods: {
      checkInputAndGoToNextTask () {
        // TODO: Check solutions

        this.$router.push({
          params: { task: this.taskIndexAsNumber + 1 }
        });
      }
    }
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

  /* .slideOutLeft {
    animation-duration: 0.5s;
  }

  .slideInRight {
    animation-delay: 0.6s;
  } */
</style>
