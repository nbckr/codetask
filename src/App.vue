<template>

  <div id="app" :class=" {hideOverflow }">
    <transition
      enter-active-class="animated fadeInUp"
      leave-active-class="animated slideOutUp"
      mode="out-in"
      @before-enter="hideOverflow = true"
      @after-enter="hideOverflow = false"
    >
      <!-- Either show landing page or the actual app -->
      <router-view/>
    </transition>
  </div>

</template>

<script>
  export default {
    name: 'app',

    data () {
      return {
        hideOverflow: false
      }
    },

    beforeCreate () {
      this.$store.dispatch('LOAD_COURSES')
      this.$store.dispatch('LOAD_SOLUTIONS')
      this.$store.dispatch('TRY_AUTO_LOGIN')

      this.$store.dispatch('VXF_SET_USERS_REF')
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

    // HTWG style soft-blue grid, inspired by https://codepen.io/edmundojr/pen/xOYJGw
    background: linear-gradient(90deg, $htwg-color-soft-blue ($grid-dot-space - $grid-dot-size), transparent 1%) center,
    linear-gradient($htwg-color-soft-blue ($grid-dot-space - $grid-dot-size), transparent 1%) center,
    $htwg-color-dark-blue;
    background-size: $grid-dot-space $grid-dot-space;
  }

  #app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  // Scrollbars cause a jump on router transition otherwise
  .hideOverflow {
    overflow: hidden;
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

  .animated #app {
    overflow: hidden !important;
  }
</style>
