<template>
  <div>
    <!-- Inputs to be inserted into the codemirror component at initialization time-->
    <div
      v-for="(solution, index) in currentTask.data.solutions"
      class="code-input"
    >

      <input
        v-autowidth="autowidthOptions"
        :id="`input-${index}`"
        :class="{ success: userInputsCorrect[index] }"
        :readonly="userInputsCorrect[index]"
        :autofocus="index === 0"
        v-model="userInputs[index]"
        @input="onInput"
      />

      <el-tooltip
        effect="light"
        placement="top-start"
      >
        <div slot="content" class="helper-tooltip">
          {{ solution }}
          <el-button size="mini" plain v-clipboard:copy="solution">
            <icon name="copy" />
          </el-button>
        </div>
        <i class="el-icon-question"></i>
      </el-tooltip>

    </div>

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
  import Icon from 'vue-awesome/components/Icon'

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
          comfortZone: 9
        },
        scoreValue: 1
      }
    },

    components: {
      codemirror,
      Icon
    },

    methods: {
      onCmReady (cm) {
        const inputNodes = Array.from(document.querySelectorAll('.code-input'))
        const regex = /\(__\)/g // golbal regex matching the solution placeholder

        // Change editor value to code without placeholders
        // Note: This implementation doesn't support multiple placeholders in one line
        cm.setValue(this.currentTask.data.code.replace(regex, ''))

        // Manually move the <input> DOM nodes into editor, making use of CodeMirror's bookmark feature
        this.currentTask.data.code.split('\n').forEach((line, index) => {
          let match
          while ((match = regex.exec(line))) {
            const pos = {line: index, ch: match.index}
            cm.setBookmark(pos, {widget: inputNodes.shift()})
          }
        })
      },

      onInput () {
        if (this.allSolutionsCorrect) {
          console.log('koan solved')
          this.$emit('task-solved', this.scoreValue)
        }
      }
    },

    computed: {
      allSolutionsCorrect () {
        if (this.currentTask.data.solutions.length !== this.userInputs.length) {
          return false
        }

        return this.currentTask.data.solutions.every(
          (solution, index) => this.userInputs[index].trim() === solution.trim())
      },

      userInputsCorrect () {
        // TODO: Problem with array sizes; better solution might be vuelidate
        return this.currentTask.data.solutions.map((input, index) => input === this.userInputs[index])
      }
    },

    props: ['currentTask']
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

  /deep/ input {
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

  /deep/ input:focus {
    outline: none;
    background-color: rgba(254, 130, 85, 0.75);
    border-color: #9ecaed;
    box-shadow: 0 0 10px #9ecaed;
  }

  /deep/ input.success {
    background-color: rgba(111, 240, 111, 0.75) !important;
  }

  .helper-tooltip {
    button {
      padding: 4px 6px;
    }
  }

</style>
