<template>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h4>{{ course.title }}</h4>
      <el-button style="float: right; padding: 3px 0" type="text" @click="enroll(course)">Einschreiben</el-button>
    </div>

    <el-tag type="info" size="mini">{{ numberOfChaptersInCourse(course) }} Kapitel</el-tag>

    <el-rate
      disabled
      text-color="#ff9900"
    />

    <p>{{ course.description }}</p>

    <p style="white-space: pre; display: none">{{ course }}</p>
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
    min-height: 15rem;
    display: inline-block;
    margin: 0.8rem;
  }

  h4 {
    /* font-weight: bold; */
    display: inline;
  }

  .el-rate {
    float: right;
  }
</style>
