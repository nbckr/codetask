<template>

  <section>

    <div class="description">
      <p>{{ activeTask.data.description.trim() }}</p>
    </div>

    <codemirror
      :value="activeTask.data.code"
      :options="codemirrorOptions"
    />

  </section>

</template>

<script>
  import BaseTask from './BaseTask';
  import { codemirror } from 'vue-codemirror';
  import 'codemirror/lib/codemirror.css';
  import 'codemirror/theme/monokai.css';    // Theme
  import 'codemirror/mode/clike/clike';     // Scala

  export default {
    extends: BaseTask,

    data () {
      return {
        codemirrorOptions: {
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
    }
  }
  ;
</script>

<style>
  /* TODO: Duplicated code */

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
