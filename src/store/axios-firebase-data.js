import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.FIREBASE_DATA_ENDPOINT
})

export default instance
