import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.FIREBASE_AUTH_ENDPOINT
})

instance.interceptors.request.use(config => {
  console.log(process.env)
  config.url += `?key=${process.env.FIREBASE_API_KEY}`
  return config
})

export default instance
