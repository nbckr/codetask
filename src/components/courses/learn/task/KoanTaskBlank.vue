<template>
  <div>

    <input
      v-model="inputValue"
      v-autowidth="autowidthOptions"
      :class="{ success: solved, usedHelper }"
      :readonly="solved"
    />

    <el-tooltip
      effect="light"
      placement="top-start"
    >
      <div slot="content" class="helper-tooltip">
        {{ solution }}
        <el-button size="mini" plain v-clipboard:copy="solution">
          <icon name="copy"/>
        </el-button>
      </div>
      <i class="el-icon-question"></i>
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

    &.used-helper {
      background-color: yellow;
    }
  }

  .helper-tooltip {
    button {
      padding: 4px 6px;
      margin-left: 0.6rem;
    }
  }

</style>
