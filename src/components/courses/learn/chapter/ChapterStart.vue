<template>
  <div>
    <h1>Welcome to chapter!</h1>

    <el-button
      @click="goToFirstTask">
      &gt; Start
    </el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      goToFirstTask () {
        this.$router.push({
          name: 'task',
          params: { task: 1 }
        });
      }
    }
  };
</script>

<style scoped>
  div {
    background-color: #fff;
  }
</style>
