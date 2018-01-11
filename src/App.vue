<template>
  <!--<router-view></router-view>-->

  <div>

    <app-header></app-header>

    <div id="frame">
      <router-view></router-view>
    </div>

  </div>

</template>

<script>
  import Header from './components/shared/Header.vue'

  export default {
    name: 'app',

    components: {
      appHeader: Header
    }
  }
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

  main {
    text-align: center;
    margin-top: 40px;
  }

  #frame {
    height: 500px;
    width: 100%;
  }
</style>
