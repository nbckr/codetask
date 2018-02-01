<template>
  <div class="register-form">
    <form @submit.prevent="onSubmit">

      <el-row
        class="form-row"
        :class="{invalid: $v.displayName.$error}"
      >
        <label for="email">Benutzername</label>
        <el-input
          type="text"
          id="displayName"
          autocomplete="name"
          @blur="$v.displayName.$touch()"
          v-model="displayName"
          placeholder="Benutzername eintragen"
        />
      </el-row>

      <el-row
        class="form-row"
        :class="{invalid: $v.email.$error}"
      >
        <label for="email">E-Mail</label>
        <el-input
          type="email"
          id="email"
          autocomplete="email"
          @blur="$v.email.$touch()"
          v-model="email"
          placeholder="E-Mail-Adresse eintragen"
        />
      </el-row>
      <register-panel-alert
        v-if="!$v.email.email"
        message="Bitte gib eine gültige E-Mail-Adresse ein"
      />

      <el-row
        class="form-row"
        :class="{invalid: $v.password.$error}"
      >
        <label for="password">Passwort</label>
        <el-input
          type="password"
          id="password"
          autocomplete="password"
          @blur="$v.password.$touch()"
          v-model="password"
          placeholder="Passwort wählen"
        />
      </el-row>

      <el-row
        class="form-row"
        :class="{invalid: $v.confirmPassword.$error}"
      >
        <label for="confirm-password">Passwort wiederholen</label>
        <el-input
          type="password"
          id="confirm-password"
          autocomplete="password"
          v-model="confirmPassword"
          placeholder="Passwort wiederholen"
        />
      </el-row>

      <el-row
        class="form-row"
        type="flex"
        justify="center"
      >
        <el-button
          native-type="submit"
          type="primary"
          :disabled="$v.$invalid"
        >Konto anlegen
        </el-button>
      </el-row>

      <el-row
        type="flex"
        justify="center">
        <router-link
          :to="{name: 'login'}"
          tag="p"
        ><a>... oder einloggen</a>
        </router-link>
      </el-row>
    </form>

    <div style="font-size: x-small; white-space: pre; display: none">
      {{ $v }}
    </div>

  </div>
</template>

<script>
  import { alphaNum, required, email, minLength, sameAs } from 'vuelidate/lib/validators'
  import ElCollapseTransition from 'element-ui/src/transitions/collapse-transition'
  import RegisterPanelAlert from './RegisterPanelAlert'

  export default {

    components: {
      ElCollapseTransition,
      RegisterPanelAlert
    },

    data () {
      return {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    },

    methods: {
      onSubmit: function () {
        const formData = {
          displayName: this.displayName,
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('REGISTER_USER', formData)
          .then(this.$router.push({name: 'dashboard'}))
          .catch(err => console.error(err))
      }
    },

    validations: {
      displayName: {
        required,
        alphaNum,
        minLength: minLength(6)
      },

      email: {
        required,
        email,
        unique: (val, pvm) => {
          if (val === '') return true
          return pvm.$store.getters.emailStillAvailable(val)
        }
      },

      password: {
        required,
        minLength: minLength(6)
      },

      confirmPassword: {
        sameAs: sameAs('password')
      }
    }
  }
</script>

<style scoped lang="scss">
  label {
    display: inline-block;
    width: 12rem;
  }

  .form-row {
    display: flex;
    align-items: center;
    margin: 1rem 0;
  }

  .input.invalid input {
    border: 1px solid red;
    background-color: #ffc9aa;
  }

  .input.invalid label {
    color: red;
  }

  a {
    color: black;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
