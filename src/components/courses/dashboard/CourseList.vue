<template>

  <el-collapse v-if="currentUser" v-model="collapsedName" accordion>

    <el-collapse-item v-for="(course, i) in enrolledCourses" :name="i" :key="i">

      <!-- Course title and overall percentage -->
      <template slot="title">
        <el-row type="flex" align="middle">
          <el-col :span="10"><p>{{ course.title }}</p></el-col>
          <el-col :span="10">
            <el-progress :percentage="70" :stroke-width="10"/>
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
              <el-progress :percentage="15"/>
            </el-col>
          </li>
        </ul>
      </el-row>

    </el-collapse-item>

    <button @click="test">TEST Anmelden</button>

  </el-collapse>

</template>

<script>
  import { mapGetters } from 'vuex'

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
      enrolledCourses: (vm) => {
        console.log(typeof vm.currentUser, vm.currentUser)
        return vm.courses.filter(course => vm.progress.some(courseProgress => course.id === courseProgress.id))
      }
    },

    methods: {
      test () {
        this.$store.dispatch('ENROLL_TO_COURSE', { user: this.currentUser, course: this.courses[0] })
      }
    }
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
