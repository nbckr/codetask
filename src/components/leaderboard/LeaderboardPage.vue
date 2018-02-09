<template>
  <div>
    <h1>Bestenliste</h1>
    <ul>
      <li v-for="user in bestUsers">
        {{ user.displayName }}
        <user-score-tag :score="user.score"/>
      </li>
    </ul>
  </div>
</template>

<script>
  import UserScoreTag from '@/components/shared/UserScoreTag'
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'users'
      ]),

      bestUsers: (vm) => {
        const usersCopy = [...vm.users]
        return usersCopy
          .sort((a, b) => b.score - a.score)
          .slice(0, 5)
      }
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
    margin: 0.4rem 0;
  }
</style>
