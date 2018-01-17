import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://vue-playground-440d7.firebaseio.com',
  headers: { 'Content-Type': 'application/json' }
})

export default instance
