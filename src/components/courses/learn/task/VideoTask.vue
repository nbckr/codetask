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

    data () {
      return {
        scoreValue: 1
      }
    },

    computed: {
      ...mapGetters([
        'currentUserSettings'
      ])
    },

    methods: {
      onVideoEnded () {
        this.$store.dispatch('CURRENT_TASK_SOLVED', this.scoreValue)
      }
    }
  }
</script>

<style scoped>
</style>
