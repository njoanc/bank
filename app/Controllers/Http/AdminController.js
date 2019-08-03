'use strict'
const Account = use('App/Models/Account')
const Transaction = use('App/Models/Transaction')
const User = use('App/Models/User')
class AdminController {

    async signup({ request, response }) {
        const admin = request.only(['name', 'email', 'password', "DOB"])
        const users = await User.findBy('email', admin.email)
        if (users) return response.status(400).send({ message: { error: 'User already registered' } })
        const user = await User.create({
            name: admin.name,
            email: admin.email,
            password: admin.password,
            isAdmin: true,
            DOB: admin.DOB,
            type: 'Staff',
        });
        await user.save()
        return response.json(user)
    }
    async login({ request, response, auth }) {
        const { email, password } = request.all()
        let token = await auth.attempt(email, password)
        let user = await User.query().where('email', email).fetch()
        return { token } // your structured object
    }

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
        if (!account) return response.status(400).send('the account is not registered')
        account.status = 'active'
        await account.save()
        response.json({ message: 'account activate' })
    }
    async deactivate({ response, request, params }) {
        const account = await Account.findBy('id', params.id)
        if (!account) return response.status(400).send('the account is not registered')
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

}

module.exports = AdminController
