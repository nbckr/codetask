<template>
  <div
    class="revealer"
    @click="toggleValue()"
  >
    <i :class="value ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" ></i>
    <br>
    <el-button type="text">
      {{ name }} {{ value ? 'ausblenden' : 'anzeigen' }}
    </el-button>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },

    methods: {
      // TODO: Better not directly modify value in child component
      toggleValue () {
        this.value = !this.value
        this.$emit('input', this.value)
      }
    }
  }
</script>

<style scoped lang="scss">
  .revealer {
    text-align: center;

    i {
      cursor: pointer;
      font-size: 125%;
      color: white;
      background-color: $htwg-color-teal;
      padding: 5px;
      border-radius: 50%;
    }

    button {
      padding-bottom: 0;
    }
  }
</style>
