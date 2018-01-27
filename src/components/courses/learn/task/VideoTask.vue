<template>

  <youtube
    :video-id="activeTask.data.url"
    player-width="100%"
    :player-vars="{ autoplay: currentUserSettings.autoplay }"
    @ended="onVideoEnded"
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
    },

    methods: {
      onVideoEnded () {
        console.log('Video ended')
        this.$store.dispatch('CURRENT_TASK_SOLVED')
      }
    }
  }
</script>

<style scoped>
</style>
