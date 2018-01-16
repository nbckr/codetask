<template>

  <aside>
    <el-steps
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

  </aside>

</template>

<script>
  export default {
    props: ['tasks'],

    computed: {
      activeTaskIndex: (vm) => Number.parseInt(vm.$route.params.task) - 1
    }
  };
</script>

<style scoped>
  aside {
    padding: 1.2rem 0 0 0;
  }
</style>
