<template>

  <nav>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'dashboard' }">Meine Kurse</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/TODO' }">KursName</el-breadcrumb-item>
      <el-breadcrumb-item>
        <el-select :value="activeChapter" size="mini" :placeholder="activeChapter.title">
          <el-option
            v-for="chapter in chapters"
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
  import test from '@/data/test-course.tmp';

  export default {
    data () {
      return {
        chapters: test.chapters
      };
    },

    props: ['activeChapter']
  };
</script>

<style scoped>
  nav {
    padding: 1.2rem 0.6rem 0 0.6rem;
  }

  .el-breadcrumb {
    display: flex;
    align-items: center;
  }
</style>
