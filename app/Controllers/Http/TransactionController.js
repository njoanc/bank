'use strict'
const Transaction = use('App/Models/Transaction');
const Account = use('App/Models/Account');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with transactions
 */
class TransactionController {
  /**
   * Show a list of all transactions.
   * GET transactions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, params, response }) {
    const account = await Account.findBy("id", params.id)
    if (!account) response.status(400).send('the id of this account does not exist')

    const trans = request.only(['type', 'accountNumber', 'accountName', 'amount'])
    const transaction = new Transaction()

    transaction.type = trans.type
    transaction.accountNumber = trans.accountNumber
    transaction.amount = trans.amount
    transaction.accountName = trans.accountName

    await transaction.save()
    return response.json(transaction)

  }

  /**
   * Render a form to be used for creating a new transaction.
   * GET transactions/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async transaction({ request, params, response }) {
    const account = await Account.findBy('id', params.id);
    if (!account) response.status(400).send('the id of this account does not exist')

    const trans = request.only(['type', 'accountNumber', 'accountName', 'amount', 'transactionDate'])
    if (account.accountNumber !== trans.accountNumber) return response.status(400).send('the account do not exist')
    const transaction = new Transaction()
    transaction.type = trans.type
    transaction.accountNumber = trans.accountNumber
    transaction.amount = trans.amount
    transaction.accountName = trans.accountName
    transaction.transactionDate = trans.transactionDate

    await transaction.save()
    return response.json(transaction)
  }

  /**
   * Create/save a new transaction.
   * POST transactions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async byDate({ request, params, response }) {
    //view specific transaction by date
    const account = await Account.findBy('id', params.id)
    if (!account) response.status(400).send('the id of this account does not exist')
    const dater = "CREATE TABLE trial(start DATE)"
    // dater = request.only(['start'])

    let transaction = await Transaction.query().today().fetch();
    if (!dater.start == transaction.transactionDate) return response.status(400).send('you did not make any transaction on this date.')

    return response.json(transaction)

  }

  /**
   * Display a single transaction.
   * GET transactions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async showAll({ request, params, response }) {
    const account = await Account.findBy('id', params.id);
    if (!account) response.status(400).send('the id of this account does not exist')
    const transaction = await Transaction.all()
    // console.log(transaction)
    return response.send(transaction)

  }

  /**
   * Render a form to update an existing transaction.
   * GET transactions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ request, params, response, view }) {
  }

  /**
   * Update transaction details.
   * PUT or PATCH transactions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, params, response }) {
  }

  /**
   * Delete a transaction with id.
   * DELETE transactions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ request, params, response }) {
  }
}

module.exports = TransactionController
