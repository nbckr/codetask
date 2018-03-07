<template>

  <youtube
    :video-id="currentTask.data.url"
    player-width="100%"
    :player-vars="{ autoplay: currentUserSettings.autoPlay }"
    @ready="onVideoReady"
    @ended="onVideoEnded"
    v-loading="!ready"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  />

</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    props: ['currentTask'],

    data () {
      return {
        ready: false,
        scoreValue: 5
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
      },

      onVideoReady () {
        this.ready = true
      },

      // Inspired by https://stackoverflow.com/questions/19061360
      convertISO8601ToMinutes (input) {
        const reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/
        let hours = 0
        let minutes = 0
        let seconds = 0
        let totalSeconds = 0
        let totalMinutes = 0

        if (reptms.test(input)) {
          const matches = reptms.exec(input)
          if (matches[1]) hours = Number(matches[1])
          if (matches[2]) minutes = Number(matches[2])
          if (matches[3]) seconds = Number(matches[3])
          totalSeconds = hours * 3600 + minutes * 60 + seconds
        }

        totalMinutes = Math.floor(totalSeconds / 60)
        return totalMinutes
      }
    },

    created () {
      // Update scoreValue to reflect video length
      axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          id: this.currentTask.data.url,
          part: 'contentDetails',
          key: process.env.FIREBASE_API_KEY
        }
      })
        .then(response => {
          const duration = response.data.items[0].contentDetails.duration
          this.scoreValue = this.convertISO8601ToMinutes(duration)
        })
        .catch(error => console.log(error))
    }
  }
</script>

<style scoped>
</style>
