<template>

  <div>
    <h2>Meine Kurse</h2>

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
                :to="{name: 'chapter-start', params: { course: course.id, chapter: chapter.id }}"
                :span="10">
                <a>{{ chapter.title }}</a>
              </router-link>
              <el-col :span="10">
                <el-progress :percentage="chapterPercentage(chapter)"/>
              </el-col>
            </li>
          </ul>
        </el-row>

        <el-row type="flex" justify="end">
          <el-button
            type="info"
            size="mini"
            plain
            @click="leaveCourse(course)"
          >
            Kurs verlassen
          </el-button>
        </el-row>

      </el-collapse-item>

    </el-collapse>
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

    methods: {
      leaveCourse (course) {
        this.$confirm(`Wenn du den Kurs "${course.title}" verlässt, geht dein Fortschritt verloren.`, 'Kurs verlassen?', {
          confirmButtonText: 'Verlassen',
          cancelButtonText: 'Abbrechen',
          type: 'warning',
          customClass: 'el-confirm'
        })
          .then(() => this.$store.dispatch('REMOVE_COURSE', course))
          .then(() => {
            this.collapsedName = ''
            this.$notify({
              title: 'Kurs verlassen',
              message: `Du hast den Kurs "${course.title}" verlassen.`,
              type: 'success',
              offset: 61
            })
          })
          .catch(() => console.log('Cancelled leave course'))
      }
    },

    computed: {
      ...mapGetters([
        'courses',
        'progress',
        'currentUser'
      ])
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
