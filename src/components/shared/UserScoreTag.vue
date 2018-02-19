<template>
  <el-tag size="small">
    {{ score }}
  </el-tag>
</template>

<script>
  export default {
    props: {
      score: {
        type: Number,
        required: true
      }
    }
  }
</script>

<style>

</style>
