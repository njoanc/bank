'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const { Transaction } = use('App/models/Transaction');
const jwt = use('jsonwebtoken');
// const config = use('config');

class AuthTransaction {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request }, next) {
    // call next to advance the request
    let token = request.header('Transaction');

    let decoded = jwt.verify(token, config.get('jwtKey'));
    let transaction = await Transaction.findOne({ token: decoded, 'token': token });
    if (!transaction) throw new Error();

    request.transaction = transaction;
    next();

    await next()
  }
}

module.exports = AuthTransaction
