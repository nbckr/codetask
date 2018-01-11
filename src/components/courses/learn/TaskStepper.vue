<template>

  <aside>
    <el-steps
      :active="activeTask"
      process-status="process"
      finish-status="success"
      align-center="true">

      <el-step
        v-for="(task, index) in tasks"
        :title="index + 1"/>

    </el-steps>

  </aside>

</template>

<script>
export default {
  props: ['tasks', 'activeTask']
};
</script>

<style scoped>
  aside {
    padding: 1.2rem 0;
  }
</style>
