<template>
  <div id="dashboard-wrapper">
    <h1>Dashboard</h1>

    <course-list/>

    <el-collapse-transition>
      <enroll-panel v-if="showEnrollPanel"/>
    </el-collapse-transition>

    <div
      id="show-enroll-panel"
      @click="showEnrollPanel = !showEnrollPanel"
    >
      <i :class="showEnrollPanel ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" ></i>
      <br>
      <el-button type="text">
        Neue Kurse entdecken
      </el-button>
    </div>


  </div>
</template>

<script>
  import CourseList from './CourseList'
  import EnrollPanel from './EnrollPanel'

  export default {
    data () {
      return {
        showEnrollPanel: false
      }
    },

    components: {
      CourseList,
      EnrollPanel
    }
  }
</script>

<style scoped lang="scss">
  #dashboard-wrapper {
    // margin: 0 auto;
    // padding: 2rem 4.5rem;
    // max-width: 900px;
  }

  #show-enroll-panel {
    text-align: center;

    i {
      cursor: pointer;
      font-size: 125%;
      color: white;
      background-color: $htwg-color-teal;
      padding: 5px;
      border-radius: 50%;
    }

    button {
      padding-bottom: 0;
    }
  }
</style>
