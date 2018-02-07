<template>
  <div id="chapter-wrapper">

    <h1>{{ currentChapter.title }}</h1>

    <!-- Small devices get a chapter picker to replace the nav aside (on LearnPage) -->
    <small-chapter-picker
      class="hidden-md-and-up"
    />

    <chapter-tasks-progress
      :tasks="currentChapter.tasks"
    />

    <task-panel id="task-panel"/>

  </div>
</template>

<script>
  import ChapterTasksProgress from './ChapterTasksProgress'
  import SmallChapterPicker from './SmallChapterPicker'
  import TaskPanel from '../task/TaskPanel'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      ChapterTasksProgress,
      TaskPanel,
      SmallChapterPicker
    },

    computed: {
      ...mapGetters([
        'currentChapter'
      ])
    }
  }
</script>

<style scoped lang="scss">
  #chapter-wrapper {
    width: 100%;
    min-width: 444px;
    margin: 0 auto;

    //padding: 0.1rem;
    transition: height 1s, padding 0.5s ease-out;
  }

  @media only screen and (min-width: 768px) {
    #chapter-wrapper {
      //width: 768px;
      //padding: 1.6rem;
    }
  }

  h1 {
    padding: 0.5rem 1rem;
    margin: 0;
    text-align: center;
    background-color: lightgrey;
    color: white;
  }

  #task-panel {
    background-color: #fff;
    padding: 1.6rem;
  }
</style>
