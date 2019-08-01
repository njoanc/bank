'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  static get connection() {
    return 'mysql'
  }
  up() {
    this.create('users', (table) => {
      table.increments()
      table.enu('type', ['Staff', 'Client'])
      table.string('name', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      // table.string('token')
      table.date('DOB').notNullable()
      // table.string('position', 254).notNullable()
      table.boolean('isAdmin')
      table.timestamps()

    })

  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
