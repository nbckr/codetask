import firebase from 'firebase'

const app = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL: process.env.FIREBASE_DATA_ENDPOINT,
  authDomain: process.env.FIREBASE_AUTH_ENDPOINT
})

export const db = app.database()
export const auth = app.auth()
