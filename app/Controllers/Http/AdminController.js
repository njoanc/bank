'use strict'
const Account = use('App/Models/Account')
const Transaction = use('App/Models/Transaction')
const User = use('App/Models/User')
class AdminController {

    async user({ response, request, params }) {
        const account = await Account.findBy('id', params.id)
        if (!User) return response.status(400).send('user does not exist')
        response.json(account)
    }

    async users({ response, request }) {
        const account = await Account.all()
        response.json(account)
    }

    async activate({ response, request, params }) {
        const account = await Account.findBy('id', params.id)
        if (account) return response.status(400).send('the account is not registered')
        account.status = 'active'
        await account.save()
        response.json({ message: 'account activate' })
    }
    async deactivate({ response, request, params }) {
        const account = await Account.findBy('id', params.id)
        if (account) return response.status(400).send('the account is not registered')
        account.status = 'dormant'
        await account.save()
        response.json({ message: 'account deactivate' })
    }
    async delete({ response, request, params }) {
        const account = await Account.findBy('id', params.id)
        if (!account) return response.status(400).send('the account is not registered')
        await account.delete()
        response.json({ message: 'the account is deleted successful' })

    }
    async staff({ request, response }) {
        const staff = request.only(['username', 'email', 'password'])
        const users = await User.findBy('email', needs.email)
        if (users) return response.status(400).send({ message: { error: 'User already registered' } })
        const user = await User
        user.username = staff.username
        user.email = staff.email
        user.password = staff.password
        user.isStaff = 'true'
        await user.save()
        return response.json(account)


    }

    async admin({ request, response }) {
        const admin = request.only(['username', 'email', 'password'])
        const users = await User.findBy('email', needs.email)
        if (users) return response.status(400).send({ message: { error: 'User already registered' } })
        const user = await User
        user.username = admin.username
        user.email = admin.email
        user.password = admin.password
        user.isAdmin = 'true'
        await user.save()
        return response.json(account)


    }

}

module.exports = AdminController
