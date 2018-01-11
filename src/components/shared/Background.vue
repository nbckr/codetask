<template>

  <div>
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
  </div>

</template>

<script>
  export default {
  }
</script>

<style scoped>

  div {
    /* background-image: url("https://ak9.picdn.net/shutterstock/videos/33473869/thumb/1.jpg"); */
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

</style>
