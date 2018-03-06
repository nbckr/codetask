<template>
  <div>
    <h1>Einstellungen</h1>

    <div v-if="false">
      {{ currentUser }}
      <el-switch v-model="currentUser.settings.autoplay"/>
    </div>

    <div v-else>
      <el-alert
        title="Diese Seite ist momentan nicht verfügbar"
        type="warning"
        show-icon
        closeable="false"
      />
    </div>


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
