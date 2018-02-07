<template>

  <div>

    <div id="router-window">
      <transition leave-active-class="animated slideOutLeft" enter-active-class="animated slideInRight" mode="out-in" duration="500">
        <!-- BaseTask -->
        <router-view
          :key="$route.params.task"
          @task-solved="onTaskSolved"
        />
      </transition>
    </div>

    <br>

    <el-row type="flex" justify="space-between">

      <el-col :span="12">
        <el-row type="flex" class="row-bg" justify="start">
          <el-button
            v-if="!isChapterStart"
            @click="goToLastTask">
            <i class="el-icon-arrow-left"></i>
          </el-button>
        </el-row>
      </el-col>

      <el-col :span="12">
        <el-row type="flex" justify="end">
          <!-- ChapterStart-->
          <el-button
            v-if="isChapterStart"
            type="primary" plain
            :disabled="nextIsDisabled"
            @click="goToNextUnsolved">
            <span class="hidden-sm-and-down">Weiter zu Aufgabe {{ currentHighestSolvedTask.id + 1 }} </span>
            <i class="el-icon-arrow-right"></i>
          </el-button>

          <!-- Regular task -->
          <el-button
            v-else-if="!isChapterEnd"
            type="primary" plain
            :disabled="nextIsDisabled"
            :class="{'animated pulse': currentTaskProgress.solved }"
            @click="goToNext"
          >
            <span class="hidden-sm-and-down">Weiter </span>
            <i class="el-icon-arrow-right"></i>
          </el-button>

          <!-- ChapterEnd -->
          <el-button
            v-else-if="isChapterEnd"
            type="primary" plain
            @click="$router.push({name: 'dashboard'})"
          >
            <span class="hidden-sm-and-down">Zurück zum Dashboard</span>
            <i class="el-icon-arrow-up"></i>
          </el-button>
        </el-row>
      </el-col>
    </el-row>

  </div>

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      isFirstTask: (vm) => vm.currentTask && vm.currentTask.id === 1,
      isLastTask: (vm) => vm.currentTask && vm.currentTask.id === vm.currentChapter.tasks.length,
      isChapterStart: (vm) => vm.$route.name === 'chapter-start',
      isChapterEnd: (vm) => vm.$route.name === 'chapter-end',

      nextIsDisabled: (vm) => {
        if (vm.isChapterStart) return false
        return !vm.currentTaskProgress.solved
      },

      ...mapGetters([
        'currentTask',
        'currentChapter',
        'currentCourseProgress',
        'currentTaskProgress',
        'currentHighestSolvedTask',
        'currentUserSettings'
      ])
    },

    methods: {
      goToLastTask () {
        if (this.isFirstTask) {
          this.$router.push({name: 'chapter-start'})
        } else {
          const task = this.isChapterEnd ? this.currentChapter.tasks.length : this.currentTask.id - 1
          this.$router.push({name: 'task', params: {task}})
        }
      },

      goToNext () {
        if (this.isLastTask) {
          this.$router.push({name: 'chapter-end'})
        } else {
          const task = this.isChapterStart ? 1 : this.currentTask.id + 1
          this.$router.push({
            name: 'task', params: {task}
          })
        }
      },

      goToNextUnsolved () {
        this.$router.push({
          name: 'task', params: {task: this.currentHighestSolvedTask.id + 1}
        })
      },

      onTaskSolved () {
        if (this.currentUserSettings.autoNext) {
          this.goToNext()
        }
      }
    }
  }
</script>

<style scoped lang="scss">

  section {
    border: yellow 2px solid;
    // background-color: white;
    // display: inline-block;
    padding: 1.6rem;
  }

  +
  .el-button {
    width: 100%;
  }

  #router-window {
    height: 550px;
    // overflow: scroll;
  }
</style>
