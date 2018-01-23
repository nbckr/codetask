<template>

  <div id="app">
    <el-container>
      <el-header>
        <app-header/>
      </el-header>
      <el-main>
        <transition enter-active-class="animated fadeInUp" leave-active-class="animated slideOutUp" mode="out-in">
          <router-view/>
        </transition>
      </el-main>
    </el-container>
  </div>

</template>

<script>
  import Header from './components/shared/Header.vue'
  import Background from './components/shared/Background.vue'
  import 'element-ui/lib/theme-chalk/display.css'
  import 'animate.css/animate.css'

  export default {
    name: 'app',

    components: {
      appHeader: Header,
      appBackground: Background
    },

    beforeCreate () {
      this.$store.dispatch('LOAD_COURSES')
      this.$store.dispatch('TRY_AUTO_LOGIN')
    }
  }
</script>

<style lang="scss">

  // HTWG Colors
  $htwg-color-teal: #009b91;
  $htwg-color-soft-blue: #d9e5ec;
  $htwg-color-dark-blue: #334152;

  // Dimensions
  $dot-size: 0.2rem;
  $dot-space: 8rem;

  * {
    box-sizing: border-box;
  }

  body, html {
    margin: 0;
    height: 100%;
    //background: white;
  }

  body {
    // HTWG style soft-blue grid, inspired by https://codepen.io/edmundojr/pen/xOYJGw
    background: linear-gradient(90deg, $htwg-color-soft-blue ($dot-space - $dot-size), transparent 1%) center,
    linear-gradient($htwg-color-soft-blue ($dot-space - $dot-size), transparent 1%) center,
    $htwg-color-dark-blue;
    background-size: $dot-space $dot-space;
  }

  #app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  #app > .el-container {
    padding: 0;
    height: 100%;
    border: green 3px solid;
  }

  .el-header, .el-main {
    padding: 0;
  }

  .framed {
    border: lightgrey 1px solid;
    border-radius: 0.3rem;
    /* box-shadow: darkgrey 3px 3px; */

    padding: 0.8rem;
    margin-bottom: 1.5rem;
  }

  .framed > p {
    margin: 0;
    /* white-space: pre; */
  }

  /*   .el-header, .el-footer {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
    }

    .el-main {
      z-index: 99;
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
    }

    .el-main, .el-header {
      border: red 3px solid;
    }*/
</style>
