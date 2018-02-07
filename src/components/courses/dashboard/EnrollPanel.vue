<template>

  <div>
    <h2>Neue Kurse entdecken</h2>

    <div id="enroll-wrapper" v-if="unenrolledCourses.length > 0">
      <transition-group name="course-box" tag="div" id="enroll">
      <enroll-panel-course
          v-for="course in unenrolledCourses"
          :key="course.id"
          :course="course"
          class="course-box-item"
        />
      </transition-group>
    </div>

    <div v-else>
      <p>Keine weiteren Kurse verfügbar.</p>
    </div>

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

  .course-box-item {
    /* transition: all 1s;*/
    display: inline-block;
  }
  .course-box-move {
    transition: transform 1s;
  }
  .course-box-enter, .course-box-leave-active {
    transition: transform 1s, opacity 1s;
    opacity: 0;
    transform: translateY(-30px);
  }
  .course-box-leave-active {
    position: absolute;
  }
</style>
