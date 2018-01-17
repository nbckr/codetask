<template>

  <div id="app">
    <el-container>
      <el-header>
        <app-header/>
      </el-header>
      <el-main>
        <transition enter-active-class="animated fadeInUp" leave-active-class="animated slideOutUp" mode="out-in"
                    appear="">
          <router-view/>
        </transition>
      </el-main>
    </el-container>
  </div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Header from './components/shared/Header.vue';
  import Background from './components/shared/Background.vue';
  import 'element-ui/lib/theme-chalk/display.css';
  import 'animate.css/animate.css';

  @Component({
    components: {
      appHeader: Header,
      appBackground: Background
    }
  })
  export default class App extends Vue {
    name: 'app';

    beforeCreate() {
      this.$store.dispatch('LOAD_COURSES');
    }
  }
  ;
</script>

<style>

  * {
    box-sizing: border-box;
  }

  body, html {
    margin: 0;
    height: 100%;
    background: white;
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
