<template>

  <aside>
    <ul>
      <li v-for="chapter in test">
        <p>{{ chapter.title }}</p>
      </li>
    </ul>
  </aside>

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
