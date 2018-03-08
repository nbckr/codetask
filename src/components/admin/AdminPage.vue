<template>
  <div>
    <h1>Administration</h1>

    <el-tabs v-model="selectedTab" type="border-card">
      <el-tab-pane name="courses" label="Kurse verwalten">
        <admin-courses-panel />
      </el-tab-pane>
      <el-tab-pane name="users" label="Nutzer verwalten">
        <admin-users-panel />
      </el-tab-pane>
    </el-tabs>




  </div>
</template>

<script>
  import AdminCoursesPanel from './AdminCoursesPanel'
  import AdminUsersPanel from './AdminUsersPanel'

  export default {
    data () {
      return {
        selectedTab: 'courses'
      }
    },

    components: {
      AdminCoursesPanel,
      AdminUsersPanel
    }
  }
</script>

<style scoped>
</style>
