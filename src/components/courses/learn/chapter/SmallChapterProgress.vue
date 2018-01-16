<template>

  <aside>

    <el-progress
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
        const taskIndex = vm.activeTaskIndex + 1; // Compensate 0-indexing
        const numberOfTasks = vm.tasks.length;
        if (!taskIndex || !numberOfTasks) {
          return 0;
        } else {
          return Math.ceil(taskIndex * 100 / numberOfTasks);
        }
      }
    }
  };
</script>

<style scoped>
  aside {
    padding: 1.2rem;
  }

  >>> .el-progress-bar__inner {
    transition: width 1s;
  }
</style>
