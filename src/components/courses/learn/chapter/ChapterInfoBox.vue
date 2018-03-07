<template>

  <aside>
    <ul>
      <li>
        <icon name="clock-o" label="Dauer"/>
        Dauer: ~ {{ duration }} min
      </li>

      <li>
        <icon name="list-ul" label="Aufgaben"/>
        Aufgaben: {{ currentChapter.tasks.length }}
      </li>
      <ul class="indented">
        <li v-if="currentKoanTasks.length > 0">
          <icon name="tasks"/>
          {{ currentKoanTasks.length }} Koan-Aufgabe{{ currentKoanTasks.length > 1 ? 'n' : '' }}
        </li>
        <li v-if="currentVideoTasks.length > 0">
          <icon name="film"/>
          {{ currentVideoTasks.length }} Video-Aufgabe{{ currentVideoTasks.length > 1 ? 'n' : '' }}
        </li>
        <li v-if="currentCodeTasks.length > 0">
          <icon name="terminal"/>
          {{ currentCodeTasks.length }} Code-Aufgabe{{ currentCodeTasks.length > 1 ? 'n' : '' }}
        </li>
      </ul>

      <li>
        <icon name="percent" label="Fortschritt" class="fa-success"/>
        Fortschritt: {{ currentSolvedTasks.length }} / {{ currentChapter.tasks.length }}
      </li>
    </ul>
  </aside>

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
        'currentChapter',
        'currentKoanTasks',
        'currentCodeTasks',
        'currentVideoTasks',
        'currentSolvedTasks'
      ]),

      // estimate duration of course depending on tasks and their types
      // TODO: Use same values as in the tasks' computed scoreValue, as they reflect required minutes
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

  .indented {
    margin-left: 1.5rem;
  }

  li {
    display: flex;
    list-style: none;
    padding: 0.3rem 0.5rem;
  }

  .fa-icon {
    margin-right: 0.7rem;

    width: auto;
    height: 1.2em;

    /* Safari */
    max-width: 100%;
    max-height: 100%;
  }
</style>
