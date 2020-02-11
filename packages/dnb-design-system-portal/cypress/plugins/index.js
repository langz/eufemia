/**
 * Cypress plugins
 *
 */

// require('dotenv').config()
const { isCI } = require('ci-info')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // console.log('process.env', process.env)

  if (isCI) {
    config.baseUrl = 'https://eufemia.dnb.no'
    config.defaultCommandTimeout = 10e3
    config.video = false
  }

  return config
}
