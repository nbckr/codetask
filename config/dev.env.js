'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const secret_variables = require ('./secret_variables')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PLAY_BASE_URL: '"http://localhost:9000/api"',
  ...secret_variables
})
