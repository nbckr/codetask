<template>

  <codemirror
    :value="currentTask.data.code"
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
      onBlankSolved () {
        this.$emit('task-solved', this.scoreValue)
      }
    },

    components: {
      codemirror
    },

    props: ['currentTask']
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
