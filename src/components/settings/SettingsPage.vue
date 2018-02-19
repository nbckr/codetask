<template>
  <div>
    <h1>Einstellungen</h1>

    {{ currentUser }}

    <el-switch v-model="currentUser.settings.autoplay" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'currentUser'
      ])
    }
  }
</script>

<style scoped lang="scss">
</style>
