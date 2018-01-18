<template>
  <el-container id="wrapper">

    <banner class="before-background"/>

    <signup class="before-background"/>
    <signin class="before-background"/>

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

  </el-container>
</template>

<script>
  import Banner from '@/components/welcome/Banner'
  import Signup from './Signup'
  import Signin from './Signin'

  export default {
    components: {
      Banner, Signup, Signin
    }
  }
</script>

<style scoped>
  #wrapper {
    position: relative;
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    background-image: url("https://ak9.picdn.net/shutterstock/videos/33473869/thumb/1.jpg");
    background-size: cover;
  }

  >>> .before-background {
    z-index: 999;
  }

  #particles-js {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
