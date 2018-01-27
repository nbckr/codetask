<template>

  <aside>
    <ul>
      <li>
        <icon name="clock-o" label="Dauer"/>
        Dauer: ~ {{ duration }} min
      </li>
      <li>
        <icon name="list-ul" label="Aufgaben"/>
        Aufgaben: {{ activeChapter.tasks.length }}
        <ul>
          <li v-if="activeKoanTasks.length > 0">
            <icon name="tasks"/>
            {{ activeKoanTasks.length }} Koan-Aufgaben
          </li>
          <li v-if="activeVideoTasks.length > 0">
            <icon name="film"/>
            {{ activeVideoTasks.length }} Video-Aufgaben
          </li>
          <li v-if="activeCodeTasks.length > 0">
            <icon name="terminal"/>
            {{ activeCodeTasks.length }} Code-Aufgaben
          </li>

        </ul>
      </li>
      <li>
        <icon name="percent" label="Fortschritt" class="fa-success"/>
        Fortschritt: {{ checkedTasks.length }} / {{ activeChapter.tasks.length }}
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
        'activeCourse',
        'activeChapter',
        'activeKoanTasks',
        'activeCodeTasks',
        'activeVideoTasks',
        'checkedTasks'
      ]),

      /* estimate duration of course depending on tasks and their types */
      duration: (vm) => {
        const koanDuration = 3
        const codeDuration = 5
        const videoDuration = 10
        return vm.activeKoanTasks.length * koanDuration + vm.activeCodeTasks.length * codeDuration +
          vm.activeVideoTasks.length * videoDuration
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
