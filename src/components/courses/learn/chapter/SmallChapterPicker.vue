<template>

  <nav>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'dashboard' }">{{ currentCourse.title }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <el-select
          :value="currentChapter.id"
          size="mini"
          :placeholder="currentChapter.title"
          @change="navigateOnSelect"
        >
          <el-option
            v-for="chapter in currentCourse.chapters"
            :key="chapter.id"
            :label="chapter.title"
            :value="chapter.id">
          </el-option>
        </el-select>
      </el-breadcrumb-item>
    </el-breadcrumb>

  </nav>

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    methods: {
      navigateOnSelect (chapterId) {
        this.$router.push({name: 'chapter-start', params: { chapter: chapterId }})
      }
    },

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
