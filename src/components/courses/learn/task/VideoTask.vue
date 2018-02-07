<template>

  <youtube
    :video-id="currentTask.data.url"
    player-width="100%"
    :player-vars="{ autoplay: currentUserSettings.autoPlay }"
    @ended="onVideoEnded"
  />

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['currentTask'],

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
        this.$emit('task-solved', this.scoreValue)
      }
    }
  }
</script>

<style scoped>
</style>
