<template>

  <div id="banner">

    <img
      id="title"
      src="/static/img/codetask/logo-dark-title.svg"
      alt="CodeTask Title"
    >

    <h3 class="subtitle">
      Learn Scala with ease
    </h3>
    <p>
      Du noch viel Scala lernen musst, junger Padawan.
    </p>

    <!-- If already logged in, router would redirect from this page to dashboard automatically -->
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
  export default {
    created () {
      // console.log('update')
      // this.$forceUpdate()
    }
  }
</script>

<style scoped lang="scss">

  #banner {
    // display: flex;
    // align-content: center;
    // display: inline-block;
    // padding: 1.6rem;
    // box-shadow: 5px 5px;

    text-align: center;

    p {
      // text-overflow: ellipsis;
      // display: inline;
    }
    // white-space: unset;
    // color: #555;
  }

  #title {
    height: 2rem;
  }

  .subtitle {
    font-size: 1.7rem;
    margin-bottom: 0.6rem;
    // margin: 0;
  }

</style>
