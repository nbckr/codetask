// Vars here will be available in other envs as well, unless they're overwritten

module.exports = {
  NODE_ENV: '"production"',
  FIREBASE_AUTH_ENDPOINT: '"https://codetask-c987b.firebaseapp.com"', //'"https://www.googleapis.com/identitytoolkit/v3/relyingparty"',
  FIREBASE_DATA_ENDPOINT: '"https://codetask-c987b.firebaseio.com"',

  // Grab secret variables from outer environment variables
  // Firebase API key also works with Youtube API v3
  FIREBASE_API_KEY: `"${process.env.FIREBASE_API_KEY}"`
}
