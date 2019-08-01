'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
// const mysql = use('mysql');
const Schema = use('Schema')

class AccountSchema extends Schema {
  static get connection() {
    return 'mysql'
  }
  up() {
    this.create('accounts', (table) => {
      table.increments()
      table.integer('identity')
      table.string('accountName')
      table.integer('accountNumber')
      table.enu('status', ['Draft', 'Active', 'Dormant']).defaultTo('Draft')
      table.enu('type', ['Saving', 'Current']).defaultTo('Current')
      table.integer('balance').defaultTo(0)

      table.timestamps()
      table.integer('user_id').unsigned().references('id').inTable('users');

    })

  }

  down() {
    this.drop('accounts')
  }
}

module.exports = AccountSchema
