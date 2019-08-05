'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, index, data) => {
    const defaultValue = {
        name: faker.name(),
        email: faker.email(),
        password: 'secret',
    }

    return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/Account', (faker) => {
    return {
        identity: faker.paragraph(),
        accountName: faker.paragraph(),
        accountNumber: faker.paragraph(),
        status: faker.paragraph(),
        type: faker.paragraph(),
        balance: faker.paragraph(),
        user_id: async () => {
            return (await Factory.model('App/Models/User').create()).id
        }
    }
})