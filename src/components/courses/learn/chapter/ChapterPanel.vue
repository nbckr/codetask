<template>
  <div id="chapter-wrapper">

    <h1>{{ activeChapter.title }}</h1>

    <!-- Small devices get the small progress indicator and a chapter picker right here -->
    <app-small-chapter-picker
      class="hidden-md-and-up"
      :active-chapter="activeChapter"
    ></app-small-chapter-picker>

    <app-small-chapter-progress
      class="hidden-sm-and-up"
      :tasks="activeChapter.tasks"
    />

    <!-- Large devices get the nav aside (on LearnPage) and the full-sized ChapterTasksProgress -->
    <app-chapter-tasks-progress
      class="hidden-xs-only"
      :tasks="activeChapter.tasks"
    />

    <app-task-panel/>

  </div>
</template>

<script>
  import ChapterTasksProgress from './ChapterTasksProgress';
  import SmallChapterProgress from './SmallChapterProgress';
  import SmallChapterPicker from './SmallChapterPicker';
  import TaskPanel from '../task/TaskPanel';
  import { mapGetters } from 'vuex';

  export default {
    components: {
      appChapterTasksProgress: ChapterTasksProgress,
      appTaskPanel: TaskPanel,
      appSmallChapterPicker: SmallChapterPicker,
      appSmallChapterProgress: SmallChapterProgress
    },

    computed: {
      // chapterIdAsNumber: (vm) => Number.parseInt(vm.chapter),
      // activeChapter: (vm) => test.chapters.find(chapter => chapter.id === vm.chapterIdAsNumber),
      ...mapGetters([
        'activeChapter'
      ])
    },

    props: ['chapter']
  };
</script>

<style scoped>
  #chapter-wrapper {
    width: 100%;
    min-width: 444px;
    margin: 0 auto;

    padding: 0.1rem;
  / / border: lightgrey 1 px solid;
  / / display: inline-block;
    transition: height 1s, padding 0.5s ease-out;
  }

  @media only screen and (min-width: 768px) {
    #chapter-wrapper {
      width: 768px;
      padding: 1.6rem;
    }
  }

  h1 {
    padding: 0.5rem 1rem;
    margin: 0;
    text-align: center;
    background-color: lightgrey;
    color: white;
  }
</style>
