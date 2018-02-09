<template>
  <div>
    <h1>Mein Profil</h1>
    <p>{{ currentUser.displayName }}</p>
    <user-score-tag :score="currentUser.score"/>

    <h4>Meine Kurse</h4>
    <ul>
      <li v-for="course in progress">
        <el-tag type="success">
          {{ course.title }}
        </el-tag>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import UserScoreTag from '@/components/shared/UserScoreTag'

  export default {
    computed: {
      ...mapGetters([
        'currentUser',
        'progress'
      ])
    },

    components: {
      UserScoreTag
    }
  }
</script>

<style scoped lang="scss">
  ul {
    padding-left: 0;
  }

  li {
    list-style: none;
    margin: 0 0.4rem 0.4rem 0;
    display: inline-block;
  }
</style>
