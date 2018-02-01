<template>
  <div class="signin-form">
    <form @submit.prevent="onSubmit">

      <!-- el-input will compile to input, so the label will find its input element after compilation -->
      <el-row class="form-row">
        <label for="email">E-Mail</label>
        <el-input
          type="email"
          id="email"
          v-model="email"
          placeholder="E-Mail-Adresse eintragen"
        />
      </el-row>

      <el-row class="form-row">
        <label for="password">Passwort</label>
        <el-input
          type="password"
          id="password"
          v-model="password"
          placeholder="Passwort wählen"
        />
      </el-row>

      <el-row
        class="form-row"
        type="flex"
        justify="center">
        <el-button
          native-type="submit"
          type="primary">Anmelden
        </el-button>
      </el-row>

    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('AUTH_LOGIN_USER', {
          email: formData.email,
          password: formData.password,
          returnSecureToken: true
        })
          .then(() => this.$router.push({name: 'dashboard'}))
          .catch(error => this.$notify({
            title: 'Warning',
            message: error.message,
            type: 'warning'
          }))
      }
    }
  }
</script>

<style scoped>
  label {
    display: inline-block;
    width: 9rem;
  }

  .form-row {
    display: flex;
    align-items: center;
    margin: 1rem 0;
  }
</style>
