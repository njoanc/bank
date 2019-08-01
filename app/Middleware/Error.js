'use strict'
const _ = require('lodash');
const Winston = require('winston');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Error {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next) {
    // call next to advance the request
    winston.error(err.message, err);
    response.status(500).json({ Error: 'Internal server error' });
    await next()
  }
}

module.exports = Error
