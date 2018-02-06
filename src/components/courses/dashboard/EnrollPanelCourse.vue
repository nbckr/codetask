<template>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ course.title }}</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="enroll(course)">Einschreiben</el-button>
    </div>

    <p>{{ numberOfChaptersInCourse(course) }} Kapitel</p>
    <p style="white-space: pre; display: none">{{ course }}</p>

    <el-rate
      disabled
      text-color="#ff9900"
    />
  </el-card>

</template>

<script>
  import CourseMixin from '@/mixins/CourseMixin'

  export default {
    methods: {
      enroll (course) {
        this.$store.dispatch('ENROLL_TO_COURSE', {user: this.currentUser, course: course})
      }
    },

    props: {
      course: {
        type: Object,
        required: true
      }
    },

    mixins: [CourseMixin]
  }
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 23rem;
    display: inline-block;
    margin: 0.8rem;
  }
</style>
