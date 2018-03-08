<template>
  <div>
    <h2>Nutzer verwalten</h2>

    <!-- TODO -->
    <el-alert
      title="Nutzer können derzeit nicht bearbeitet oder gelöscht werden,
             nur direkt in Firebase (Database + Authentication)."
      type="warning"
      show-icon
      :closeable="true"
    />

    <el-alert
      v-for="user in users"
      :key="user.uid"
      :title="user.email"
      type="success"
      :closable="false"
    >
      <ul>
        <li>Name:   <b>{{ user.displayName }}</b></li>
        <li>Rolle:  <b>{{ user.role }}</b></li>
        <li>Punkte: <b>{{ user.score }}</b></li>
      </ul>
    </el-alert>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'users'
      ])
    }
  }
</script>

<style></style>
