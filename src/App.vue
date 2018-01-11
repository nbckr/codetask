<template>

  <div id="app">
    <el-container>
      <el-header>
        <app-header/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>

</template>

<script>
  import Header from './components/shared/Header.vue';
  import Background from './components/shared/Background.vue';

  export default {
    name: 'app',

    components: {
      appHeader: Header,
      appBackground: Background
    }
  };
</script>

<style>
  body, html {
    margin: 0;
    height: 100%;
    background: #34393f;
  }

  #app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    text-align: center;
  }

  .el-container {
    height: 100%;
    margin-bottom: 40px;
    border: green 3px solid;

  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  .el-main, .el-header {
    border: red 3px solid;
  }
</style>
