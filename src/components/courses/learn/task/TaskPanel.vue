<template>

  <div>


    <div id="router-window">
      <transition leave-active-class="animated slideOutLeft" enter-active-class="animated slideInRight" mode="out-in">
        <router-view :key="$route.params.task"/>
      </transition>
    </div>

    <br>

    <el-row type="flex" class="row-bg" justify="space-between">

      <el-col :xs="6" :sm="3" :md="2">
        <el-button
          v-if="!isCourseStart"
          @click="goToLastTask">
          <i class="el-icon-arrow-left"></i>
        </el-button>
      </el-col>

      <el-col :xs="6" :sm="3" :md="4">
        <el-button
          v-if="!isCourseEnd"
          type="primary" plain
          :disabled="nextIsDisabled"
          @click="checkInputAndGoToNextTask">
          <span class="hidden-sm-and-down">Weiter </span>
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </el-col>

    </el-row>

  </div>

</template>

<script>
  export default {
    computed: {
      isCourseStart: (vm) => !vm.$route.params.task || !vm.$route.params.task === 1,

      isCourseEnd: (vm) => false,

      nextIsDisabled: () => false,

      // TODO: taskIndexAsNumber is duplicate from BaseTask, navigation should get refactored anyhow
      taskIndexAsNumber: (vm) => Number.parseInt(vm.$route.params.task)
    },

    methods: {
      goToLastTask () {
        console.log(this.taskIndexAsNumber);

        if (this.taskIndexAsNumber === 1) {
          this.$router.push({ name: 'chapter' });
        } else {
          this.$router.push({ name: 'task', params: { task: this.taskIndexAsNumber - 1 } });
        }
      },

      checkInputAndGoToNextTask () {
        // TODO: Check solutions
        // TODO: Check if go to ChapterEnd

        const task = this.taskIndexAsNumber ? this.taskIndexAsNumber + 1 : 1;
        this.$router.push({
          name: 'task', params: { task }
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

  .el-button {
    width: 100%;
  }

  #router-window {
    height: 550px;
    overflow: scroll;
  }
</style>
