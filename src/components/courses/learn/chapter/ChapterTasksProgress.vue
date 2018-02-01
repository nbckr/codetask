<template>

  <aside>

    <el-steps
      class="hidden-md-and-down"
      :active="activeStep"
      process-status="process"
      finish-status="success"
      :align-center="true">

      <el-step
        v-for="(task, index) in tasks"
        :title="`${index + 1}`"
        :key="`step-${index + 1}`"
      />

    </el-steps>

    <el-progress
      class="hidden-lg-and-up"
      :percentage="currentChapterPercentage"
      :status="currentChapterPercentage === 100 ? 'success' : ''"
      :class="{'animated pulse': currentTaskProgress && currentTaskProgress.solved }"
    />

  </aside>

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['tasks'],

    computed: {
      ...mapGetters([
        'currentHighestSolvedTask',
        'currentTaskProgress',
        'currentChapterPercentage'
      ]),

      activeStep (vm) {
        if (vm.currentTaskProgress) {
          return vm.currentTaskProgress.id - 1
        } else {
          return vm.currentHighestSolvedTask.id // 0-indexed, so last solved highlights first unsolved
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  aside {
    overflow: hidden;
  }

  .el-steps {
    padding: 1.2rem 0 0 0;
  }

  .el-progress {
    padding: 1.2rem;
  }

  /deep/ .el-progress-bar__inner {
    background-color: #67c23a; /* To match el-steps */
    transition: width 1s, background-color 1s;
  }
</style>
