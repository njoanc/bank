'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const jwt = use('jsonwebtoken');
const config = use('config');
const { User } = use('../model/User');

class Auth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request }, next) {
    // call next to advance the request
    let token = request.header('Authorization');
    try {
      let decoded = jwt.verify(token, config.get('jwtKey'));
      let user = await User.findOne({ token: decoded, 'token': token });
      if (!user) throw new Error();

      request.user = user;
      next();
    } catch (ex) { res.status(401).json({ message: 'Invalid1 Token' }) }
    await next()
  }
}

module.exports = Auth
