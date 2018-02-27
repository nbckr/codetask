<template>
  <el-container id="container">

    <el-header>
      <app-header/>
    </el-header>

    <el-row type="flex" justify="space-around">
      <!-- Width of main wrapper -->
      <el-col :xs="23" :sm="22" :md="21" :lg="17" :xl="15">
        <el-main>
          <div id="main-wapper">
            <el-collapse-transition>
              <!-- Show main page: Dashboard, learning, settings, ... -->
              <router-view/>
            </el-collapse-transition>
          </div>
        </el-main>

      </el-col>
    </el-row>

  </el-container>
</template>

<script>
  import Header from '@/components/shared/Header.vue'

  export default {
    components: {
      appHeader: Header
    }
  }
</script>

<style scoped lang="scss">

  $tablet-width: 768px;

  @mixin sm {
    @media (min-width: #{$tablet-width}) {
      @content;
    }
  }

  #container {
    padding: 0;
    height: 100%;
    // border: green 3px solid;
  }

  .el-header, .el-main {
    padding: 0;
  }

  .el-main {
    display: flex;
    justify-content: center;
  }

  #main-wapper {
    // min-width: 600px;
    // max-width: 1150px;
    width: 100%; // Managed by Element rows / cols
    background-color: white;
    border-bottom: $htwg-color-teal solid 0.6rem;
    margin-bottom: 1.6rem;
    transition: padding 0.3s ease-out, margin 0.3s ease-out;

    padding: 1rem;
    margin-top: 0.75rem;

    @include sm {
      padding: 3rem;
      margin-top: 1.6rem;
    }
  }

  /deep/ h1 {
    margin-top: 0;
  }
</style>
