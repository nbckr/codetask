<template>

  <div>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="12">
        <h1>{{ currentCourse.title }}</h1>
        <h2>{{ currentChapter.title }}</h2>

        <p>Willkommen im Kapitel <i>{{ currentChapter.title }}</i>!</p>
      </el-col>

      <el-col :xs="24" :sm="12" class="framed">
        <ul>
          <li>
            <icon name="clock-o" label="Dauer"/>
            Dauer: ~ {{ duration }} min
          </li>
          <li>
            <icon name="list-ul" label="Aufgaben"/>
            Aufgaben: {{ currentChapter.tasks.length }}
            <ul>
              <li v-if="currentKoanTasks.length > 0">
                <icon name="tasks"/>
                {{ currentKoanTasks.length }} Koan-Aufgaben
              </li>
              <li v-if="currentVideoTasks.length > 0">
                <icon name="film"/>
                {{ currentVideoTasks.length }} Video-Aufgaben
              </li>
              <li v-if="currentCodeTasks.length > 0">
                <icon name="terminal"/>
                {{ currentCodeTasks.length }} Code-Aufgaben
              </li>

            </ul>
          </li>
          <li>
            <icon name="percent" label="Fortschritt" class="fa-success"/>
            Fortschritt: {{ currentSolvedTasks.length }} / {{ currentChapter.tasks.length }}
          </li>
        </ul>
      </el-col>
    </el-row>

  </div>

</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      Icon
    },

    computed: {
      ...mapGetters([
        'currentCourse',
        'currentChapter',
        'currentKoanTasks',
        'currentCodeTasks',
        'currentVideoTasks',
        'currentSolvedTasks'
      ]),

      /* estimate duration of course depending on tasks and their types */
      duration: (vm) => {
        const koanDuration = 3
        const codeDuration = 5
        const videoDuration = 10
        return vm.currentKoanTasks.length * koanDuration + vm.currentCodeTasks.length * codeDuration +
          vm.currentVideoTasks.length * videoDuration
      }
    }
  }
</script>

<style scoped>
  div {
    background-color: #fff;
    padding: 1.6rem;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  li > ul {
    margin-left: 1.5rem;
  }

  li {
    list-style: none;
    padding: 0.3rem 0.5rem;
  }

  .fa-icon {
    margin-right: 0.5rem;

    width: auto;
    height: 1.2em;

    /* Safari */
    max-width: 100%;
    max-height: 100%;
  }
</style>
