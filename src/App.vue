<template>

  <div
    id="app"
    :class=" {hideOverflow }"
  >
    <transition
      enter-active-class="animated fadeInUp"
      leave-active-class="animated slideOutUp"
      mode="out-in"
      @before-enter="hideOverflow = true"
      @after-enter="hideOverflow = false"
    >
      <!-- Either show landing page or the actual app -->
      <router-view
        v-if="this.$store.state.firebaseGeneralReady"
      />
    </transition>

    <!-- Show loading circle until app is ready -->
    <div
      v-loading.fullscreen.lock="!this.$store.state.firebaseGeneralReady"
      element-loading-background="#334152"
    />
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
      // Wire up vuex state with firebase db
      this.$store.dispatch('BIND_FIREBASE_GENERAL_REFS')
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

    font-family: swiss-light, $font-stack;
    line-height: 1.6rem;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    b, h1, h2, h3, h4, h5, h6 {
      font-family: swiss-heavy, $font-stack;
      font-weight: normal !important;
    }
  }

  #app {
    height: 100%;
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
