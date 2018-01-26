import firebase from 'firebase'

const db = firebase.initializeApp({
  databaseURL: process.env.FIREBASE_DATA_ENDPOINT
}).database()

export default db
