<template>

  <el-aside>


    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
    >
      <el-menu-item v-for="(chapter, index) in test" :index="index">
        <i class="el-icon-arrow-right"></i>
        <span>{{ chapter.title }}</span>
      </el-menu-item>
    </el-menu>

  </el-aside>

</template>

<script>
  import test from '@/data/test-course.tmp'

  export default {

    data () {
      return {
        test: test.chapters
      }
    }
  }
</script>

<style scoped>

  aside {
    border: red 4px solid;
    background-color: white;
    display: inline-block;
    padding: 1.6rem;
  }

  ul {
    padding: 0;
    list-style: none;
  }
</style>
