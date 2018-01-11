<template>

  <el-main>
    <section>
      <p>Lorem Ipsum etc.</p>
      <p v-if="activeTask != null">{{ activeTask }}</p>
    </section>
  </el-main>

</template>

<script>
export default {
  props: ['activeTask']
}
</script>

<style scoped>

  section {
    border: red 4px solid;
    background-color: white;
    display: inline-block;
    padding: 1.6rem;
  }

</style>
