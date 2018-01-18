<template>

    <!--
    <router-link :to="{name: 'dashboard'}">
      <h1>CodeTask</h1>
    </router-link>
    <p v-if="isAuthenticated">hey</p>
-->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >

      <el-menu-item index="1">CodeTask</el-menu-item>
      <el-menu-item index="2">Meine Kurse</el-menu-item>
      <el-submenu index="3" v-if="user">
        <template slot="title">
          <img src="http://via.placeholder.com/128x128" id="user-img" /> {{ user.email }}
        </template>
        <el-menu-item index="3-1">Mein Profil</el-menu-item>
        <el-menu-item index="3-2">Einstellungen</el-menu-item>
        <el-menu-item index="3-3" @click="logout">Ausloggen</el-menu-item>
      </el-submenu>
    </el-menu>

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {

    data () {
      return {
        activeIndex: '1'
      }
    },

    methods: {
      handleSelect (key, keyPath) {},

      logout () {
        this.$store.dispatch('LOGOUT')
      }
    },

    computed: {
      ...mapGetters([
        'isAuthenticated',
        'user'
      ])
    }
  }
</script>

<style scoped>

  a {
    color: white;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    border: orangered 5px dotted;
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: #35495E;
    color: #ffffff;
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

  #user-img {
    border-radius: 50%;
    height: 70%;
  }

</style>
