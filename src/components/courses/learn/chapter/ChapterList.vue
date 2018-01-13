<template>

  <nav>
    <el-menu
      default-active="2"
      :router="true"
      :default-active="activeChapter">

      <el-menu-item
        v-for="chapter in chapters"
        :route="{ params: { chapter: `${chapter.id}`, task: 1 } }"
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
  export default {
    props: ['chapters', 'activeChapter']
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
