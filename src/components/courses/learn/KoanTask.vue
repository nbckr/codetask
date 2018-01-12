<template>
  <div>

    {{ userInput }}


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
      @focus="onCmFocus"
      @input="onCmCodeChange"
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
        console.log(inputNodes);

        // const positions = [];
        const regex = /\(__\)/g;   // golbal regex matching the solution placeholder

        // let matchedPlaceholders = 0;
        // let codeWithoutPlaceholders = [];

        this.activeTask.data.code.split('\n').forEach((line, index) => {
          let match;
          while ((match = regex.exec(line))) {
            const pos = { line: index, ch: match.index };
            console.log(pos);
            cm.setBookmark(pos, { widget: inputNodes.shift() });
          }
        });

        // cm.setValue(this.activeTask.data.code.replace(regex, ''));
      },
      onCmFocus (cm) {
        console.log('the editor is focus!', cm);
      },
      onCmCodeChange (newCode) {
        console.log('this is new code', newCode);
        // Nicht nötig this.code = newCode;
      }
    },

    created () {
      this.parseSolutions();
    }
  };
</script>

<style>

  input {
    font-family: monospace;
    color: #fff;
    border: 2px solid #dadada;
    border-radius: 0.2rem;

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
