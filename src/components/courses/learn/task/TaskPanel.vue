<template>

  <div>

    <div id="router-window">
      <transition leave-active-class="animated slideOutLeft" enter-active-class="animated slideInRight" mode="out-in" duration="500">
        <router-view :key="$route.params.task"/>
      </transition>
    </div>

    <br>

    <el-row type="flex" justify="space-between">

      <el-col :xs="6" :sm="3" :md="2">
        <el-button
          v-if="!isCourseStart"
          @click="goToLastTask">
          <i class="el-icon-arrow-left"></i>
        </el-button>
      </el-col>

      <el-col :xs="6" :sm="3" :md="4">
        <el-button
          v-if="!isCourseEnd"
          type="primary" plain
          :disabled="nextIsDisabled"
          @click="checkInputAndGoToNextTask">
          <span class="hidden-sm-and-down">Weiter </span>
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </el-col>

    </el-row>

  </div>

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      isCourseStart: (vm) => !vm.currentTask,

      isCourseEnd: (vm) => false,

      nextIsDisabled: (vm) => {
        if (vm.isCourseStart) return false
        return !vm.currentTaskProgress.solved
      },

      ...mapGetters([
        'currentTask',
        'currentCourseProgress',
        'currentTaskProgress'
      ])
    },

    methods: {
      goToLastTask () {
        if (this.currentTask.id === 1) {
          this.$router.push({name: 'chapter'})
        } else {
          this.$router.push({name: 'task', params: {task: this.currentTask.id - 1}})
        }
      },

      checkInputAndGoToNextTask () {
        // TODO: Check solutions
        // TODO: Check if go to ChapterEnd

        const task = this.currentTask ? this.currentTask.id + 1 : 1
        this.$router.push({
          name: 'task', params: {task}
        })
      }
    }
  }
</script>

<style scoped>

  section {
    border: yellow 2px solid;
  / / background-color: white;
  / / display: inline-block;
    padding: 1.6rem;
  }

  +
  .el-button {
    width: 100%;
  }

  #router-window {
    height: 550px;
    overflow: scroll;
  }
</style>
