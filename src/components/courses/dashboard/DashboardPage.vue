<template>
  <div id="dashboard-wrapper">
    <h1>Dashboard</h1>
    Willkommen bei CodeTask!

    <h2>Meine Kurse</h2>

    <course-list/>
  </div>
</template>

<script>
  import CourseList from './CourseList'

  export default {
    components: {
      CourseList
    }
  }
</script>

<style scoped>
  #dashboard-wrapper {
    // margin: 0 auto;
    // padding: 2rem 4.5rem;
    // max-width: 900px;
  }
</style>
