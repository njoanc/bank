'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionSchema extends Schema {
  static get connection() {
    return 'mysql'
  }
  up() {
    this.create('transactions', (table) => {
      table.increments()
      table.enu('type', ['Deposit', 'Withdraw'])
      table.string('accountName', 80).notNullable()
      table.integer('accountNumber')
      table.integer('amount')
      table.date('transactionDate', 50)
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.integer('account_id').unsigned().references('id').inTable('accounts');
      table.timestamps();
    })
  }

  down() {
    this.drop('transactions')
  }
}

module.exports = TransactionSchema
