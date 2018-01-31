<template>

  <codemirror
    :value="activeTask.data.code"
    :options="codemirrorOptions"
  />

</template>

<script>
  /* NOTE: Because of lacking backend support, this task type is currently disabled */
  import { codemirror } from 'vue-codemirror'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/theme/monokai.css' // Theme
  import 'codemirror/mode/clike/clike' // Scala

  export default {
    data () {
      return {
        codemirrorOptions: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          mode: 'text/x-scala',
          theme: 'monokai'
        },
        scoreValue: 1
      }
    },

    methods: {
      onSolved () {
        this.$store.dispatch('CURRENT_TASK_SOLVED', this.scoreValue)
      }
    },

    components: {
      codemirror
    },

    props: ['activeTask']
  }
</script>

<style>
  .CodeMirror {
    padding: 1rem;
    line-height: 1.2rem !important;
  }

  .CodeMirror-linenumbers {
    width: 1.5rem;
  }

  .CodeMirror-linenumber {
    text-align: center;
  }
</style>
