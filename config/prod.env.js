// Vars here will be available in other envs as well, unless they're overwritten

module.exports = {
  NODE_ENV: '"production"',

  // Grab secret variables from outer environment variables
  FIREBASE_API_KEY: `"${process.env.FIREBASE_API_KEY}"`
}
