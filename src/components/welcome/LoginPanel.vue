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
          placeholder="Passwort eintragen"
        />
      </el-row>

      <el-row
        class="form-row"
        type="flex"
        justify="center">
        <el-button
          native-type="submit"
          type="primary"
          :loading="isLoading"
        >
          Anmelden
        </el-button>
      </el-row>

      <el-row
        type="flex"
        justify="center">
        <router-link
          :to="{name: 'register'}"
          tag="p"
        ><a>... oder neues Konto anlegen</a>
        </router-link>
      </el-row>

    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: '',
        isLoading: false
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password
        }

        this.isLoading = true
        this.$store.dispatch('AUTH_LOGIN_USER', {
          email: formData.email,
          password: formData.password,
          returnSecureToken: true
        })
          .catch(error => {
            this.$notify({
              title: 'Anmeldung fehlgeschlagen',
              message: error.message,
              type: 'warning',
              offset: 180
            })
            // This is a little hacky, but there is no finally() method
            // and module gets unloaded anyhow when login was successful
            this.isLoading = false
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  label {
    display: inline-block;
    width: 9rem;
  }

  .form-row {
    display: flex;
    align-items: center;
    margin: 1rem 0;
  }

  a {
    color: black;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
