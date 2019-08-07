'use strict'

const { test, trait } = use('Test/Suite')('User')
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')
trait('Session/Client')


//user signup
test('User signup', async ({ client }) => {
    const response = await client.post('/signup').end()
    response.assertStatus(500)
})

//User login
test('User login', async ({ client }) => {
    const response = await client.post('/login').end()
    response.assertStatus(401)
})
//creating an account
test('User can create an account', async ({ client }) => {
    const response = await client.post('/account/1').end()

    response.assertStatus(401)
})
test('get list of users accounts', async ({ client }) => {
    const response = await client.get('/accountss/1').end()
    response.assertStatus(401)
})

test('Should query accounts if authenticated', async ({ client }) => {
    const account = {
        type: 'Client',
        name: 'Aminay Yvette',
        email: 'Yves',
        password: 'amakuru123',
        DOB: '2000-01-01',
        isAdmin: false
    }

    const user = await User.create(account)

    const response = await client
        .get('/accountss/1')
        .loginVia(user)
        .end()
    response.assertStatus(404)
})

//Getting account by date
test('get list of accounts by date', async ({ client }) => {
    const response = await client.get('/accountsss/1').end()
    response.assertStatus(401)
})

//Getting transactions by id
test('Getting transactions by id', async ({ client }) => {
    const response = await client.get('/1').end()
    response.assertStatus(401)
})

//Staff authentication
test('Staff signup', async ({ client }) => {
    const response = await client.post('/staff/signup').end()
    response.assertStatus(500)
})

test('Staff login', async ({ client }) => {
    const response = await client.post('/staff/login').end()
    response.assertStatus(401)
})

//Staff find user by id
test('Staff find users by id', async ({ client }) => {
    const response = await client.get('/staff/users/1').end()
    response.assertStatus(401)
})

test('Find the list of users', async ({ client }) => {
    const response = await client.get('/staff/users/').end()
    response.assertStatus(401)
})

test('Getting the list of accounts', async ({ client }) => {
    const response = await client.get('/staff/accounts/').end()
    response.assertStatus(401)
})

test('Getting the list of accounts by id', async ({ client }) => {
    const response = await client.get('/staff/accounts/1').end()
    response.assertStatus(401)
})

//Credit an account
test('Credit an account by id', async ({ client }) => {
    const response = await client.get('/credit/account/1234456/transaction/1').end()
    response.assertStatus(404)
})

test('Debit an account by id', async ({ client }) => {
    const response = await client.get('/debit/account/1234456/transaction/1').end()
    response.assertStatus(404)
})

test('Activate an account by id', async ({ client }) => {
    const response = await client.get('/staff/activate/1').end()
    response.assertStatus(404)
})

test('Deactivate an account by id', async ({ client }) => {
    const response = await client.get('/staff/deactivate/1').end()
    response.assertStatus(404)
})

test('Delete an account', async ({ client }) => {
    const response = await client.get('/staff/delete/1').end()
    response.assertStatus(404)
})

test('Admin signup', async ({ client }) => {
    const response = await client.post('/admin/signup').end()
    response.assertStatus(500)
})

test('Admin login', async ({ client }) => {
    const response = await client.post('/admin/login').end()
    response.assertStatus(401)
})

test('Admin find users by id', async ({ client }) => {
    const response = await client.get('/admin/users/1').end()
    response.assertStatus(401)
})

test('Find the list of users', async ({ client }) => {
    const response = await client.get('/admin/users/').end()
    response.assertStatus(401)
})




test('Activate an account by id by admin ', async ({ client }) => {
    const response = await client.get('/admin/activate/1').end()
    response.assertStatus(404)
})

test('Deactivate an account by id by admin ', async ({ client }) => {
    const response = await client.get('/admin/deactivate/1').end()
    response.assertStatus(404)
})

test('Delete an account by admin ', async ({ client }) => {
    const response = await client.get('/admin/delete/1').end()
    response.assertStatus(404)
})



