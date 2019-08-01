'use strict'
const moment = use('moment')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Transaction extends Model {
    account() {
        return this.belongsTo('App/Models/Account');
    }
    static scopeToday(query) {
        return query
            .where('created_at', '>=', moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'))
            .where('created_at', '>=', moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'))
    }
}

module.exports = Transaction
