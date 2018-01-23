<template>

  <div id="app">
    <transition enter-active-class="animated fadeInUp" leave-active-class="animated slideOutUp" mode="out-in">
      <!-- Either show landing page or the actual app -->
      <router-view />
    </transition>
  </div>

</template>

<script>
  // import 'element-ui/lib/theme-chalk/display.css'
  // import 'animate.css/animate.css'

  export default {
    name: 'app',

    beforeCreate () {
      this.$store.dispatch('LOAD_COURSES')
      this.$store.dispatch('LOAD_SOLUTIONS')
      this.$store.dispatch('TRY_AUTO_LOGIN')
    }
  }
</script>

<style lang="scss">

  * {
    box-sizing: border-box;
  }

  body, html {
    margin: 0;
    height: 100%;
    //htwg: white;
  }

  #app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
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

</style>
