<template>
  <el-container id="wrapper">

    <div id="welcome-box" class="before-background">
      <!-- Show banner, login or register panel -->
      <router-view />
    </div>

    <vue-particles
      color="#ffffff"
      :particleOpacity="0.7"
      linesColor="#ffffff"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="5"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    />

    <img src="/static/img/htwg/htwg-letter-c.svg" class="htwg-letter"/>
    <img src="/static/img/htwg/htwg-in-logo.png" id="htwg-in-logo" class="hidden-xs-only"/>

  </el-container>
</template>

<script>
</script>

<style scoped lang="scss">

  // HTWG Colors
  $htwg-color-teal: #009b91;
  $htwg-color-soft-blue: #d9e5ec;
  $htwg-color-dark-blue: #334152;

  // Dimensions
  $dot-size: 0.2rem;
  $dot-space: 8rem;

  #wrapper {
    position: relative;
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;

    // HTWG style dark-blue grid, inspired by https://codepen.io/edmundojr/pen/xOYJGw
    background:
      linear-gradient(90deg, $htwg-color-dark-blue ($dot-space - $dot-size), transparent 1%) center,
      linear-gradient($htwg-color-dark-blue ($dot-space - $dot-size), transparent 1%) center,
      $htwg-color-soft-blue;
    background-size: $dot-space $dot-space;
  }

  #welcome-box {
    border: 7px solid royalblue;
    // width: 100%;
    // height: 100%;
    // transition: width 0.5s ease-out, height 0.5s ease-out;
  }

  .before-background {
    z-index: 90;
  }

  #particles-js {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .htwg-letter {
    position: absolute;
    left: 13%;
    top: 13%;
    transition: transform 7s ease-in;
    z-index: 80;

    &:hover { transform: scale(3); }
  }

  #htwg-in-logo {
    width: 30rem;
    position: absolute;
    top: 30px;
    right: -100px;
  }
</style>
