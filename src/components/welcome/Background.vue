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

    <img src="/static/img/htwg/htwg-letter-c.svg" class="htwg-letter" style="top: 13%; left: 13%;"/>
    <img src="/static/img/htwg/htwg-letter-t.svg" class="htwg-letter" style="bottom: 8%; right: 22%;"/>

    <div class="htwg-bubble"></div>

    <img src="/static/img/htwg/htwg-in-logo.png" id="htwg-in-logo" class="hidden-xs-only"/>
  </div>

</template>

<script>
  export default {}
</script>

<style scoped lang="scss">

  div {
    // background-color: $htwg-color-dark-blue;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    user-select: none;
    overflow: hidden;
  }

  #particles-js {

  }

  .htwg-letter {
    position: absolute;
    transition: transform 7s ease-in;
    z-index: 80;

    &:hover {
      transform: scale(3);
    }
  }

  .htwg-bubble {
    border-radius: 50%;
    position: absolute;
    top: 60%;
    left: 25%;
    width: 4rem;
    height: 4rem;
    background-color: $htwg-color-soft-blue;
  }

  #htwg-in-logo {
    width: 30rem;
    position: absolute;
    top: 30px;
    right: -75px;
  }

</style>
