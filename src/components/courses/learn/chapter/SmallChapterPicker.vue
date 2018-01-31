<template>

  <nav>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'dashboard' }">Meine Kurse</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'course', params: { course: currentCourse.id } }">{{ currentCourse.title }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <el-select :value="currentChapter.title" size="mini" :placeholder="currentChapter.title">
          <el-option
            v-for="chapter in currentCourse.chapters"
            :key="chapter.id"
            :label="chapter.title"
            :value="chapter.title">
          </el-option>
        </el-select>
      </el-breadcrumb-item>
    </el-breadcrumb>

  </nav>

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'currentCourse',
        'currentChapter'
      ])
    }
  }
</script>

<style scoped>
  nav {
  / / padding: 1.2 rem 0.6 rem 0 0.6 rem;
    padding: 1.2rem 1.2rem 0 1.2rem;
  }

  .el-breadcrumb {
    display: flex;
    align-items: center;
  }
</style>
