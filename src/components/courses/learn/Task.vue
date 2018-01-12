<template>

  <el-main>
    <section>

      <div class="description">
        {{ activeTask.data.description }}
      </div>

      <p v-if="activeTask">{{ activeTask }}</p>

      <div style="overflow: scroll">
        <codemirror
          v-if="activeTask.tag === 'koan-task'"
          :value="activeTask.data.code"
          :options="cmOption"
          @ready="onCmReady"
          @focus="onCmFocus"
          @input="onCmCodeChange"
          @blur="onCmBlur"
        />
      </div>

    </section>
  </el-main>

</template>

<script>
  import {codemirror} from 'vue-codemirror';
  import 'codemirror/lib/codemirror.css';
  import 'codemirror/theme/monokai.css';    // Theme
  import 'codemirror/mode/clike/clike';     // Scala

  export default {
    data () {
      return {
        code: 'const a = 10',
        cmOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          mode: 'text/x-scala',
          theme: 'monokai'
        }
      };
    },

    components: {
      codemirror
    },

    props: ['activeTask'],

    methods: {
      onCmBlur (cm) {
        console.log('blur', cm);

        let replace = document.createElement('input');
        let bm = cm.setBookmark({line: 2, ch: 2}, {
          widget: replace
        });
        console.log(bm);
      },
      onCmReady (cm) {
        console.log('the editor is readied!', cm);
      },
      onCmFocus (cm) {
        console.log('the editor is focus!', cm);
      },
      onCmCodeChange (newCode) {
        console.log('this is new code', newCode);
        // Nicht nötig this.code = newCode;
      }
    }
  };
</script>

<style scoped>

  section {
    border: red 4px solid;
    background-color: white;
    display: inline-block;
    padding: 1.6rem;
  }

</style>
