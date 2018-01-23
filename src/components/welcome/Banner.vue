<template>

  <div id="banner">
    <h2>CodeTask</h2>
    <p class="subtitle">
      Learn Scala with ease
    </p>
    <br>
    <router-link
      :to="{ name: 'dashboard' }">
      <el-button
        type="primary">
        Start Learning Now
      </el-button>
    </router-link>

    <router-link
      to="/signin">
      <el-button
        type="primary">
        Signin
      </el-button>
    </router-link>
  </div>

</template>

<script>
  export default {}
</script>

<style scoped>

  #banner {
    background-color: azure;
    display: inline-block;
    padding: 2rem;
    box-shadow: 5px 5px;

    text-align: center;
    color: #555;
  }

  h2 {
    font-size: 4rem;
    font-family: 'Teko', sans-serif;
    text-shadow: 3px 3px #777;
    text-transform: uppercase;
    margin: 0;
  }

  p.subtitle {
    font-size: 1.7rem;
    margin: 0;
  }

</style>
