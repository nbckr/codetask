<template>
  <!--<router-view></router-view>-->

  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <div class="wrap-banner">
      <div class="main-title">
        <h2>CodeTask</h2>
        <p class="subtitle">
          Learn Scala with ease
        </p>
        <br>
        <el-button type="primary">Start Learning Now</el-button>
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
      >
      </vue-particles>

    </div>
  </div>

</template>

<script>
export default {
  name: 'app'
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

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

#particles-js {
  background-image: url("https://ak9.picdn.net/shutterstock/videos/33473869/thumb/1.jpg");
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.wrap-banner {
  position: relative;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-flex;
  display: flex;
  height: 100%;
  justify-content: center;
}
.main-title {
  color: #555;
  z-index: 999;
}

.main-title h2 {
  font-size: 4rem;
  font-family: 'Teko', sans-serif;
  text-shadow: 3px 3px #777;
  text-transform: uppercase;
  margin: 0;
}

.main-title p.subtitle {
  font-size: 1.7rem;
  margin: 0;
}
</style>
