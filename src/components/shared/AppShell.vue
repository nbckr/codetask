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
  import Background from '@/components/shared/Background.vue'

  export default {
    components: {
      appHeader: Header,
      appBackground: Background
    }
  }
</script>

<style scoped lang="scss">

  // HTWG Colors
  $htwg-color-teal: #009b91;
  $htwg-color-soft-blue: #d9e5ec;
  $htwg-color-dark-blue: #334152;

  // Dimensions
  $dot-size: 0.2rem;
  $dot-space: 8rem;

  $tablet-width: 768px;
  $desktop-width: 1024px;

  @mixin sm {
    @media (min-width: #{$tablet-width}) {
      @content;
    }
  }

  #container {
    padding: 0;
    height: 100%;
    border: green 3px solid;

    // HTWG style soft-blue grid, inspired by https://codepen.io/edmundojr/pen/xOYJGw
    background: linear-gradient(90deg, $htwg-color-soft-blue ($dot-space - $dot-size), transparent 1%) center,
    linear-gradient($htwg-color-soft-blue ($dot-space - $dot-size), transparent 1%) center,
    $htwg-color-dark-blue;
    background-size: $dot-space $dot-space;
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
    border-bottom: teal solid 0.6rem;

    padding: 0.4rem;
    margin-top: 0;

    @include sm {
      padding: 2rem;
      margin-top: 1.6rem;
    }
  }

</style>
