'use strict'
const Account = use('App/Models/Account');
const User = use('App/Models/User');
const _ = use('lodash');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with accounts
 */
class AccountController {
  /**
   * Show a list of all accounts.
   * GET accounts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, params, response }) {
    const randomNumber = Math.floor(Math.random() * 20) + 190274675327268765
    const user = await User.findBy('id', params.id)
    if (!user.id == Number(params.id)) response.status(400).send('incorrect user id')
    const accounts = request.only('identity')
    const acc = await Account.findBy('identity', accounts.identity)
    if (acc) return response.status(400).send({ message: { error: 'account is already created.' } })

    const account = new Account()
    account.accountName = user.name
    account.identity = accounts.identity
    account.accountNumber = randomNumber
    account.toObject()

    await account.save()
    await account.reload();
    return response.json(account)

  }


  /**
   * Render a form to be used for creating a new account.
   * GET accounts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  // async create({ request, response }) {
  // }

  /**
   * Create/save a new account.
   * POST accounts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single account.
   * GET accounts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing account.
   * GET accounts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update account details.
   * PUT or PATCH accounts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a account with id.
   * DELETE accounts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = AccountController
