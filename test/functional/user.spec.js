'use strict'

const { test, trait } = use('Test/Suite')('User')
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')
trait('Session/Client')

test('get list of users accounts', async ({ client }) => {
    const response = await client.get('/accountss/1').end()
    response.assertStatus(401)
})

test('Should query accounts if authenticated', async ({ client }) => {
    const account = {
        type: 'Client',
        name: 'Amine Yvette',
        email: 'Yvettey',
        password: 'amakuru123',
        DOB: '2000-01-01',
        isAdmin: false
    }

    const user = await User.create(account)

    const response = await client
        .get('/accountss/1')
        .loginVia(user)
        .end()
    response.assertStatus(400)
})
