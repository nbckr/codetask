<template>

  <div class="wrap-banner">
    <div class="main-title">
      <h2>CodeTask</h2>
      <p class="subtitle">
        Learn Scala with ease
      </p>
      <br>
      <el-button type="primary">Start Learning Now</el-button>
    </div>

  </div>
</template>

<script>
export default {
}
</script>

<style scoped>


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
