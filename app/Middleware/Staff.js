'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Staff {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request }, next) {
    // call next to advance the request
    if (request.user.type !== 'Staff') {
      res.status(403).json({ Alert: 'YOU ARE NOT AUTHORIZED !!' })
    }
    await next()
  }
}

module.exports = Staff
