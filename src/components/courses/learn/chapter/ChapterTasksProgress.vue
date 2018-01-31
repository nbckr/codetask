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
    />

  </aside>

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['tasks'],

    computed: {
      ...mapGetters([
        'currentTask',
        'currentChapterPercentage'
      ]),

      activeStep: (vm) => {
        return vm.currentTask
          ? vm.currentTask.id - 1
          : null
      }
    }
  }
</script>

<style scoped lang="scss">
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
