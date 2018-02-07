<template>
  <div id="dashboard-wrapper">
    <h1>Dashboard</h1>
    <p>Willkommen bei CodeTask!</p>

    <course-list/>
    <enroll-panel />
  </div>
</template>

<script>
  import CourseList from './CourseList'
  import EnrollPanel from './EnrollPanel'

  export default {
    components: {
      CourseList,
      EnrollPanel
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
