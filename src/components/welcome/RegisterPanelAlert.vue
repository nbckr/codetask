<template>
  <el-alert
    :title="message"
    type="warning"
    :closable="false"
  />
</template>

<script>
  export default {
    props: {
      message: String
    }
  }
</script>

<style scoped>
</style>
