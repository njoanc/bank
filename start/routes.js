'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('welcome')
/*
user authentication routes
*/
Route.post('/signup', 'AuthController.register')
Route.post('/login', 'AuthController.login')

/*
Different user bank transactions routes
*/
Route.post('/account/:id', 'AccountController.create').middleware('auth')
Route.post('/accounts/:id', 'TransactionController.transaction').middleware('auth')
Route.get('/accountss/:id', 'TransactionController.showAll').middleware('auth')
Route.get('/accountsss/:id', 'TransactionController.byDate').middleware('auth')
Route.get('/:id', 'TransactionController.index').middleware('auth')

// /**
//  * Cashier/Staff
//  */
Route.get('/staff/users/:id', 'StaffController.index').middleware('auth')
Route.get('/staff/users', 'StaffController.show').middleware('auth')
Route.get('/staff/accounts', 'StaffController.showAccounts').middleware('auth')
Route.get('/staff/accounts/:id', 'StaffController.indexAccount').middleware('auth')
Route.put('/credit/account/:accountNumber/transaction/:id', 'StaffController.credit').middleware('auth')
Route.put('/debit/account/:accountNumber/transaction/:id', 'StaffController.debit').middleware('auth')
Route.put('/staff/activate/:id', 'StaffController.activate').middleware('auth')
Route.put('/staff/deactivate/:id', 'StaffController.deactivate').middleware('auth')
Route.delete('/staff/delete/:id', 'StaffController.delete').middleware('auth')

// /**
//  * Admin 
//  */
Route.get('/admin/users/:id', 'AdminController.user').middleware('auth')
Route.get('/admin/users', 'AdminController.users').middleware('auth')
Route.put('/admin/activate/:id', 'AdminController.activate').middleware('auth')
Route.put('/admin/deactivate/:id', 'AdminController.deactivate').middleware('auth')
Route.delete('/admin/delete/:id', 'AdminController.delete').middleware('auth')

