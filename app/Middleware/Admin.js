'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Admin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request }, next) {
    // call next to advance the request
    if (!request.user.isAdmin) {
      response.status(403).json({ Alert: 'YOU ARE TOTALLY NOT AUTHORIZED TO BE HERE!!' })
    }
    next();
    await next()
  }
}

module.exports = Admin
