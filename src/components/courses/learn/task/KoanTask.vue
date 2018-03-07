<template>
  <div>
    <!-- Inputs to be inserted into the codemirror component at initialization time-->
    <koan-task-blank
      v-for="(solution, index) in currentTask.data.solutions"
      :key="index"
      :solution="solution"
      class="koan-blank"
      @solved="onBlankSolved"
    />

    <codemirror
      :value="currentTask.data.code"
      :options="codemirrorOptions"
      @ready="onCmReady"
    />
  </div>

</template>

<script>
  import { codemirror } from 'vue-codemirror'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/theme/monokai.css' // Theme
  import 'codemirror/mode/clike/clike' // Scala
  import KoanTaskBlank from './KoanTaskBlank'

  export default {
    data () {
      return {
        remainingBlanks: this.currentTask.data.solutions.length,
        scoreValue: this.currentTask.data.solutions.length,
        codemirrorOptions: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          mode: 'text/x-scala',
          theme: 'monokai',
          readOnly: 'nocursor'
        }
      }
    },

    components: {
      codemirror,
      KoanTaskBlank
    },

    methods: {
      onCmReady (cm) {
        const blankNodes = Array.from(document.querySelectorAll('.koan-blank'))
        const regex = /\(__\)/g // global regex matching the solution placeholder

        // Change editor value to code without placeholders
        // Note: This implementation doesn't support multiple placeholders in one line
        cm.setValue(this.currentTask.data.code.replace(regex, ''))

        // Manually move the <koan-task-blank> DOM nodes into editor,
        // making use of CodeMirror's bookmark feature
        this.currentTask.data.code.split('\n').forEach((line, index) => {
          let match
          while ((match = regex.exec(line))) {
            const pos = {line: index, ch: match.index}
            cm.setBookmark(pos, {widget: blankNodes.shift()})
          }
        })
      },

      onBlankSolved () {
        this.remainingBlanks--
        if (this.remainingBlanks === 0) {
          this.onTaskSolved()
        }
      },

      onTaskSolved () {
        console.log('koan solved')
        this.$emit('task-solved', this.scoreValue)
      }
    },

    props: ['currentTask'],

    created () {
      // Take care of edge case with zero blanks
      if (this.currentTask.data.solutions.length === 0) {
        this.onTaskSolved()
      }
    }
  }
</script>

<style scoped lang="scss">
  /deep/ .CodeMirror {
    padding: 1rem;
    font-family: monospace;
    line-height: 2rem !important;
    cursor: default !important;
  }

  /deep/ .CodeMirror-linenumbers {
    width: 1.5rem;
  }

  /deep/ .CodeMirror-linenumber {
    text-align: center;
  }
</style>
