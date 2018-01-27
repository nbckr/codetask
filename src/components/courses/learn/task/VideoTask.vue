<template>

    <youtube
    :video-id="activeTask.data.url"
    player-width="100%"
    :player-vars="{ autoplay: currentUserSettings.autoplay }"
    @ended=""
  />

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['activeTask'],

    computed: {
      ...mapGetters([
        // TODO: 0 / 1
        'currentUserSettings'
      ])
    }
  }
</script>

<style scoped>
</style>
