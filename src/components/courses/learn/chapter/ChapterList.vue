<template>

  <nav>
    <el-menu
      default-active="2"
      :router="true"
      :default-active="`${activeChapter.id}`">

      <el-menu-item
        v-for="chapter in activeCourse.chapters"
        :route="{ name: 'chapter', params: { chapter: chapter.id } }"
        :key="`${chapter.id}`"
        :index="`${chapter.id}`">
        <a>
          <i class="el-icon-arrow-right"></i>
          <span>{{ chapter.title }}</span>
        </a>
      </el-menu-item>
    </el-menu>

  </nav>

</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'activeCourse',
        'activeChapter'
      ])
    }
  };
</script>

<style scoped>
  nav {
    border: purple 3px solid;
  }

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
