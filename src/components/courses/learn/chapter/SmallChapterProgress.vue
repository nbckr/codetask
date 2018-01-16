<template>

  <aside>

    <el-progress :percentage="percentage"></el-progress>

  </aside>

</template>

<script>
  export default {
    props: ['tasks'],

    computed: {
      activeTaskIndex: (vm) => Number.parseInt(vm.$route.params.task) - 1,
      percentage: (vm) => {
        var taskIndex = vm.activeTaskIndex + 1; // Compensate 0-indexing
        var number = Math.ceil(taskIndex * 100 / vm.tasks.length);
        console.log(taskIndex, number);
        return number;
      }
    }
  };
</script>

<style scoped>
  aside {
    padding: 1.2rem 0 0 0;
  }
</style>
