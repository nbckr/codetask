<template>

  <div>
    <h2>Neue Kurse entdecken</h2>

    <div id="enroll-wrapper">
      <transition-group
        name="course-box"
        tag="div"
        id="enroll"
        @before-leave="beforeLeaveAnimation"
      >
      <enroll-panel-course
          v-for="course in unenrolledCourses"
          :key="course.id"
          :course="course"
          class="course-box-item"
        />
      </transition-group>
    </div>

    <div v-if="unenrolledCourses.length === 0">
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

    methods: {
      // See https://forum.vuejs.org/t/12258/4
      beforeLeaveAnimation (el) {
        const {marginLeft, marginTop, width, height} = window.getComputedStyle(el)
        el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`
        el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`
        el.style.width = width
        el.style.height = height
      }
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
  .course-box-move:not(.course-box-leave-active) {
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
