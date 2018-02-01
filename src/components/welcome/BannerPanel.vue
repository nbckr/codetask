<template>

  <div id="banner">
    <img src="https://code.google.com/images/developers.png" alt="" style="width: 13rem">

    <h2>CodeTask</h2>
    <p class="subtitle">
      Learn Scala with ease
    </p>
    <br>

    <!-- If not logged in already, should automatically send to login -->
    <router-link
      :to="{ name: 'login' }">
      <el-button
        type="primary">
        Jetzt lernen
      </el-button>
    </router-link>
  </div>

</template>

<script>
  export default {}
</script>

<style scoped lang="scss">

  #banner {
    // display: inline-block;
    // padding: 1.6rem;
    // box-shadow: 5px 5px;

    text-align: center;
    color: #555;
  }

  h2 {
    font-size: 4rem;
    // font-family: 'Teko', sans-serif;
    // text-shadow: 3px 3px #777;
    margin: 0;
  }

  p.subtitle {
    font-size: 1.7rem;
    margin: 0;
  }

</style>
