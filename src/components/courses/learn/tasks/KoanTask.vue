<template>
  <div>

    <!-- Inputs to be inserted into the codemirror component at initialization time-->
    <input
      v-for="(solution, index) in activeTask.data.solutions"
      v-autowidth="autowidthOptions"
      :id="`input-${index}`"
      class="code-input"
      v-model="userInputs[index]"
    />

    <codemirror
      :value="activeTask.data.code"
      :options="codemirrorOptions"
      @ready="onCmReady"
      @blur="onCmBlur"
    />

    <small> All correct: {{ allSolutionsCorrect }}</small>
  </div>

</template>

<script>
  import { codemirror } from 'vue-codemirror';
  import 'codemirror/lib/codemirror.css';
  import 'codemirror/theme/monokai.css';    // Theme
  import 'codemirror/mode/clike/clike';     // Scala

  export default {
    data () {
      return {
        userInputs: [],
        codemirrorOptions: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          mode: 'text/x-scala',
          theme: 'monokai',
          readOnly: 'nocursor'
        },
        autowidthOptions: {
          minWidth: '2.5rem',
          maxWidth: '20rem',
          comfortZone: 2
        }
      };
    },

    components: {
      codemirror
    },

    props: ['activeTask'],

    methods: {
      parseSolutions () {
        return 'null';
      },

      onCmBlur (cm) {
        console.log('blur', cm);
      },
      onCmReady (cm) {
        const inputNodes = Array.from(document.querySelectorAll('.code-input'));
        const regex = /\(__\)/g;   // golbal regex matching the solution placeholder

        cm.setValue(this.activeTask.data.code.replace(regex, ''));

        this.activeTask.data.code.split('\n').forEach((line, index) => {
          let match;
          while ((match = regex.exec(line))) {
            const pos = { line: index, ch: match.index };
            cm.setBookmark(pos, { widget: inputNodes.shift() });
          }
        });
      }
    },

    computed: {
      allSolutionsCorrect () {
        if (this.activeTask.data.solutions.length !== this.userInputs.length) {
          return false;
        }

        return this.activeTask.data.solutions
          .every((solution, index) => this.userInputs[index].trim() === solution.trim());
      }
    }
  };
</script>

<style>
  /* Attention: <style> not scoped! */

  .CodeMirror {
    padding: 1rem;
    font-family: monospace;
    line-height: 2rem !important;
    cursor: default !important;
  }

  .CodeMirror-linenumbers {
    width: 1.5rem;
  }

  .CodeMirror-linenumber {
    text-align: center;
  }

  input {
    /* transition: width 0.15s; */

    /* From Monokai Syntax CSS theme */
    background-color: #49483E;
    border: 1px solid #ccc;
    border-radius: 0.2rem;

    /* Don't touch padding-right, it seems buggy with vue-input-autowidth */
    padding: 6px 0 6px 6px;
    margin: 0 0.3rem;

    color: #FFFFFF;
    font-family: monospace;
    font-size: medium;
    font-weight: bold;
    cursor: text;
  }

  input:focus {
    outline: none;
    background-color: rgba(254, 130, 85, 0.75);
    border-color: #9ecaed;
    box-shadow: 0 0 10px #9ecaed;
  }

</style>
