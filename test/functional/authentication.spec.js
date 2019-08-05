'use strict'

const Account = use('Account')
const { test, trait } = use('Test/Suite')('Authentication')

trait('Test/Browser')
trait('DatabaseTransactions')

test('should display an error when credentials are incorect', async ({ browser }) => {
  //Given wehave no user
  //And we are on the login route

  const page = await browser.visit('/login')

  //When we fill and send the login form

  await page
    .type('[name="email"]', 'romain.lanz')
    .type('[name="password"]', 'secret')
    .submitForm('form')
    .waitForNavigation()

  //We expect to see an alert message
  await page.assertExists('div[role="alert]')

  //And to see the email filled
  await page.assertValue('[name="email]', 'romain.lanz')
}).timeout(0)

test('a user can login in inside the application', async ({ browser }) => {
  //Given we have a user
  const user = await Account.model('App/Models/User').create({ password: 'secret' })

  //And we are on the login page
  const page = await browser.visit('/login')
})