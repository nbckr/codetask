<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="12">
      <p>Glückwunsch, du hast das Kapitel <i>{{ currentChapter.title }}</i> erfolgreich beendet!</p>
    </el-col>

    <el-col :xs="24" :sm="12" class="framed">
      <p>Wie hat dir dieses Kapitel gefallen?</p>
      <el-rate v-model="rating" :disabled="rating"/>
      <el-alert
        v-if="rating"
        title="Danke für deine Bewertung!"
        type="warning"
        :closable="false"
      />
    </el-col>
  </el-row>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        rating: 0
      }
    },

    computed: {
      ...mapGetters([
        'currentChapter'
      ])
    }
  }
</script>

<style scoped>
</style>
