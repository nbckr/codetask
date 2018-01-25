// Vars here will be available in other envs as well, unless they're overwritten

module.exports = {
  NODE_ENV: '"production"',
  FIREBASE_AUTH_ENDPOINT: '"https://www.googleapis.com/identitytoolkit/v3/relyingparty"',
  FIREBASE_DATA_ENDPOINT: '"https://vue-playground-440d7.firebaseio.com"',

  // Grab secret variables from outer environment variables
  FIREBASE_API_KEY: `"${process.env.FIREBASE_API_KEY}"`
}
