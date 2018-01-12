<template>
  <div>

    <!-- Inputs to be inserted into the codemirror component at initialization time-->
    <input
      v-for="(solution, index) in activeTask.data.solutions"
      v-autowidth="{ minWidth: '5`0px', maxWidth: '300px', comfortZone: 0 }"
      :id="`input-${index}`"
      class="code-input"
      v-model="userInput[index]"
    />

    <codemirror
      :value="activeTask.data.code"
      :options="cmOption"
      @ready="onCmReady"
      @blur="onCmBlur"
    />

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
        userInput: [],
        cmOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          mode: 'text/x-scala',
          theme: 'monokai',
          readOnly: 'nocursor'
        }
      };
    },

    components: {
      codemirror
    },

    props: [ 'activeTask' ],

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

    created () {
      this.parseSolutions();
    }
  };
</script>

<style>

  .CodeMirror-line, .CodeMirror-linenumber {
    /* Code style */
    font-family: monospace;
    line-height: 2rem !important;
  }

  input {
    /* From Monokai Syntax CSS theme */
    background-color: #49483E;
    border: 1px solid #ccc;
    padding: 6px 10px;
    border-radius: 0.2rem;
    color: #FFFFFF;

    margin: 0 0.3rem;
    transition: width 0.15s;
    min-width: 40px;
    max-width: 300px;
  }

  input:focus {
    outline: none;
    background-color: rgba(254, 130, 85, 0.75);
    border-color: #9ecaed;
    box-shadow: 0 0 10px #9ecaed;
  }

</style>
