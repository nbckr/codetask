<template>
  <div id="dashboard-wrapper">
    <h1>Dashboard</h1>

    <course-list/>

    <el-collapse-transition>
      <enroll-panel v-if="showEnrollPanel"/>
    </el-collapse-transition>

    <content-revealer
        v-model="showEnrollPanel"
        name="Neue Kurse"
    />
  </div>
</template>

<script>
  import CourseList from './CourseList'
  import EnrollPanel from './EnrollPanel'
  import ContentRevealer from '@/components/shared/ContentRevealer'

  export default {
    data () {
      return {
        showEnrollPanel: false
      }
    },

    components: {
      CourseList,
      EnrollPanel,
      ContentRevealer
    }
  }
</script>

<style scoped lang="scss">
  #dashboard-wrapper {
    // margin: 0 auto;
    // padding: 2rem 4.5rem;
    // max-width: 900px;
  }
</style>
