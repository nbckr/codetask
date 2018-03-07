<template>
  <div>

    <input
      v-model="inputValue"
      v-autowidth="autowidthOptions"
      :class="{ success: solved, 'used-helper': usedHelper }"
      :readonly="solved"
    />

    <el-tooltip
      v-if="!solved"
      effect="light"
      placement="top-start"
      :disabled="!showHelperTooltip"
    >
      <div slot="content" class="helper-tooltip">
        {{ solution }}
        <el-button
          plain
          size="mini"
          v-clipboard:copy="solution"
          v-clipboard:success="onCopySolution"
        >
          <icon name="copy"/>
        </el-button>
      </div>
      <i
        class="el-icon-question"
        @click="showHelperTooltip = !showHelperTooltip"
      />
    </el-tooltip>

    <el-tooltip
      v-else
      effect="light"
      placement="top-start"
      content="Richtig gelöst! Versuche es beim nächsten mal ohne Hilfe."
      :disabled="!usedHelper"
    >
      <i
        class="el-icon-success"
        :class="{ success: !usedHelper }"
      />
    </el-tooltip>

  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        inputValue: '',
        showHelperTooltip: false,
        usedHelper: false,
        autowidthOptions: {
          minWidth: '2.5rem',
          maxWidth: '20rem',
          comfortZone: 9
        }
      }
    },

    components: {
      Icon
    },

    props: {
      solution: {
        type: String,
        required: true
      }
    },

    methods: {
      onCopySolution () {
        this.usedHelper = true
        this.showHelperTooltip = false
      }
    },

    computed: {
      ...mapGetters([
        'currentTask',
        'currentTaskProgress'
      ]),
      solved (vm) {
        return vm.currentTaskProgress.solved || vm.inputValue === vm.solution
      }
    },

    watch: {
      solved () {
        this.$emit('solved')
      }
    },

    created () {
      // If users revisit a solved task, fill in value immediately
      if (this.solved) {
        this.inputValue = this.solution
      }
    }
  }
</script>

<style scoped lang="scss">
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

  input.success {
    // background-color: rgba(111, 240, 111, 0.75);
    background-color: $success-color;

    &.used-helper {
      // color: $htwg-color-dark-blue;
      background-color: lighten($success-color, 25%);
    }
  }

  .helper-tooltip {
    button {
      padding: 4px 6px;
      margin-left: 0.6rem;
    }
  }

  i {
    &:not(.success) {
      cursor: pointer;
    }
    &.success {
      color: $success-color;
    }
  }

</style>
