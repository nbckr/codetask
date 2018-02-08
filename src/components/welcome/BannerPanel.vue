<template>

  <div id="banner">
    <h2>CodeTask</h2>
    <h3 class="subtitle">
      Learn Scala with ease
    </h3>
    <p>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
      tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
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

  .subtitle {
    font-size: 1.7rem;
    margin: 0;
  }

</style>
