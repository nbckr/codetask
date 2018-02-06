<template>

  <div>
    <el-collapse v-if="currentUser" v-model="collapsedName" accordion>

      <el-collapse-item v-for="(course, i) in progress" :name="i" :key="i">

        <!-- Course title and overall percentage -->
        <template slot="title">
          <el-row type="flex" align="middle">
            <el-col :span="10"><p>{{ course.title }}</p></el-col>
            <el-col :span="10">
              <el-progress :percentage="coursePercentage(course)" :stroke-width="10"/>
            </el-col>
          </el-row>
        </template>

        <!-- Chapter details per selected course -->
        <el-row>
          <ul>
            <li v-for="chapter in course.chapters">
              <router-link
                tag="el-col"
                :to="{name: 'chapter', params: { course: course.id, chapter: chapter.id }}"
                :span="10">
                <a>{{ chapter.title }}</a>
              </router-link>
              <el-col :span="10">
                <el-progress :percentage="chapterPercentage(chapter)"/>
              </el-col>
            </li>
          </ul>
        </el-row>

      </el-collapse-item>

    </el-collapse>

    <div v-for="course in unenrolledCourses" style="border: 4px solid blue">
      <h3>{{ course.title }}</h3>
      <button @click="enroll(course)">Anmelden</button>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import CourseMixin from '@/mixins/CourseMixin'

  export default {
    data () {
      return {
        collapsedName: ''
      }
    },

    computed: {
      ...mapGetters([
        'courses',
        'progress',
        'currentUser'
      ]),

      unenrolledCourses: (vm) => vm.courses.filter(function (course) {
        console.log(vm.courses.length, vm.progress.length)

        return !vm.progress.some(courseProgress => courseProgress.id === course.id)
      })
    },

    methods: {
      enroll (course) {
        this.$store.dispatch('ENROLL_TO_COURSE', {user: this.currentUser, course: course})
      }
    },

    mixins: [
      CourseMixin
    ]
  }
</script>

<style scoped>
  .el-row > ul {
    padding: 0.5rem 0 0 0;
  }

  li {
    display: flex;
    padding: 0.6rem 0;
  }

  p {
    margin: 0;
  }
</style>
