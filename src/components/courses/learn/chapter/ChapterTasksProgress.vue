<template>

  <aside>

    <el-steps
      class="hidden-md-and-down"
      :active="activeTaskIndex"
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
      :percentage="percentage"
      :status="percentage === 100 ? 'success' : ''"
    />

  </aside>

</template>

<script>
  export default {
    props: ['tasks'],

    computed: {
      activeTaskIndex: (vm) => Number.parseInt(vm.$route.params.task) - 1,

      percentage: (vm) => {
        const taskIndex = vm.activeTaskIndex + 1 // Compensate 0-indexing
        const numberOfTasks = vm.tasks.length
        if (!taskIndex || !numberOfTasks) {
          return 0
        } else {
          return Math.ceil(taskIndex * 100 / numberOfTasks)
        }
      }
    }
  }
</script>

<style scoped>
  .el-steps {
    padding: 1.2rem 0 0 0;
  }

  .el-progress {
    padding: 1.2rem;
  }

  >>> .el-progress-bar__inner {
    background-color: #67c23a; /* To match el-steps */
    transition: width 1s, background-color 1s;
  }
</style>
