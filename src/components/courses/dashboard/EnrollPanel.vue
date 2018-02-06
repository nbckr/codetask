<template>

  <div>
    <h2>Neue Kurse kennenlernen</h2>

      <transition-group name="list" tag="div" id="enroll">
        <enroll-panel-course
          v-for="course in unenrolledCourses"
          :key="course.id"
          :course="course"
          class="list-item"
        />
      </transition-group>

  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import EnrollPanelCourse from './EnrollPanelCourse'

  export default {
    computed: {
      ...mapGetters([
        'courses',
        'progress'
      ]),

      unenrolledCourses: (vm) => vm.courses.filter(function (course) {
        return !vm.progress.some(courseProgress => courseProgress.id === course.id)
      })
    },

    components: {
      EnrollPanelCourse
    }
  }
</script>

<style scoped>

  .list-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter, .list-complete-leave-to
    /* .list-complete-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-leave-active {
    position: absolute;
  }
</style>
