<template>

  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :router="true"
    @select="onMenuSelect"
    background-color="#334152"
    text-color="white"
    active-text-color="#009b91"
  >

    <el-menu-item index="title" :route="{ name: 'dashboard' }">
      <template slot="title">
        <img src="http://via.placeholder.com/256x128" id="app-title"/>
      </template>
    </el-menu-item>

    <el-submenu index="user-menu" id="user-menu" v-if="currentUser">
      <template slot="title">
        <img src="http://via.placeholder.com/128x128" id="user-img"/>
        {{ currentUser.displayName }}

        <user-score-tag :score="currentUser.score" />
      </template>

      <el-menu-item index="submenu-profile" route="profile">Mein Profil</el-menu-item>
      <el-menu-item index="submenu-settings" route="settings">Einstellungen</el-menu-item>
      <el-menu-item index="submenu-leaderboard" route="leaderboard">Bestenliste</el-menu-item>
      <el-menu-item index="submenu-admin" route="admin">Kurse und Nutzer verwalten</el-menu-item>
      <el-menu-item index="submenu-logout" @click="logout">Ausloggen</el-menu-item>
    </el-submenu>

    <el-menu-item index="dashboard" id="dashboard" :route="{ name: 'dashboard' }">Dashboard</el-menu-item>

  </el-menu>

</template>

<script>
  import UserScoreTag from '@/components/shared/UserScoreTag'
  import { mapGetters } from 'vuex'

  export default {

    data () {
      return {
        activeIndex: 'dashboard'
      }
    },

    methods: {
      onMenuSelect (key, keyPath) {
        this.activeIndex = keyPath[0]
      },

      logout () {
        this.$store.dispatch('AUTH_LOGOUT_USER')
      }
    },

    computed: {
      ...mapGetters([
        'currentUser',
        'users'
      ])
    },

    components: { UserScoreTag }
  }
</script>

<style scoped lang="scss">
  a {
    color: white;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  div span {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    box-sizing: border-box;
    padding-top: 16px;
  }

  #user-menu, #dashboard {
    float: right
  }

  img {
    height: 70%;
  }

  #user-img {
    border-radius: 50%;
  }

  .el-tag {
    // Recreate how it normally looks, doesn't work in  el-menu somehow
    display: inline-flex;
    align-items: center;
    background-color: rgba(0, 155, 145, 0.75);
    font-size: 12px;
    height: 24px;
    padding: 0 8px;
    /* line-height: 22px; */
    color: white;
    font-weight: bold;
  }

  header {
    // TODO: min-width 450px
  }

</style>
