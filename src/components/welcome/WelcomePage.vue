<template>
  <el-container id="wrapper">

    <div id="welcome-box" class="before-background">
      <router-link :to="{name: 'welcome'}">
        <img
          id="logo"
          src="/static/img/codetask/logo-dark-icon-square.svg"
          alt="CodeTask Logo"
          :class="{small: this.$route.name !== 'welcome'}"
        >
      </router-link>

      <el-collapse-transition>
        <!-- Show banner, login or register panel -->
        <keep-alive>
          <router-view/>
        </keep-alive>
      </el-collapse-transition>
    </div>

    <background/>

  </el-container>
</template>

<script>
  import Background from './Background'

  export default {
    components: {
      Background: Background
    }
  }
</script>

<style scoped lang="scss">
  #logo {
    display: block;
    transition: height 0.4s ease-out;
    height: 8rem;
    margin: 0 auto 0.8rem;

    &.small {
      height: 4rem;
      margin: 0 auto 1.4rem;
    }
  }

  #wrapper {
    position: relative;
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;

    // HTWG style dark-blue grid, inspired by https://codepen.io/edmundojr/pen/xOYJGw
    background: linear-gradient(90deg, $htwg-color-dark-blue ($grid-dot-space - $grid-dot-size), transparent 1%) center,
    linear-gradient($htwg-color-dark-blue ($grid-dot-space - $grid-dot-size), transparent 1%) center,
    $htwg-color-soft-blue;
    background-size: $grid-dot-space $grid-dot-space;
  }

  #welcome-box {
    background-color: rgba(255, 255, 255, 0.95);
    padding: 1.6rem;
    width: 25rem;
  }

  .before-background {
    z-index: 90;
  }
</style>
