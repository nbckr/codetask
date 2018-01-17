<template>
  <el-container>
    <el-main>
      <h1>Course overview</h1>
      <h2>Chapters:</h2>

      <el-row>
        <ul>
          <li v-for="chapter in 5">
            <el-col :span="10"><p>Chapter # {{ course }}:</p></el-col>
            <el-col :span="10">
              <el-progress :percentage="70"></el-progress>
            </el-col>
          </li>
        </ul>
      </el-row>

    </el-main>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        course: 'MyCourse'
      }
    }
  }
</script>

<style scoped>
  .el-main {
    background: white;
    padding: 1.6rem;
  }

  li {
    display: flex;
    margin: 1rem;
  }

  p {
    margin: 0;
  }
</style>
