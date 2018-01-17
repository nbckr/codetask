<template>
  <div id="signup">

    <div class="signup-form">
      <form @submit.prevent="onSubmit">

        <div class="input" :class="{invalid: $v.email.$error}">
          <label for="email">Mail</label>
          <input
            type="email"
            id="email"
            @blur="$v.email.$touch()"
            v-model="email">
          <p v-if="!$v.email.email">Please provide a valid email address</p>
        </div>

        <div class="input" :class="{invalid: $v.password.$error}">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            @blur="$v.password.$touch()"
            v-model="password">
        </div>

        <div class="input">
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword">
        </div>

        <div class="submit">
          <button type="submit" :disabled="$v.$error">Submit</button>
        </div>

      </form>
    </div>


    <div style="font-size: x-small; white-space: pre">
      {{ $v }}
    </div>

  </div>
</template>

<script>
  import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
  import axios from '@/store/axios-firebase-data'

  export default {
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: ''
      }
    },

    methods: {
      onSubmit: function () {
        const formData = {
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('SIGNUP_USER', formData)
      }
    },

    validations: {
      email: {
        required,
        email,
        unique: (val, pvm) => {
          console.log('this', val, pvm)

          if (val === '') return true
          return axios.get('/users.json?orderBy="email"&equalTo="' + val + '"').then(response => {
            return Object.keys(response.data).length === 0
          })
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

<style scoped>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }

  .input.invalid input {
    border: 1px solid red;
    background-color: #ffc9aa;
  }

  .input.invalid label {
    color: red;
  }
</style>
